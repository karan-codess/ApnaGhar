import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";
import { 
  HiOutlineChatAlt2, 
  HiOutlineLibrary, 
  HiOutlineMail, 
  HiOutlineUserCircle, 
  HiOutlineUsers, 
  HiOutlineViewGrid,
  HiOutlineLogout,
  HiX
} from 'react-icons/hi';
import { Home } from 'lucide-react'; // <--- Home icon imported

const AdminSidebar = ({ isOpen, onClose }) => {
  const { logout } = useAuth();

  const navItems = [
    { name: "Overview", icon: HiOutlineViewGrid, path: "/admin-dashboard" },
    { name: "Users", icon: HiOutlineUsers, path: "/admin/users" },
    { name: "Seller Requests", icon: HiOutlineUserCircle, path: "/admin/seller-requests" },
    { name: "Properties", icon: HiOutlineLibrary, path: "/admin/properties" },
    { name: "Inquiries", icon: HiOutlineChatAlt2, path: "/admin/inquiries" },
    { name: "Contact Inbox", icon: HiOutlineMail, path: "/admin/contacts" },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50
          w-[240px] h-screen
          bg-white border-r border-gray-100
          flex flex-col justify-between py-6 px-4
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <div>
          {/* Logo with <Home size={22} /> */}
          <div className="flex items-center justify-between mb-8 px-2">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#0d6e59] text-white flex items-center justify-center shadow-sm">
                <Home size={22} />
              </div>
              <span className="font-bold text-xl text-[#0d6e59]">
                RealEstate
              </span>
            </div>

            {/* Mobile Close Button */}
            <button
              onClick={onClose}
              className="md:hidden p-1.5 rounded-lg text-gray-500 hover:bg-gray-100"
            >
              <HiX size={20} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  end={item.path === "/admin-dashboard"}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `
                    flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium
                    transition-all duration-200
                    ${
                      isActive
                        ? "bg-[#e6f7f5] text-[#0d6e59]"
                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                    }
                    `
                  }
                >
                  <Icon className="text-lg" />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Logout Button */}
        <div className="pt-4 border-t border-gray-100">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
          >
            <HiOutlineLogout className="text-lg" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;