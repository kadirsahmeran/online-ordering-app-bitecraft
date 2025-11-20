import { formatPrice } from "../utils/helpers";

export default function OrderRow({
  totalOriginalPrice,
  totalItems,
  hasDiscount,
  totalDiscount,
}) {
  return (
    <div className="py-8 text-gray-200 flex flex-col gap-3 text-sm">
      <div className="flex items-center justify-between">
        <p>Subtotal</p>
        <p>{formatPrice(totalOriginalPrice)}</p>
      </div>
      <div className="flex items-center justify-between">
        <p>Total Product</p>
        <p>{totalItems}</p>
      </div>

      {hasDiscount && (
        <div className="flex items-center justify-between">
          <p>Discount</p>
          <p className="text-red-400">- {formatPrice(totalDiscount)}</p>
        </div>
      )}
    </div>
  );
}
