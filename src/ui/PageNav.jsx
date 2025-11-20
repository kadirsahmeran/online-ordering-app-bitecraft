import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useCart } from "../context/CartContext";
import Logo from "./Logo";
import Button from "./Button";
import CartIcon from "./CartIcon";
import { Link } from "react-router";

// -----------------------------------------------------------------------------
// Component: PageNav
// Description: The navigation bar at the top of the page.
// Features:
//   - Adding background and shadow based on scroll state
//   - Active section detection and link highlight
//   - Responsive (desktop and mobile) menu
// -----------------------------------------------------------------------------

const pageNavLinks = [
  { label: "Menu", href: "#menuCategories" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function PageNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { totalItems } = useCart();
  // Change header background according to scroll + detect which section we are in
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);

      // To determine which section the user is currently in
      // We base our viewport on half of the screen → it gives a more natural sense of activity
      const scrollY = window.scrollY + window.innerHeight / 2;
      let foundActive = false;

      pageNavLinks.forEach((link) => {
        const section = document.querySelector(link.href);
        if (section) {
          const { offsetTop, offsetHeight } = section;
          if (scrollY >= offsetTop && scrollY < offsetTop + offsetHeight) {
            setActiveSection(link.href);
            foundActive = true;
          }
        }
      });
      // Reset the activity if we are not in any section (for example in the footer)
      if (!foundActive) setActiveSection("");
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Run immediately when page loads
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll + close mobile menu
  function handleLinkClick(href) {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  }

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? "bg-midnight shadow-md border-b border-b-gray-50/15"
          : "bg-transparent"
      }`}
    >
      <div className="customContainer h-20 md:h-26 flex items-center justify-between">
        {/* LOGO Return to home page + scroll to top */}
        <Link to="/" onClick={() => window.scrollTo(0, 0)}>
          <Logo />
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-6">
          <ul className="text-gray-100 flex items-center gap-8 font-semibold">
            <MenuItems
              handleLinkClick={handleLinkClick}
              activeSection={activeSection}
            />
            <li>
              <Button to="/menu" size="sm" rounded="full">
                Order online
              </Button>
            </li>
          </ul>

          {/* CART ICON (masaüstü) */}
          {totalItems > 0 && (
            <Link to="/order">
              <CartIcon />
            </Link>
          )}
        </nav>

        {/* MENU ICON (md altı) */}
        <div className="flex items-center gap-4 md:hidden">
          {/* Show icon on desktop if there is a product in the cart */}
          {totalItems > 0 && (
            <Link to="/order">
              <CartIcon />
            </Link>
          )}

          {/* Menu open/close button */}
          <button
            className="relative w-8 h-8 flex items-center justify-center text-white md:text-2xl text-xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span
              className={`absolute transition-transform duration-300  ${
                menuOpen ? "opacity-0 rotate-90" : "opacity-100 rotate-0"
              }`}
            >
              <Menu />
            </span>
            <span
              className={`absolute transition-transform duration-300 ${
                menuOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"
              }`}
            >
              <X />
            </span>
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`absolute top-full left-0 w-full bg-midnight z-40 transform transition-all duration-300 ease-in-out overflow-hidden border-b border-b-gray-50/15 ${
          menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col items-center gap-6 py-6 text-gray-100 text-lg font-semibold font-montserrat">
          <MenuItems
            handleLinkClick={handleLinkClick}
            activeSection={activeSection}
          />
          <li>
            <Button to="/menu" size="sm" rounded="full">
              Order online
            </Button>
          </li>
        </ul>
      </div>
    </header>
  );
}

// We separated the navigation links for reuse on both desktop and mobile
function MenuItems({ handleLinkClick, activeSection }) {
  return (
    <>
      {pageNavLinks.map((link) => (
        <li key={link.href}>
          <a
            onClick={() => handleLinkClick(link.href)}
            className={`relative transition-all duration-300 cursor-pointer ${
              activeSection === link.href
                ? "text-gold drop-shadow-[0_0_6px_#c59764]"
                : "text-gray-200 hover:text-gold hover:drop-shadow-[0_0_6px_#c59764]"
            }`}
          >
            {link.label}
          </a>
        </li>
      ))}
    </>
  );
}
