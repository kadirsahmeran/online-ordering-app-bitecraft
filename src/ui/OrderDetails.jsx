import { formatPrice } from "../utils/helpers";

// Unified component for order summary or invoice
export default function OrderDetails({
  title = "Order Summary",
  items = [],
  totals = { totalFinalPrice: 0, totalOriginalPrice: 0, hasDiscount: false },
  customerInfo = null, // { first_name, last_name, phone, address, message }
}) {
  const { totalFinalPrice, totalOriginalPrice, hasDiscount } = totals;

  return (
    <div className="max-w-3xl mx-auto bg-black/10 text-gray-100 border border-gold-darker/20 shadow-lg rounded-2xl md:p-8 p-5">
      {customerInfo && (
        <div className="border-b border-b-gold-darker/60 mb-6">
          <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-gold">
            Customer Information
          </h3>
          <div className="flex flex-col gap-2 sm:text-lg text-base">
            <p>
              {customerInfo.first_name} {customerInfo.last_name}
            </p>
            <p>{customerInfo.phone}</p>
            <p>{customerInfo.address}</p>
            {customerInfo.message && <p>{customerInfo.message}</p>}
          </div>
        </div>
      )}

      <div className="border-b border-b-gold-darker/60 mb-6">
        <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-gold">
          {title}
        </h3>
        <div className="flex flex-col gap-2 sm:text-lg text-base max-h-[350px] overflow-y-auto scrollbar-custom pr-2">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between">
              <p>
                {item.quantity}x {item.name}
              </p>
              <p>{formatPrice(item.discounted_price * item.quantity)}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between sm:text-2xl text-xl mt-4 font-semibold text-gold">
        <p>Total Price</p>
        {hasDiscount ? (
          <div className="flex flex-col">
            <p className="line-through text-sm text-gray-100">
              {formatPrice(totalOriginalPrice)}
            </p>
            <p className="text-xl font-bold">{formatPrice(totalFinalPrice)}</p>
          </div>
        ) : (
          <p className="text-xl font-bold">{formatPrice(totalFinalPrice)}</p>
        )}
      </div>
    </div>
  );
}
