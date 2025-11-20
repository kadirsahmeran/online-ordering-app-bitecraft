import { ShoppingBag, ArrowLeft } from "lucide-react";
import Button from "./Button";

export default function EmptyCartOrder() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-gold/10 rounded-full w-32 h-32 animate-ping"></div>
        <div className="relative bg-gold/20 rounded-full w-32 h-32 flex items  items-center justify-center">
          <ShoppingBag className="w-16 h-16 text-gold" />
        </div>
      </div>

      <h3 className="text-2xl sm:text-3xl text-gold mb-3">
        Your Cart is Empty
      </h3>

      <p className="text-gray-400 max-w-md mb-8 leading-relaxed">
        Looks like you haven't added anything to your order yet. Explore our
        delicious menu and start building your perfect meal!
      </p>

      <Button
        to="/menu"
        rounded="full"
        className="group flex items-center gap-2"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        Browse Menu
      </Button>
    </div>
  );
}
