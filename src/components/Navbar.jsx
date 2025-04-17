import { useState, useEffect } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const isHome = location.pathname === "/";
  const isAdmin = location.pathname === "/admin";
  const id = searchParams.get("id");

  // Titolo dinamico di pagina (statics di default, o fetch per Articolo)
  const [pageTitle, setPageTitle] = useState("");

  useEffect(() => {
    let title = "";
    if (location.pathname === "/categoria") {
      title = "Nome Categoria";
      setPageTitle(title);
    } else if (location.pathname === "/post") {
      title = "Creazione Articolo";
      setPageTitle(title);
    } else if (location.pathname === "/articolo") {
      // quando entri su /articolo?id=..., fetcha il titolo reale
      if (id) {
        fetch(`https://atrazzera.altervista.org/backend/get_articles.php?id=${id}`)
          .then((res) => res.json())
          .then((data) => setPageTitle(data.titolo || ""))
          .catch((err) => {
            console.error("Errore fetch titolo articolo:", err);
            setPageTitle("");
          });
      } else {
        setPageTitle("");
      }
    } else {
      // per tutte le altre rotte (es. admin) reset
      setPageTitle("");
    }
  }, [location.pathname, id]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        scrolled ? "bg-white/10 backdrop-blur-md" : "bg-[#2e3740]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {!isHome ? (
          <div className="flex items-center justify-between h-20">
            {/* Sinistra: Back */}
            <div className="w-1/3">
              <Link
                to="/"
                className="inline-flex items-center bg-[#E1CE7A] p-2 rounded-lg shadow-md hover:bg-[#EBCFB2] transition"
              >
                <img src="/BackArrow.svg" alt="Indietro" className="w-6 h-6" />
                <span className="text-black font-medium text-sm ml-2">
                  Indietro
                </span>
              </Link>
            </div>

            {/* Centro: logo */}
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

            {/* Destra: titolo dinamico (vuoto in admin) */}
            <div className="w-1/3 flex justify-end">
              {!isAdmin && pageTitle && (
                <span className="text-white font-medium text-xl">
                  {pageTitle}
                </span>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between h-20">
            {/* Homepage: logo più grande a sinistra */}
            <div className="flex items-center">
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

            {/* Menu desktop */}
            <div className="hidden md:flex space-x-8 text-white font-medium text-sm">
              <Link to="/chi-siamo" className="hover:text-yellow-300 transition">
                Chi Siamo
              </Link>
              <Link
                to="/valguarnera"
                className="hover:text-yellow-300 transition"
              >
                Valguarnera
              </Link>
              <Link to="/sicilia" className="hover:text-yellow-300 transition">
                Sicilia
              </Link>
              <Link to="/eventi" className="hover:text-yellow-300 transition">
                Eventi
              </Link>
            </div>
          </div>
        )}

        {/* Hamburger mobile (sempre visibile) */}
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
