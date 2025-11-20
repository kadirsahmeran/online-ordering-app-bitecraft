import Button from "../../../ui/Button";
import SectionTitle from "../../../ui/SectionTitle";
import CategoryCard from "./CategoryCard";

// -----------------------------------------------------------------------------
// Component: MenuCategories
// Description: The section showing the main food categories on the home page.
// Features:
//   - Category cards (Hamburger, Pizza, Pasta)
//   - Redirection to the menu page with the Call-to-Action button
// -----------------------------------------------------------------------------

// featured categories in the menu
const categories = [
  { title: "Hamburger", image: "hamburgerMenu.jpg" },
  { title: "Pizza", image: "pizzaMenu.jpg" },
  { title: "Pasta", image: "pastaMenu.jpg" },
];

export default function MenuCategories() {
  return (
    <section id="menuCategories" className="py-12 md:py-20 customContainer">
      <SectionTitle size="hero" className="md:mb-20 sm:mb-12 mb-8">
        Our Delicious Menu
      </SectionTitle>

      {/* Category cards – responsive 1/3 grid*/}
      <div className="grid grid-cols-1 md:grid-cols-3">
        {categories.map((cat) => (
          <CategoryCard key={cat.title} {...cat} />
        ))}
      </div>

      {/* --- Call-to-Action button --- */}
      <div className="text-center mt-16">
        <Button to="/menu" size="xl" animated={true}>
          Order Now
        </Button>
      </div>
    </section>
  );
}
