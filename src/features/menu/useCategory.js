import { useQuery } from "@tanstack/react-query";
import { getCategoriesWithCounts } from "../../services/apiCategory";

// Custom hook to fetch categories for menu filter
// - Returns loading state, error, categories list, counts for "all", "popular", and "discount"
// - Includes refetch function
export default function useCategory() {
  const { isPending, data, error, refetch } = useQuery({
    queryKey: ["categories-with-count"], // caching key
    queryFn: getCategoriesWithCounts, // API call
  });

  return {
    isPending, // loading state
    categories: data?.categoriesWithCounts || [], // array of category objects
    allCount: data?.allCount || 0, // total items count
    popularCount: data?.popularCount || 0, // popular items count
    discountCount: data?.discountCount || 0, // discounted items count
    error, // error if request fails
    refetch, // manual refetch function
  };
}
