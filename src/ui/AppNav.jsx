import { Link } from "react-router";
import Logo from "./Logo";
import CartIcon from "./CartIcon";

export default function AppNav() {
  return (
    <header className="w-full bg-midnight shadow-md z-50 border-b border-b-gray-50/15">
      <div className="customContainer flex items-center justify-between h-20 md:h-26">
        <Link to="/">
          <Logo />
        </Link>

        <div className="flex items-center gap-8">
          <Link
            to="/menu"
            className="text-gray-100 font-semibold hover:text-gold transition"
          >
            Menu
          </Link>
          <Link to="/order">
            <CartIcon />
          </Link>
        </div>
      </div>
    </header>
  );
}
