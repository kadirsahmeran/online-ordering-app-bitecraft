import Button from "../../../ui/Button";
import { Link } from "react-router";

// -----------------------------------------------------------------------------
// Component: CategoryCard
// Açıklama: Featured card displaying menu categories.
// Özellikler:
//   - Background image (hover with zoom effect)
//   - Dark overlay (darkens on hover)
//   - When the card is clicked, it redirects to the relevant category (/menu?filter=category)
// -----------------------------------------------------------------------------
export default function CategoryCard({ title, image }) {
  return (
    <Link
      to={`/menu?filter=${title}`} // When clicked, it redirects to the relevant category.
      className="relative h-[500px] md:h-[600px] overflow-hidden group block"
    >
      {/* Background image – zoom effect on hover */}
      <img
        loading="lazy"
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      {/* Overlay – darker on hover */}
      <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition-all duration-200" />

      <div className="absolute bottom-10 md:bottom-12 left-1/2 -translate-x-1/2 text-center z-10">
        <h3 className="text-3xl md:text-4xl text-gray-100 mb-4 drop-shadow-lg">
          {title}
        </h3>
        <Button size="sm">View Menu</Button>
      </div>
    </Link>
  );
}
