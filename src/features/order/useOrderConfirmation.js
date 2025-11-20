import { useQuery } from "@tanstack/react-query";
import { getOrderByIdAndToken } from "../../services/apiOrder";

export default function useOrderConfirmation(orderId, token) {
  return useQuery({
    queryKey: ["order", orderId, token],
    queryFn: () => getOrderByIdAndToken({ orderId, token }),
    enabled: !!orderId && !!token,
    retry: false,
  });
}
