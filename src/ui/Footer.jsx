import Logo from "./Logo";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="py-8 mt-10 md:mt-20">
      <div className="customContainer flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
        <div className="text-center md:text-left">
          <Logo />

          <p className="text-gray-500 mt-1">Fine flavors, delivered.</p>
        </div>

        <div className="text-center md:text-right text-gray-500">
          <p>© {year} Bitecraft. All rights reserved.</p>
          <p className="text-xs mt-1 text-gray-400">
            Designed by{" "}
            <span className="text-gold font-medium">Kadir Şahmeran</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
