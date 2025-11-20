import { useCart } from "../../context/CartContext";
import Button from "../../ui/Button";
import { formatPrice } from "../../utils/helpers";

// MenuCard component
// - Displays a single meal item in the menu
// - Shows image, name, description, price/discount
// - Allows adding item to cart and displays current quantity in cart
export default function MenuCard({ meal }) {
  const { cartItems, dispatch } = useCart();

  const { name, description, image_url, price, discount, discounted_price } =
    meal;

  // Find if the meal is already in the cart
  const cartItem = cartItems.find((i) => i.id === meal.id);
  const quantityInCart = cartItem?.quantity || 0;

  return (
    <div className="bg-gray-950 border border-gold-darker/60 text-gray-100 rounded-xl shadow-lg overflow-hidden flex flex-col min-h-[400px] lg:min-h-[420px]">
      {/* Meal image */}
      <div className="w-full border-b border-b-gold-darker/60 p-4 lg:p-6 flex justify-center">
        <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-full lg:rounded-xl overflow-hidden shadow-2xl">
          <img
            src={image_url}
            alt={name}
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
        </div>
      </div>

      {/* Meal info and actions */}
      <div className="flex flex-col justify-between p-5 grow">
        {/* Name and description */}
        <div>
          <h3 className="text-lg lg:text-xl font-bold text-gold">{name}</h3>
          <p className="text-gray-400 text-sm mt-2">{description}</p>
        </div>

        {/* Price and Add to Cart button */}
        <div className="mt-4 flex items-center justify-between">
          <span className="text-gold font-semibold">
            {discount > 0 ? (
              <div className="flex flex-col">
                {/* Show original price if discount exists */}
                <p className="line-through text-gray-400 text-sm">
                  {formatPrice(price)}
                </p>
                <p className="text-xl font-bold">
                  {formatPrice(discounted_price)}
                </p>
              </div>
            ) : (
              <p className="text-xl font-bold">{formatPrice(price)}</p>
            )}
          </span>

          {/* Add to cart button */}
          <Button
            size="sm"
            onClick={() => dispatch({ type: "ADD_TO_CART", payload: meal })}
            animated={true}
          >
            Add to cart
            {quantityInCart > 0 && ` (${quantityInCart})`}{" "}
            {/* Show quantity if exists */}
          </Button>
        </div>
      </div>
    </div>
  );
}
