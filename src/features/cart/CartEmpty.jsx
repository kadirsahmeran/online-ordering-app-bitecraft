import { ShoppingBag } from "lucide-react";
// Shows when the cart has no items
export default function CartEmpty() {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center text-center space-y-3">
      <ShoppingBag size={42} className="text-gold" />
      <p className="text-white text-xl font-medium">Your cart is empty.</p>
      <p className="text-gold text-sm">Explore our menu and start ordering!</p>
    </div>
  );
}
