import { Home } from "lucide-react";
import { Menu, X } from "lucide-react";
import { Star } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [];

  if (!user) {
    navLinks.push(
      { name: "Properties", path: "/properties" },
      { name: "About", path: "/about" },
      { name: "Contact", path: "/contact" },
    );
  }

  if (user?.role === "buyer") {
    navLinks.push(
      { name: "Properties", path: "/properties" },
      { name: "Wishlist", path: "/wishlist" },
      { name: "About", path: "/about" },
      { name: "Contact", path: "/contact" },
      { name: "Profile", path: "/profile" },
    );
  }

  if (user?.role === "seller") {
    navLinks.push(
      { name: "My Properties", path: "/my-properties" },
      { name: "Dashboard", path: "/seller-dashboard" },
      { name: "About", path: "/about" },
      { name: "Contact", path: "/contact" },
      { name: "Profile", path: "/profile" },
    );
  }

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-black text-white px-2.5 py-2.5 rounded-2xl border border-zinc-800">
        <div className="flex items-center justify-between gap-12">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center">
              <Home size={22} />
            </div>
            <span className="text-base font-semibold">ApnaGhar</span>
          </div>

          {/* Nav Links */}
          <ul className="hidden md:flex items-center gap-5 text-gray-300 text-[14px]">
            {navLinks.map((link) => (
              <li
                key={link.path}
                className="hover:text-white cursor-pointer transition "
              >
                <Link to={link.path}>{link.name}</Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            {!user ? (
              <Link
                to="/login"
                className="bg-white text-black px-4 py-1.5 rounded-lg text-sm font-semibold hover:scale-105 transition whitespace-nowrap"
              >
                Log In
              </Link>
            ) : (
              <div className="flex items-center gap-2 bg-white text-black px-4 py-1.5 rounded-lg">
                <span className="font-semibold text-sm">{user.name}</span>
                <div className="relative group">
                  <Star
                    size={16}
                    className={
                      user.role === "seller"
                        ? "fill-green-500 text-green-500 cursor-pointer"
                        : "fill-blue-500 text-blue-500 cursor-pointer"
                    }
                  />

                  <div className="absolute left-1/2 -translate-x-1/2 top-6 opacity-0 group-hover:opacity-100 transition bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                    {user.role}
                  </div>
                </div>
              </div>
            )}
            <button className="md:hidden" onClick={toggleMenu}>
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
        {isOpen && (
      <div className="md:hidden px-4 mt-8 py-4 pt-4">
        <ul className="flex flex-col gap-6 text-2xl">

          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block"
              >
                {link.name}
              </Link>
            </li>
          ))}

          {user && (
            <li>
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="text-red-400"
              >
                Logout
              </button>
            </li>
          )}

        </ul>
      </div>
    )}
      </div>
    </nav>
  );
}
