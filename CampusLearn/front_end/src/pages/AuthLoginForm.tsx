import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const AuthLoginForm: React.FC = () => {
  const navigate = useNavigate();

  // Define the purple color used in the app's header/cards
  const mainPurple = "#4C1D95";
  // Define a lighter, more muted purple for the box background
  const lightPurpleBg = "#EDE9FE";

  return (
    // 1. PAGE BACKGROUND: Changed to white
    <div className="min-h-screen bg-white">
      <Header />

      {/* Main content area: Centered and responsive */}
      <main className="max-w-4xl mx-auto py-8 px-4 flex flex-col items-center">
        {/* Navigation Info / Back Button Container */}
        <div className="w-full max-w-lg md:max-w-xl space-y-4 mb-6">
          {/* Navigation Info */}
          <div className="text-sm text-gray-500">
            Home/Authentication/LoginPortal
          </div>

          {/* Back Button */}
          <div className="flex justify-start">
            <button
              onClick={() => navigate("/auth")}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
            >
              <span className="text-lg">←</span>
              <span className="font-medium">Authentication</span>
            </button>
          </div>
        </div>

        {/* 2. PURPLE LOOKING BOX CONTAINER: Stretches almost to the ends */}
        <div
          className="rounded-xl shadow-2xl p-8 sm:p-12 space-y-8 flex flex-col items-center border border-purple-300 w-full"
          // We set the max-width to a professional size, and let it stretch to 100% of its container
          style={{ backgroundColor: lightPurpleBg, maxWidth: "500px" }}
        >
          <h3
            className="text-2xl font-bold text-center"
            style={{ color: mainPurple }}
          >
            Login Portal
          </h3>

          <div className="space-y-6 w-full">
            {/* 3. TEXT FIELDS: Stretch to a professional length */}
            <input
              type="email"
              placeholder="Enter Email"
              className="w-full p-3 rounded-lg border border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-700 text-gray-700"
            />
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full p-3 rounded-lg border border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-700 text-gray-700"
            />
          </div>

          <button
            type="submit"
            className="w-2/3 py-3 bg-purple-800 text-white rounded-lg font-semibold hover:bg-purple-900 transition shadow-md"
          >
            Login
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AuthLoginForm;
