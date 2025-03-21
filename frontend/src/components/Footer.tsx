import React from "react";
import { Twitter, Facebook, Instagram } from "lucide-react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white text-[#2c3e50] p-5">
      <div className="max-w-7xl mx-auto">
        {/* Upper Section: Primary Navigation Links */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center border-b border-gray-200 pb-4">
          <div className="flex flex-col md:flex-row gap-4 text-center md:text-left">
            <a
              href="/about"
              className="font-georgia-serif text-base transition hover:underline"
            >
              About
            </a>
            <a
              href="/contact"
              className="font-georgia-serif text-base transition hover:underline"
            >
              Contact
            </a>
            <a
              href="/terms"
              className="font-georgia-serif text-base transition hover:underline"
            >
              Terms of Service
            </a>
          </div>
        </div>

        {/* Lower Section: Copyright and Social Media Links */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mt-4">
          <div className="text-center md:text-left text-sm font-georgia-serif">
            © {currentYear} Creative Bloom. All rights reserved.
          </div>
          <div className="flex gap-4 mt-2 md:mt-0 justify-center">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="transition transform hover:scale-110 hover:text-[#e74c3c]"
            >
              <Twitter size={24} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="transition transform hover:scale-110 hover:text-[#e74c3c]"
            >
              <Facebook size={24} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="transition transform hover:scale-110 hover:text-[#e74c3c]"
            >
              <Instagram size={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;