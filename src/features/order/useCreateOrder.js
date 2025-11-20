import { useMutation } from "@tanstack/react-query";
import { createOrder } from "../../services/apiOrder";
import toast from "react-hot-toast";

/**
 * Custom hook for creating an order
 * - Uses react-query's useMutation
 * - Handles success and error toasts
 */
export default function useCreateOrder() {
  const { mutate: createOrderFn, isPending } = useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      toast.success("Order sent successfully!");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { createOrderFn, isPending };
}
