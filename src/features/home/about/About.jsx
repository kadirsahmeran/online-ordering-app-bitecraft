import Button from "../../../ui/Button";
import AboutVideo from "./AboutVideo";

// -----------------------------------------------------------------------------
// Component: About
// Description: Displays the "About" section containing brand story text,
//              an illustration image, and an embedded AboutVideo component.
// -----------------------------------------------------------------------------
export default function About() {
  return (
    <section id="about" className="py-12 md:py-20">
      <div className="customContainer mb-15 md:mb-25">
        {/* --- Layout Wrapper: Image & Text --- */}
        <div className="flex flex-col md:flex-row items-center gap-12 ">
          {/* Image - Bottom on mobile, left on desktop*/}
          <div className="w-full md:w-1/2 flex justify-center md:order-1 order-2">
            <img
              src="aboutImage.jpeg"
              alt="About Patio Time Cafe"
              className="w-full max-w-[450px] h-auto object-cover rounded-tl-full rounded-tr-full shadow-lg"
            />
          </div>
          {/* Text content - Top on mobile, right on desktop */}
          <div className="w-full md:w-1/2 text-center md:text-left md:order-2 order-1">
            <h4 className="text-gold text-lg uppercase tracking-widest mb-3">
              Hey! Welcome to Bitecraft
            </h4>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-5 text-white">
              Our Story
            </h3>
            <p className="leading-relaxed mb-3 text-gray-200">
              Founded in 1992,
              <span className="text-gold font-bold"> Bitecraft</span> began with
              a simple passion — to serve meals that bring people together. From
              our handcrafted burgers to our wood-fired pizzas and freshly made
              pasta, we’ve always believed that great food starts with quality
              ingredients and genuine care.
            </p>
            <p className=" leading-relaxed mb-5 text-gray-200">
              Over the years, we’ve grown into more than just a restaurant —
              we’ve become a place where flavor, warmth, and community meet. At
              Bitecraft, every dish is prepared with heart, every guest is
              welcomed like family, and every visit is meant to be remembered.
            </p>
            <Button animated={true}>Learn more</Button>
          </div>
        </div>
      </div>
      <AboutVideo />
    </section>
  );
}
