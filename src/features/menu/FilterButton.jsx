// -----------------------------------------------------------------------------
// Component: FilterButton
// Description: Button used in the category filter bar on the menu page.
// Özellikler:
//   - label: The category name that appears on the button
//   - count: number of products belonging to the category
//   - active: Is the button active (selected category)
//   - onClick: Function called when the button is clicked
//   - disabled: Is the button disabled?

// -----------------------------------------------------------------------------
export default function FilterButton({
  label,
  count,
  active,
  onClick,
  disabled = false,
}) {
  // base button styles
  const baseBtnClass = `
    font-medium text-sm px-4 py-2 rounded-full transition duration-200 cursor-pointer
  `;

  // Passive state styles
  const inactiveClass = `
    text-gray-300 bg-gray-800/50 hover:text-white hover:border-gold/60 hover:bg-gray-800 border border-transparent
  `;

  // Active state styles
  const activeClass = `
    text-white bg-gold/80 border border-gold shadow-md shadow-gold/20
  `;

  // Disabled state styles
  const disabledClass = `
    opacity-50 cursor-not-allowed
  `;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseBtnClass} ${active ? activeClass : inactiveClass} ${
        disabled ? disabledClass : ""
      }`}
    >
      {label}
      <span className="text-xs ml-1">({count})</span>
    </button>
  );
}
