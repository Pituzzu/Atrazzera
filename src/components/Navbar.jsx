import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${scrolled ? "bg-white/10 backdrop-blur-md" : "bg-[#2e3740]"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/">
              <img src="/Group 14.svg" alt="Logo aTrazzera" className="h-12" />
            </Link>
          </div>

          {/* Menu Desktop */}
          <div className="hidden md:flex space-x-8 text-white font-medium text-sm">
            <Link to="/chi-siamo" className="hover:text-yellow-300 transition">Chi Siamo</Link>
            <Link to="/valguarnera" className="hover:text-yellow-300 transition">Valguarnera</Link>
            <Link to="/sicilia" className="hover:text-yellow-300 transition">Sicilia</Link>
            <Link to="/eventi" className="hover:text-yellow-300 transition">Eventi</Link>
          </div>

          {/* Hamburger Mobile */}
          <div className="md:hidden">
            <button className="text-white focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
