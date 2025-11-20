import PageNav from "../ui/PageNav";
import Hero from "../features/home/Hero";
import MenuCategories from "../features/home/menuCategories/MenuCategories";
import About from "../features/home/about/About";
import Contact from "../features/home/contact/Contact";
import Footer from "../ui/Footer";
import useTitle from "../hooks/useTitle";

export default function Home() {
  useTitle("Bitecraft");
  return (
    <>
      <PageNav />
      <Hero />
      <MenuCategories />
      <About />
      <Contact />
      <Footer />
    </>
  );
}
