/**
 * Component: OrderContainer
 * Description:
 *  - A reusable layout wrapper for order-related sections (summary, details, payment).

 *
 */

export default function OrderContainer({ className = "", children }) {
  return (
    <div
      className={`${className} bg-black/10 text-gray-100 border border-gold-darker/20 shadow-lg rounded-2xl md:p-8 p-5`}
    >
      {children}
    </div>
  );
}
