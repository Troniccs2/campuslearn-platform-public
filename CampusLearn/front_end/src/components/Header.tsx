import React from "react";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-purple-900 px-8 py-4 shadow-xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo and App Name */}
        <div
          className="flex items-center gap-4 cursor-pointer"
          onClick={() => navigate("/")}
        >
          {/* Logo container matching the design */}
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border-2 border-purple-300">
            {/* Simulation of the Campus Learn logo graphic */}
            <span className="text-purple-900 font-extrabold text-lg">CL</span>
          </div>
          <h1 className="text-white text-3xl font-bold">Campus Learn</h1>
        </div>

        {/* Navigation Links */}
        <div className="flex gap-4">
          <button className="px-4 py-1 border-2 border-white text-white rounded-lg text-sm font-medium bg-transparent hover:bg-white hover:text-purple-900 transition duration-150">
            Student Portal
          </button>
          <button className="px-4 py-1 bg-purple-700 text-white rounded-lg text-sm font-medium border-2 border-purple-700 hover:bg-purple-800 transition duration-150">
            BG Connect
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
