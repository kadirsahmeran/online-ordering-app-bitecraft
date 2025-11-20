export const formatPrice = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value);

export const generateConfirmationToken = () => {
  const array = crypto.getRandomValues(new Uint8Array(8));
  return Array.from(array)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
};
