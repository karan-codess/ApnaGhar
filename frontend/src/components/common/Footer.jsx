import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  HiMail,
  HiPhone,
  HiLocationMarker,
  HiChevronUp,
} from "react-icons/hi";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { HiOutlineCube } from "react-icons/hi";

const Footer = () => {
  const [email, setEmail] = useState("");

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    // TODO: wire up newsletter subscription
    setEmail("");
  };

  return (
    <footer className="relative bg-white border-t border-[#e2e8f0] pt-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr_1.2fr] gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-lg bg-primary text-white flex items-center justify-center font-extrabold text-sm">
              RE
            </div>
            <span className="text-primary font-extrabold text-xl">
              RealEstate
            </span>
          </div>
          <p className="text-text-muted text-[0.9375rem] leading-relaxed mb-5 max-w-xs">
            The most trusted platform for buying, selling, and renting
            premium real estate globally. We make property hunting seamless.
          </p>
          <div className="flex items-center gap-4 text-text-main">
            <a href="#" aria-label="Facebook" className="hover:text-primary transition-colors">
              <FaFacebookF size={16} />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-primary transition-colors">
              <FaTwitter size={16} />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-primary transition-colors">
              <FaInstagram size={16} />
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-primary transition-colors">
              <FaLinkedinIn size={16} />
            </a>
          </div>
        </div>

        {/* Company */}
        <div>
          <h4 className="font-extrabold text-text-main mb-5">Company</h4>
          <ul className="flex flex-col gap-4 list-none p-0 m-0">
            <li>
              <Link to="/" className="text-text-muted text-[0.9375rem] no-underline hover:text-primary transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/property" className="text-text-muted text-[0.9375rem] no-underline hover:text-primary transition-colors">
                Property
              </Link>
            </li>
            <li>
              <Link to="/wishlist" className="text-text-muted text-[0.9375rem] no-underline hover:text-primary transition-colors">
                Wishlist
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-text-muted text-[0.9375rem] no-underline hover:text-primary transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="font-extrabold text-text-main mb-5">Support</h4>
          <ul className="flex flex-col gap-4 list-none p-0 m-0">
            <li className="flex items-center gap-2 text-text-muted text-[0.9375rem]">
              <HiMail className="text-primary shrink-0" size={18} />
              contact@reestate.com
            </li>
            <li className="flex items-center gap-2 text-text-muted text-[0.9375rem]">
              <HiPhone className="text-primary shrink-0" size={18} />
              +91 1234567890
            </li>
            <li className="flex items-center gap-2 text-text-muted text-[0.9375rem]">
              <HiLocationMarker className="text-primary shrink-0" size={18} />
              123 Business Hub, India
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="font-extrabold text-text-main mb-5">Newsletter</h4>
          <p className="text-text-muted text-[0.9375rem] leading-relaxed mb-4">
            Subscribe to get the latest listings and market insights directly
            in your inbox.
          </p>
          <form onSubmit={handleSubscribe} className="flex items-center gap-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 min-w-0 px-4 py-2.5 rounded-lg border border-[#e2e8f0] text-[0.9375rem] text-text-main placeholder:text-[#94a3b8] outline-none focus:border-primary transition-colors"
            />
            <button
              type="submit"
              className="bg-primary text-white px-5 py-2.5 rounded-lg font-bold text-[0.9375rem] whitespace-nowrap hover:opacity-90 transition-opacity"
            >
              Join
            </button>
          </form>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#e2e8f0] mt-12 py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-text-muted text-[0.875rem] order-1 md:order-1">
            © {new Date().getFullYear()} RealEstate. All rights reserved.
          </span>

          <span className="flex items-center gap-1.5 text-[0.875rem] text-text-muted order-3 md:order-2">
            <HiOutlineCube className="text-primary" size={16} />
            Designed by{" "}
            <a
              href="#"
              className="text-primary font-semibold no-underline hover:underline"
            >
              Hexagon Digital Services
            </a>
          </span>

          <div className="flex items-center gap-6 order-2 md:order-3">
            <a href="#" className="text-text-main text-[0.875rem] no-underline hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-text-main text-[0.875rem] no-underline hover:text-primary transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-text-main text-[0.875rem] no-underline hover:text-primary transition-colors">
              Cookies Settings
            </a>
          </div>
        </div>
      </div>

      {/* Scroll to top */}
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className="fixed bottom-6 right-6 w-11 h-11 rounded-full bg-primary text-white flex items-center justify-center shadow-[0_4px_14px_rgba(0,0,0,0.15)] hover:opacity-90 transition-opacity z-50"
      >
        <HiChevronUp size={22} />
      </button>
    </footer>
  );
};

export default Footer;
