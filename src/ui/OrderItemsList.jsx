export default function OrderItemsList({
  items,
  variant = "cart",
  scrollable = false, // MiniCart'ta scroll olsun mu?
  className = "",
}) {
  return (
    <>
      {scrollable ? (
        /* MiniCartDesktop için scroll'lu versiyon */
        <div
          className={`flex-1 overflow-y-auto px-4 pt-4 scrollbar-custom ${className}`}
        >
          <h3 className="text-xl text-gold font-semibold mb-2">Products</h3>
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <p>
                  {item.quantity}x {item.name}
                </p>
                <p className="font-medium">
                  $
                  {item.price
                    ? item.price * item.quantity
                    : item.discounted_price * item.quantity}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className={className}>
          {variant === "invoice" && (
            <h3 className="text-xl sm:text-2xl font-semibold mb-6 text-gold">
              Order summary
            </h3>
          )}
          <div className="flex flex-col gap-4 sm:text-lg text-base mb-6">
            {items.map((item, index) => (
              <div
                key={item.id || index}
                className="flex items-center justify-between"
              >
                <p>
                  {item.quantity}x {item.name}
                </p>
                <p>
                  $
                  {item.discounted_price
                    ? item.discounted_price * item.quantity
                    : item.price * item.quantity}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
