// -----------------------------------------------------------------------------
// Component: Input
// Description: Reusable input component.
// Features:
//   - Compatible with React Hook Form (register function and validation rules)
//   - Error messages (via the errors object)
//   - If no register is given, it works as a normal HTML input.
// -----------------------------------------------------------------------------
export default function Input({
  register, // react-hook-form register function
  name, // field name (mandatory for RHF)
  rules = {}, // validation rules
  errors = {}, // formState.errors objesi
  type = "text",
  disabled = false,
  placeholder = "",
}) {
  // If there is no register function (RHF is not used), the input will work as a normal HTML input
  const isRegistered = !!name && typeof register === "function";

  return (
    <div className="w-full">
      <input
        {...(isRegistered ? register(name, rules) : {})} // Connecting with RHF
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        className={`
          w-full px-4 py-3 rounded-lg border outline-none transition-all duration-300
          placeholder-gray-700 text-white disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed

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
