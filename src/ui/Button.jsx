import { Link } from "react-router";
import clsx from "clsx";

// -----------------------------------------------------------------------------
// Component: Button
// Açıklama: A fully reusable, flexible button used in the project.
// Destekler:
//   - different sizes (sm, md, xl)
//   - Different corner styles (lg, full)
//   - Works as a link or regular button
//   - Animated hover effect
//   - Tailwind based customization
// Props:
//   - as: Component to be manually rendered (e.g. 'a', Link, div...)
//   - to: Link redirect path (if as is not specified, it will be automatic Link)
//   - size: sm | md | xl
//   - rounded: lg | full
//   - animated: Turns on hover animation
// -----------------------------------------------------------------------------

export default function Button({
  as: Component,
  children,
  onClick,
  className = "",
  to, //
  size = "md",
  rounded = "lg",
  disabled = false,
  animated = false,
  ...props
}) {
  // Basic button styles
  const baseClass = `
  text-white 
  bg-gold-dark 
  font-medium 
  transition-all duration-300

  disabled:opacity-50 
  disabled:grayscale 
  disabled:cursor-not-allowed

  enabled:hover:bg-gold-darker 
  enabled:hover:shadow-lg 
  enabled:cursor-pointer
`;

  // Dimension styles
  const sizes = {
    sm: "px-3 py-2 font-medium",
    md: "px-6 py-3 font-semibold",
    xl: "px-12 py-4 font-semibold",
  };

  // Corner rounding styles
  const roundedStyles = {
    lg: "rounded-lg",
    full: "rounded-full",
  };

  // If animation is active, add a slide up effect on hover
  const hoverAnimation =
    animated && !disabled ? "transform hover:-translate-y-1" : "";

  // Combined version of all classes
  const classes = clsx(
    baseClass,
    sizes[size],
    roundedStyles[rounded],
    hoverAnimation,
    className
  );

  // If no 'as' prop is given, render as Link if 'to' is present, otherwise render as classic <button>
  if (!Component) {
    Component = to ? Link : "button";
  }

  return (
    <Component
      className={classes}
      to={to}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </Component>
  );
}
