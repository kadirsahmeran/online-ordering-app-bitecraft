import clsx from "clsx";

export default function ErrorState({
  message = "An error has occurred.",
  retryLabel = "Try again",
  onRetry,
  className = "",
  size = "md",
}) {
  const sizes = {
    md: "py-6 text-lg",
    xl: "py-12 md:text-xl text-lg",
  };
  const classes = clsx(className, sizes[size]);
  return (
    <div
      className={`col-span-full flex flex-col items-center justify-center ${classes}`}
    >
      <p className="text-red-300 font-medium mb-3 text-center">{message}</p>
      <button
        onClick={onRetry}
        className="text-gold hover:text-gold-light underline cursor-pointer"
      >
        {retryLabel}
      </button>
    </div>
  );
}
