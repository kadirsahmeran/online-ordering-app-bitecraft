import MenuCard from "./MenuCard";
import useMenu from "./useMenu";
import Spinner from "../../ui/Spinner";
import ErrorState from "../../ui/ErrorState";

/**
 * MenuGrid component
 * - Displays menu items in a grid
 * - Filters items based on selected category (All, Popular, Discount, or dynamic)
 * - Handles loading, error, and empty states
 */
export default function MenuGrid({ selectedCategory }) {
  const { isPending, meals, error, refetch } = useMenu();

  // Filter meals by category
  const filteredMeals = meals?.filter((meal) => {
    if (selectedCategory === "all") return true;
    if (selectedCategory === "popular") return meal.is_popular;
    if (selectedCategory === "discount") return meal.discount > 0;
    return (
      meal.category?.category_name?.toLowerCase() ===
      selectedCategory?.toLowerCase()
    );
  });

  return (
    <div className="w-full lg:w-[70%] grid grid-cols-1 sm:grid-cols-2 gap-6 auto-rows-fr h-full">
      {isPending && <Spinner />} {/* Loading state */}
      {error && (
        <ErrorState message={error.message} size="xl" onRetry={refetch} />
      )}{" "}
      {/* Error state */}
      {!isPending &&
        !error &&
        filteredMeals?.map((meal) => (
          <MenuCard key={meal.id} meal={meal} />
        ))}{" "}
      {/* Render filtered items */}
    </div>
  );
}
