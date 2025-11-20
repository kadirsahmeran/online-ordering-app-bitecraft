import { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import Button from "../../ui/Button";
import FullPageCart from "./FullPageCart";
import CartIcon from "../../ui/CartIcon";

/**
 * MiniCartMobile component
 * - Shows a fixed bottom cart button on mobile when there are items
 * - Opens a full-page cart overlay on click
 * - Automatically closes if cart becomes empty
 */
export default function MiniCartMobile() {
  const { totalFinalPrice, cartItems } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  // Close overlay if cart becomes empty
  useEffect(() => {
    if (cartItems.length === 0 && isOpen) {
      setIsOpen(false);
    }
  }, [cartItems.length, isOpen]);

  if (cartItems.length === 0) return null; // Nothing to show

  return (
    <>
      {/* Mobile cart button */}
      <div className="lg:hidden visible fixed bottom-0 left-0 w-full px-8 py-6 bg-gray-950 z-40 border-t border-t-gold-darker/60">
        <Button
          onClick={() => setIsOpen(true)}
          className="w-full flex items-center justify-between"
        >
          <CartIcon />
          <p>View cart</p>
          <p>${totalFinalPrice}</p>
        </Button>
      </div>

      {/* Full-page cart overlay */}
      {isOpen && <FullPageCart setIsOpen={setIsOpen} />}
    </>
  );
}
