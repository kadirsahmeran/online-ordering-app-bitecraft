import {
  createContext,
  useContext,
  useReducer,
  useMemo,
  useEffect,
} from "react";

/**
 * Initial state of the cart
 * - cartItems: list of products in the cart
 */
const initialState = {
  cartItems: [],
};

/**
 * Reducer function for cart actions
 * - ADD_TO_CART: adds a new item or increases quantity if exists
 * - REMOVE_FROM_CART: removes an item
 * - INCREASE_QUANTITY / DECREASE_QUANTITY: updates quantity with limits
 * - CLEAR_CART: empties the cart
 */
function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART": {
      const item = action.payload;
      const effectivePrice = item.discounted_price ?? item.price;

      const existing = state.cartItems.find((i) => i.id === item.id);
      if (existing) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }

      return {
        ...state,
        cartItems: [
          ...state.cartItems,
          {
            ...item,
            quantity: 1,
            price: item.price,
            discounted_price: effectivePrice,
          },
        ],
      };
    }

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter((i) => i.id !== action.payload),
      };

    case "INCREASE_QUANTITY":
      return {
        ...state,
        cartItems: state.cartItems.map((i) =>
          i.id === action.payload
            ? { ...i, quantity: Math.min(i.quantity + 1, 30) }
            : i
        ),
      };

    case "DECREASE_QUANTITY":
      return {
        ...state,
        cartItems: state.cartItems
          .map((i) =>
            i.id === action.payload ? { ...i, quantity: i.quantity - 1 } : i
          )
          .filter((i) => i.quantity > 0),
      };

    case "CLEAR_CART":
      return { ...state, cartItems: [] };

    default:
      return state;
  }
}

const CartContext = createContext();

/**
 * CartProvider
 * - Wraps the app to provide cart state and dispatch
 * - Persists cart to localStorage
 * - Calculates totals and discount information
 */
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState, (initial) => {
    const saved = localStorage.getItem("cart");
    return saved ? { ...initial, cartItems: JSON.parse(saved) } : initial;
  });

  // Persist cart to localStorage on changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cartItems));
  }, [state.cartItems]);

  // Total number of items in cart
  const totalItems = useMemo(
    () => state.cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [state.cartItems]
  );

  // Total original price (before discounts)
  const totalOriginalPrice = useMemo(
    () =>
      state.cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      ),
    [state.cartItems]
  );

  // Total discount amount
  const totalDiscount = useMemo(
    () =>
      state.cartItems.reduce(
        (sum, item) =>
          sum +
          (item.price - (item.discounted_price ?? item.price)) * item.quantity,
        0
      ),
    [state.cartItems]
  );

  // Final price after discount
  const totalFinalPrice = useMemo(
    () => totalOriginalPrice - totalDiscount,
    [totalOriginalPrice, totalDiscount]
  );

  // Discount flag
  const hasDiscount = totalDiscount > 0;

  // Minimum order amount
  const minimumAmount = 13;
  const checkMinAmount = totalFinalPrice < minimumAmount;

  const value = {
    cartItems: state.cartItems,
    dispatch,
    totalItems,
    totalOriginalPrice,
    totalDiscount,
    totalFinalPrice,
    hasDiscount,
    minimumAmount,
    checkMinAmount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

/**
 * useCart
 * - Hook to access cart state and dispatch
 */
export const useCart = () => useContext(CartContext);
