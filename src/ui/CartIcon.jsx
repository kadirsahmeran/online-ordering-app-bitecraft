import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function CartIcon() {
  const { cartItems } = useCart();
  return (
    <div className="relative text-white  duration-300  md:text-2xl text-xl">
      <ShoppingCart />
      <span className="absolute -top-2 -right-2 bg-gold text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
        {cartItems.length}
      </span>
    </div>
  );
}
