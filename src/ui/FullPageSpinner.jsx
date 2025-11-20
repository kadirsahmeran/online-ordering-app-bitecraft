import Spinner from "./Spinner";

export default function FullPageSpinner() {
  return (
    <div className="fixed inset-0 z-50 bg-midnight flex items-center justify-center">
      <Spinner />
    </div>
  );
}
