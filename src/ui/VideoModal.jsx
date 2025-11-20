import { X } from "lucide-react";
import { useEffect } from "react";
import { createPortal } from "react-dom";

// -----------------------------------------------------------------------------
// Component: VideoModal
// Açıklama: Full-screen video player. Rendered into the body via the portal.
// Props:
//   - videoSrc: Path of video to play
//   - onClose: Modal shutdown function
// -----------------------------------------------------------------------------

export default function VideoModal({ videoSrc, onClose }) {
  // Close with Escape key + lock body scroll while modal is open
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);

    // Disable body scroll (does not scroll when the modal is open)
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Cleanup (scroll returns to its original state when the modal is closed)
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = originalOverflow;
    };
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 backdrop-blur-sm transition-opacity duration-300"
      onClick={onClose} // close when clicking outside area
    >
      <div
        className="relative w-full max-w-4xl max-h-full m-4"
        onClick={(e) => e.stopPropagation()} // Do not close the content when clicked
      >
        {/* Close button */}
        <button
          className="absolute -top-12 right-0 text-white hover:text-gold transition-colors z-50 p-2 cursor-pointer"
          onClick={onClose}
        >
          <X size={32} />
        </button>

        <div className="relative pt-[56.25%] bg-gray-900 rounded-lg shadow-2xl overflow-hidden">
          <video
            className="absolute top-0 left-0 w-full h-full object-cover"
            src={videoSrc}
            title="Promotional Video"
            autoPlay
            controls
            playsInline
            loop
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>,
    // Rendering the modal into the body with the portal
    document.body
  );
}
