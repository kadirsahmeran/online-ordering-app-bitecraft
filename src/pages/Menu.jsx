// -----------------------------------------------------------------------------
// Page: Menu
// Description: Menu page – contains the filtering of food categories and order cart components.
// Özellikler:
//   - useTitle hook: dynamically sets the page title
//   - useSearchParams: Gets the category filter in the URL
//   - useNavigate: Updates URL on category changes
//   - FilterList: category selection menu
//   - MenuGrid: lists products by selected category
//   - MiniCartDesktop / MiniCartMobile: Shows the products in the cart(desktop and mobile)
// Kullanım: <Menu />
// -----------------------------------------------------------------------------

import { useNavigate, useSearchParams } from "react-router";

import MiniCartDesktop from "../features/cart/MiniCartDesktop";
import MiniCartMobile from "../features/cart/MiniCartMobile";
import FilterList from "../features/menu/FilterList";
import MenuGrid from "../features/menu/MenuGrid";
import useTitle from "../hooks/useTitle";
import SectionTitle from "../ui/SectionTitle";

// menu page
export default function Menu() {
  // Set page title
  useTitle("Bitecraft | Menu");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Get the selected category from the URL (default: "all")
  const selectedCategory = searchParams.get("filter") || "all";

  // Update URL when category changes
  function handleCategorySelect(category) {
    navigate(`/menu?filter=${category}`);
  }
  return (
    <section className="py-12 md:py-20">
      <SectionTitle className="px-8">Our Delicious Menu</SectionTitle>

      {/*Category filter menu */}
      <FilterList
        onCategorySelect={handleCategorySelect}
        selectedCategory={selectedCategory}
      />

      <div className="customContainer mt-4 lg:pb-0 pb-16">
        <div className="flex lg:flex-row flex-col gap-10">
          <MenuGrid selectedCategory={selectedCategory} />
          <MiniCartDesktop />
          <MiniCartMobile />
        </div>
      </div>
    </section>
  );
}
