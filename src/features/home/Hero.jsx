import Button from "../../ui/Button";

// -----------------------------------------------------------------------------
// Component: Hero
// Description: Hero section at the top of the page.
// Özellikler:
//   - Full screen background video
//   - Text readability with dark overlay
//   - Title, description, and Call-to-Action button
// -----------------------------------------------------------------------------

export default function Hero() {
  return (
    <section id="hero" className="relative w-full min-h-screen overflow-hidden">
      {/* Background video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="kofte.mp4"
        autoPlay
        loop
        muted
        playsInline
        poster="aboutVideoImagejpg.jpg"
      ></video>

      {/* Dark overlay  */}
      <div className="absolute inset-0 bg-midnight opacity-70"></div>
      {/* Gradient overlay at the bottom*/}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-linear-to-b from-transparent to-midnight"></div>

      {/* --- Content: Title + Description + Button --- */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-white text-center py-50 px-8">
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-semibold mb-4 sm:mb-6 leading-12">
          Welcome to Bite<span className="text-gold">craft</span>{" "}
        </h1>
        <p className="text-lg sm:text-xl text-gray-200 mb-4 sm:mb-6">
          Order now and enjoy the taste
        </p>
        <Button to="/menu" animated={true}>
          Order Now
        </Button>
      </div>
    </section>
  );
}
