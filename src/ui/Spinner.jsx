export default function Spinner() {
  return (
    <div className="col-span-full flex items-center justify-center py-20">
      <div className="relative">
        <div className="w-24 h-24 border-4 border-gold/30 border-t-gold rounded-full animate-spin"></div>
        <div className="absolute inset-0 w-24 h-24 border-4 border-gold/20 border-b-gold rounded-full animate-spin animation-delay-300"></div>
      </div>
    </div>
  );
}
