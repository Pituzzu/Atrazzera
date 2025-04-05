import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isAdmin = location.pathname === "/admin";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  let dynamicTitle = "";
  if (location.pathname === "/articolo") {
    dynamicTitle = "Titolo Articolo";
  } else if (location.pathname === "/categoria") {
    dynamicTitle = "Nome Categoria";
  } else if (location.pathname === "/post") {
    dynamicTitle = "Creazione Articolo";
  }
  // Per admin non mettiamo niente

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        scrolled ? "bg-white/10 backdrop-blur-md" : "bg-[#2e3740]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {!isHome ? (
          // Layout per pagine diverse dalla homepage: pulsante "Indietro" in card, logo centrato e titolo dinamico a destra (tranne in admin)
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center w-full">
              {/* Sezione sinistra: Pulsante "Indietro" in card */}
              <div className="w-1/3 flex justify-start">
                <Link
                  to="/"
                  className="inline-flex items-center bg-[#E1CE7A] p-2 rounded-lg shadow-md hover:bg-[#EBCFB2] transition"
                >
                  <img
                    src="/BackArrow.svg"
                    alt="Indietro"
                    className="w-6 h-6"
                  />
                  <span className="text-black font-medium text-sm ml-2">
                    Indietro
                  </span>
                </Link>
              </div>
              {/* Sezione centrale: Logo e titolo centrati e leggermente ingranditi */}
              <div className="w-1/3 flex justify-center">
                <Link to="/" className="flex items-center space-x-3">
                  <img
                    src="/logo.png"
                    alt="Logo aTrazzera"
                    className="h-20 w-auto"
                  />
                  <span className="text-white font-semibold text-xl hidden sm:block">
                    'A trazzera
                  </span>
                </Link>
              </div>
              {/* Sezione destra: Titolo dinamico (vuoto in admin) */}
              <div className="w-1/3 flex justify-end">
                {!isAdmin && (
                  <span className="text-white font-medium text-xl">
                    {dynamicTitle}
                  </span>
                )}
              </div>
            </div>
          </div>
        ) : (
          // Layout per homepage: logo e titolo allineati a sinistra, logo ancora più grande, e menu a destra
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center justify-start">
              <Link to="/" className="flex items-center space-x-3">
                <img
                  src="/logo.png"
                  alt="Logo aTrazzera"
                  className="h-24 w-auto"
                />
                <span className="text-white font-semibold text-lg hidden sm:block">
                  'A trazzera
                </span>
              </Link>
            </div>
            <div className="flex items-center">
              <div className="hidden md:flex space-x-8 text-white font-medium text-sm">
                <Link
                  to="/chi-siamo"
                  className="hover:text-yellow-300 transition"
                >
                  Chi Siamo
                </Link>
                <Link
                  to="/valguarnera"
                  className="hover:text-yellow-300 transition"
                >
                  Valguarnera
                </Link>
                <Link
                  to="/sicilia"
                  className="hover:text-yellow-300 transition"
                >
                  Sicilia
                </Link>
                <Link to="/eventi" className="hover:text-yellow-300 transition">
                  Eventi
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Hamburger Mobile (visibile su tutte le pagine) */}
        <div className="md:hidden flex items-center justify-end">
          <button className="text-white focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
