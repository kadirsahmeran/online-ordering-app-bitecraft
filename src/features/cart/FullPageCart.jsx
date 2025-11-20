import { X } from "lucide-react";
import MiniCartDesktop from "./MiniCartDesktop";
import { useEffect } from "react";

/**
 * FullPageCart component
 * - Shows a full-page mobile cart overlay
 * - Contains a close button and the cart items
 * - Uses MiniCartDesktop in "mobile" mode for content
 */
export default function FullPageCart({ setIsOpen }) {
  useEffect(() => {
    // FullPageCart açıldığında body scroll'u engelle
    document.body.style.overflow = "hidden";

    // Cleanup: FullPageCart kapandığında scroll'u geri aç
    return () => {
      document.body.style.overflow = "";
    };
  }, []);
  return (
    <div className="fixed inset-0 z-50 bg-gray-950 flex flex-col">
      {/* Header with title and close button */}
      <div className="flex items-center justify-between px-5 py-8 border-b border-gold-darker/60 bg-gray-950/90 backdrop-blur-sm">
        <h5 className="text-xl font-semibold text-gold">Your Cart</h5>
        <button
          onClick={() => setIsOpen(false)}
          className="text-gold hover:text-gold-light transition"
        >
          <X size={28} />
        </button>
      </div>

      {/* Cart content scrollable area */}
      <div className="h-full overflow-y-auto p-4">
        <MiniCartDesktop mode="mobile" />
      </div>
    </div>
  );
}
