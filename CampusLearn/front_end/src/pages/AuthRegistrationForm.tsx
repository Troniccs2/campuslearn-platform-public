import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const AuthRegistrationForm: React.FC = () => {
  const navigate = useNavigate();

  // Define the colors used for the new professional design
  const mainPurple = "#4C1D95";
  const lightPurpleBg = "#EDE9FE";

  return (
    // PAGE BACKGROUND: White
    <div className="min-h-screen bg-white">
      <Header />

      {/* Main content area: Centered and responsive */}
      <main className="max-w-4xl mx-auto py-8 px-4 flex flex-col items-center">
        {/* Navigation Info / Back Button Container */}
        <div className="w-full max-w-lg md:max-w-xl space-y-4 mb-6">
          {/* Navigation Info */}
          <div className="text-sm text-gray-500">
            Home/Authentication/RegistrationPortal
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

        {/* PURPLE LOOKING BOX CONTAINER: Responsive width, clean border, light purple background */}
        <div
          className="rounded-xl shadow-2xl p-8 sm:p-12 space-y-8 flex flex-col items-center border border-purple-300 w-full"
          style={{ backgroundColor: lightPurpleBg, maxWidth: "500px" }}
        >
          <h3
            className="text-2xl font-bold text-center"
            style={{ color: mainPurple }}
          >
            Registration Portal
          </h3>

          <div className="space-y-6 w-full">
            {/* TEXT FIELDS: Professional length and styling */}
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
            Register
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AuthRegistrationForm;
