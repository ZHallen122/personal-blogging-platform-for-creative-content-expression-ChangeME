import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu as MenuIcon, X as XIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Header: React.FC = () => {
  const location = useLocation();
  const isHomepage = location.pathname === "/";
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle header background change on scroll for homepage
  useEffect(() => {
    if (isHomepage) {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 50);
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [isHomepage]);

  // Determine header background classes based on route and scroll state
  const headerBgClass = isHomepage
    ? isScrolled
      ? "bg-white bg-opacity-100 shadow-md"
      : "bg-white bg-opacity-70"
    : "bg-white shadow-md";

  return (
    <header
      className={`${headerBgClass} fixed top-0 left-0 w-full z-50 transition-colors duration-300`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-2xl font-bold text-[#2c3e50] font-arial"
            >
              Creative Bloom
            </Link>
          </div>

          {/* Center: Navigation Links (Desktop) */}
          <nav className="hidden md:flex space-x-8">
            <Link
              to="/"
              className="text-base text-[#2c3e50] hover:text-[#3498db] transition-colors font-arial"
            >
              Home
            </Link>
            <Link
              to="/explore"
              className="text-base text-[#2c3e50] hover:text-[#3498db] transition-colors font-arial"
            >
              Explore
            </Link>
            <Link
              to="/create"
              className="text-base text-[#2c3e50] hover:text-[#3498db] transition-colors font-arial"
            >
              Create
            </Link>
          </nav>

          {/* Right: Authentication Controls (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/login"
              className="px-4 py-2 rounded bg-[#3498db] text-white hover:bg-[#e74c3c] transition-colors font-arial"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 rounded border border-[#3498db] text-[#3498db] hover:bg-[#3498db] hover:text-white transition-colors font-arial"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? (
                <XIcon className="w-6 h-6 text-[#2c3e50]" />
              ) : (
                <MenuIcon className="w-6 h-6 text-[#2c3e50]" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white shadow-md"
          >
            <nav className="flex flex-col space-y-2 px-4 py-2">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-base text-[#2c3e50] hover:text-[#3498db] transition-colors font-arial"
              >
                Home
              </Link>
              <Link
                to="/explore"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-base text-[#2c3e50] hover:text-[#3498db] transition-colors font-arial"
              >
                Explore
              </Link>
              <Link
                to="/create"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-base text-[#2c3e50] hover:text-[#3498db] transition-colors font-arial"
              >
                Create
              </Link>
              <hr className="my-2 border-gray-200" />
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-base text-[#2c3e50] hover:text-[#3498db] transition-colors font-arial"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-base text-[#2c3e50] hover:text-[#3498db] transition-colors font-arial"
              >
                Sign Up
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;