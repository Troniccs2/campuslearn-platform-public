import React from "react";
import { useNavigate } from "react-router-dom";
import { FaGraduationCap, FaUserGraduate, FaNetworkWired } from "react-icons/fa";

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-gradient-to-r from-purple-900 via-purple-800 to-indigo-900 px-8 py-4 shadow-2xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo and App Name */}
        <div
          className="flex items-center gap-4 cursor-pointer group"
          onClick={() => navigate("/")}
        >
          {/* Enhanced Logo container */}
          <div className="w-14 h-14 bg-gradient-to-br from-white to-purple-100 rounded-full flex items-center justify-center border-3 border-purple-300 shadow-lg group-hover:scale-110 transition-transform duration-300">
            <FaGraduationCap className="text-purple-900 text-2xl" />
          </div>
          <h1 className="text-white text-3xl font-bold tracking-wide group-hover:text-purple-200 transition-colors duration-300">
            Campus Learn
          </h1>
        </div>

        {/* Enhanced Navigation Links */}
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-6 py-2 border-2 border-white text-white rounded-xl text-sm font-medium bg-transparent hover:bg-white hover:text-purple-900 transition-all duration-300 hover:scale-105 shadow-lg">
            <FaUserGraduate className="text-lg" />
            Student Portal
          </button>
          <button className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-purple-700 to-indigo-700 text-white rounded-xl text-sm font-medium border-2 border-purple-600 hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 hover:scale-105 shadow-lg">
            <FaNetworkWired className="text-lg" />
            BG Connect
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
