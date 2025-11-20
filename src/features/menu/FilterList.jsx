// -----------------------------------------------------------------------------
// Component: FilterList
// Description: Sticky category filter bar on the menu page.
// Özellikler:
//   - useCategory hook: retrieves categories from API, handles loading and error states
//   - FilterButton: separate filter button for each category
//   - custom filters: All, Popular, Discount
//   - Dynamic categories: List of categories from API
//   - ErrorState: option to retry if category is not loaded

// -----------------------------------------------------------------------------
import useCategory from "./useCategory";
import FilterButton from "./FilterButton";
import ErrorState from "../../ui/ErrorState";

// Sticky category filter bar for menu page
export default function FilterList({ onCategorySelect, selectedCategory }) {
  const {
    isPending, // Are categories loading?
    categories, // Category list retrieved from API
    allCount, // number of all products
    popularCount, // number of popular products
    discountCount, // number of discounted products
    error, // error status
    refetch, // Retry function after error
  } = useCategory();

  return (
    <div
      className="
        sticky top-0 z-20
       w-full py-4 bg-gray-950 border-b border-gold-darker/60 shadow-xl filter-sticky-header"
    >
      <div className="customContainer">
        {/* Loading State */}
        {isPending && (
          <p className="text-gray-100 animate-pulse">
            Categories are loading...
          </p>
        )}
        {/* Error State */}
        {error && <ErrorState message={error.message} onRetry={refetch} />}
        {/* Filter Buttons */}
        {!isPending && !error && (
          <ul
            className="flex items-center text-white space-x-3 sm:space-x-4 
          overflow-x-auto whitespace-nowrap scrollbar-hide"
          >
            {/* Custom filters (All, Popular, Discount) */}
            <li>
              <FilterButton
                label="All"
                count={allCount}
                active={selectedCategory === "all"}
                onClick={() => onCategorySelect("all")}
              />
            </li>
            <li>
              <FilterButton
                label="Popular"
                count={popularCount}
                active={selectedCategory === "popular"}
                onClick={() => onCategorySelect("popular")}
              />
            </li>
            <li>
              <FilterButton
                label="Discount"
                count={discountCount}
                active={selectedCategory === "discount"}
                onClick={() => onCategorySelect("discount")}
              />
            </li>
            {/* Dynamic categories (from API) */}
            {categories?.map((cat) => (
              <li key={cat.id}>
                <FilterButton
                  label={cat.category_name}
                  count={cat.meal_count}
                  active={selectedCategory === cat.category_name}
                  onClick={() => onCategorySelect(cat.category_name)}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
