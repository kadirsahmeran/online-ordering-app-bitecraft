import { useQuery } from "@tanstack/react-query";
import { getMenuItems } from "../../services/apiMeals";

// Custom hook to fetch menu items
// - Returns loading state, data, error and refetch function
export default function useMenu() {
  const {
    isPending, // loading state
    data: meals, // fetched menu items
    error, // error if request fails
    refetch, // function to manually refetch data
  } = useQuery({
    queryKey: ["menu_items"], // unique key for caching
    queryFn: getMenuItems, // API call function
  });

  return { isPending, meals, error, refetch };
}
