import "leaflet/dist/leaflet.css";

import { useState, useEffect, useRef } from "react";
import { LocateFixed } from "lucide-react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvent,
} from "react-leaflet";
import L from "leaflet";

const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function MapController({ center, zoom = 15 }) {
  const map = useMap();
  const prevCenter = useRef(center);

  useEffect(() => {
    if (
      !prevCenter.current ||
      Math.abs(prevCenter.current[0] - center[0]) > 0.0001 ||
      Math.abs(prevCenter.current[1] - center[1]) > 0.0001
    ) {
      map.flyTo(center, zoom, { duration: 1.2 });
      prevCenter.current = center;
    }
  }, [center, zoom, map]);

  return null;
}

function ClickHandler({ onMapClick }) {
  useMapEvent("click", (e) => {
    const { lat, lng } = e.latlng;
    onMapClick([lat, lng]);
  });
  return null;
}

export default function AddressInput({
  value = "",
  onChange,
  error,
  placeholder = "Delivery address",
  disabled = false,
}) {
  const [localError, setLocalError] = useState("");
  const [loading, setLoading] = useState(false);
  const [locationUsed, setLocationUsed] = useState(false);
  const [position, setPosition] = useState([38.4192, 27.1287]);

  const errorMessage = localError || error?.message;
  const hasError = !!errorMessage;

  useEffect(() => {
    if (!value || !value.trim()) {
      setLocalError("");
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      setLocalError("");
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?` +
            new URLSearchParams({
              q: value,
              format: "json",
              limit: "1",
              addressdetails: "1",
            })
        );

        const data = await res.json();

        if (data?.length > 0 && data[0].lat && data[0].lon) {
          const lat = parseFloat(data[0].lat);
          const lon = parseFloat(data[0].lon);
          setPosition([lat, lon]);
          setLocalError("");
        } else {
          setLocalError("This address was not found");
        }
      } catch (err) {
        console.error("Geocoding error (ui):", err);
        setLocalError("Address verification failed. Please try again.");
      } finally {
        setLoading(false);
      }
    }, 700);

    return () => clearTimeout(timer);
  }, [value]);

  const getUserLocation = () => {
    if (!navigator.geolocation) {
      setLocalError("Your browser does not support location.");
      return;
    }

    setLoading(true);
    setLocalError("");

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition([latitude, longitude]);

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?` +
              new URLSearchParams({
                lat: latitude.toString(),
                lon: longitude.toString(),
                format: "json",
                addressdetails: "1",
              })
          );
          const data = await res.json();

          if (data?.display_name) {
            onChange(data.display_name);
            setLocationUsed(true);
            setLocalError("");
          } else {
            setLocalError("Could not get address from location.");
          }
        } catch (err) {
          console.error("Reverse geocoding error (ui):", err);
          setLocalError("Could not get address from location..");
        } finally {
          setLoading(false);
        }
      },
      () => {
        setLocalError("Location permission denied.");
        setLoading(false);
      },
      { timeout: 10000 }
    );
  };

  // HARİTA TIKLAMA
  const handleMapClick = async ([lat, lng]) => {
    setPosition([lat, lng]);
    setLoading(true);
    setLocalError("");

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?` +
          new URLSearchParams({
            lat: lat.toString(),
            lon: lng.toString(),
            format: "json",
            addressdetails: "1",
          })
      );
      const data = await res.json();

      if (data?.display_name) {
        onChange(data.display_name);
        setLocalError("");
      } else {
        setLocalError("Could not get address from map.");
      }
    } catch (err) {
      console.error("Reverse geocoding error (ui):", err);
      setLocalError("Could not get address from map.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    onChange(val);
    if (localError) setLocalError("");
  };

  return (
    <div className="w-full space-y-3">
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={handleInputChange}
          disabled={disabled || loading}
          placeholder={placeholder}
          className={`
            w-full px-4 py-3 pr-12 rounded-lg border outline-none transition-all
            placeholder-gray-700 text-white bg-transparent disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed
            ${
              hasError
                ? "border-red-500 focus:ring-2 focus:ring-red-500"
                : "border-gray-600 focus:border-gold focus:ring-2 focus:ring-gold/40"
            }
            ${loading ? "opacity-70" : ""}
          `}
        />

        {(!locationUsed || !value) && !disabled && (
          <button
            type="button"
            onClick={getUserLocation}
            disabled={loading}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-black/60 hover:bg-black/80 rounded-lg transition-all disabled:opacity-50"
            title="Use my current location"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <LocateFixed className="w-5 h-5 text-white" />
            )}
          </button>
        )}
      </div>

      {hasError && (
        <p className="text-red-400 text-sm animate-fade-in">{errorMessage}</p>
      )}

      <div className="w-full h-64 rounded-xl overflow-hidden border-gray-700 shadow-lg relative ">
        {disabled && (
          <div
            className="
        absolute left-0 top-0 w-full h-full 
        
        z-30 
        cursor-not-allowed 

      "
          />
        )}
        <MapContainer
          center={position}
          zoom={15}
          scrollWheelZoom={!disabled}
          className="w-full h-full"
          zoomControl={!disabled}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />

          <MapController center={position} />
          <ClickHandler onMapClick={handleMapClick} />
          <Marker
            position={position}
            icon={markerIcon}
            interactive={!disabled}
          />
        </MapContainer>
      </div>
    </div>
  );
}
