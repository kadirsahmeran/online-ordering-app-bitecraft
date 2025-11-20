// -----------------------------------------------------------------------------
// Component: Form
// Description: Reusable form container.
// Features:
//   - Flexibility in content with children
//   - Controlling form submission with onSubmit
//   - Optional title prop support

// -----------------------------------------------------------------------------

export default function Form({
  children,
  onSubmit,
  className = "", // To add extra class
  title = "", // Optional header
}) {
  return (
    <form
      onSubmit={onSubmit}
      className={`space-y-5 bg-black/10 md:p-8 p-5 rounded-2xl shadow-lg  border border-gold-darker/20 ${className}`}
    >
      {/* Show if there is a title */}
      {title && (
        <h5 className="text-xl sm:text-2xl mb-8 text-center text-gold font-medium">
          {title}
        </h5>
      )}
      {/* Form content */}
      {children}
    </form>
  );
}
