// -----------------------------------------------------------------------------
// Component: Textarea
// Description: Reusable textarea component.
// Features:
//   - Compatible with React Hook Form (register function and validation rules)
//   - Error messages (via the errors object)
//   - If no register is given, it will work as a normal HTML textarea.
// -----------------------------------------------------------------------------
export default function Textarea({
  register, // react-hook-form register function
  name, // field name (mandatory for RHF)
  errors = {}, // formState.errors objesi
  rules = {}, // validation rules
  placeholder = "",
  disabled = false,
  rows = 10,
}) {
  // If the register function is present, the textarea is controlled by RHF.
  const isRegistered = !!name && typeof register === "function";

  return (
    <div className="w-full">
      <textarea
        {...(isRegistered ? register(name, rules) : {})} // Connecting with RHF
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        className={`
          w-full px-4 py-3 rounded-lg border outline-none transition-all duration-300
          placeholder-gray-700 text-white resize-none
          disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed
          ${
            isRegistered && errors[name]
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-600 focus:border-gold focus:ring-2 focus:ring-gold/40"
          }
        `}
      />

      {/* Accessible error message */}
      {isRegistered && errors[name]?.message && (
        <p className="text-red-400 text-sm mt-1">{errors[name].message}</p>
      )}
    </div>
  );
}
