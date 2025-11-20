export default function SectionTitle({
  children,
  size = "page",
  className = "",
}) {
  const base = "text-gold text-center";

  const sizes = {
    hero: "text-4xl sm:text-5xl md:text-6xl",
    page: "text-3xl sm:text-4xl md:text-5xl mb-6 md:mb-12",
  };

  return <h3 className={`${base} ${sizes[size]} ${className}`}>{children}</h3>;
}
