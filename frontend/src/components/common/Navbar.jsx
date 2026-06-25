import { Home } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

export default function Navbar() {

  const [isOpen,setIsOpen]=useState(false)
  const {user,logout}=useAuth()

  const toggleMenu=()=>{
    setIsOpen(!isOpen)
  }



  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-12 bg-black text-white px-2.5 py-2.5 rounded-2xl border border-zinc-800">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center">
            <Home size={22} />
          </div>
          <span className="text-base font-semibold">ApnaGhar</span>
        </div>

        {/* Nav Links */}
        <ul className="hidden md:flex items-center gap-5 text-gray-300 text-[14px]">
          <li className="hover:text-white cursor-pointer transition">
            Properties
          </li>
          <li className="hover:text-white cursor-pointer transition">
            New Projects
          </li>
          <li className="hover:text-white cursor-pointer transition">
            About
          </li>
          <li className="hover:text-white cursor-pointer transition">
            Contact
          </li>
        </ul>

        {/* Login Button */}
        <button className="bg-white text-black px-4 py-1.5 rounded-lg text-sm font-semibold hover:scale-105 transition">
          Log In
        </button>
      </div>
    </nav>
  );
}