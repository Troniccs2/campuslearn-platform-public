import React from "react";
import { useNavigate } from "react-router-dom";
import { FaSignInAlt, FaArrowLeft, FaEnvelope, FaLock } from "react-icons/fa";
import Header from "../components/Header";
import Footer from "../components/Footer";

const AuthLoginForm: React.FC = () => {
  const navigate = useNavigate();

  const mainPurple = "#4C1D95";
  const lightPurpleBg = "#EDE9FE";

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-indigo-100 flex flex-col relative overflow-hidden">
      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-32 h-32 bg-purple-200 rounded-full opacity-30"></div>
        <div className="absolute bottom-40 left-10 w-24 h-24 bg-indigo-200 rounded-full opacity-40 animate-bounce" style={{animationDelay: '2s'}}></div>
      </div>
      <Header />

      {/* Main content area: 
          1. Use w-full and NO mx-auto here to use the full page width.
          2. Use a responsive padding (px-4) for mobile/desktop spacing.
      */}
      <main className="w-full py-8 px-4 flex-grow">
        {/* Inner container to control max width of content and center the form */}
        <div className="max-w-6xl mx-auto w-full">
          {/* TOP NAVIGATION BLOCK (FLUSHED LEFT) */}
          <div className="space-y-4 mb-10 md:mb-16">
            {/* Breadcrumb/Navigation Info */}
            <div className="text-sm text-gray-500">
              Home/Authentication/LoginPortal
            </div>

            {/* Enhanced Back Button */}
            <button
              onClick={() => navigate("/auth")}
              className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 font-medium"
            >
              <FaArrowLeft className="text-lg" />
              <span>Back to Authentication</span>
            </button>
          </div>

          {/* FORM CONTAINER - Center the form itself */}
          <div className="flex justify-center w-full">
            <div
              className="rounded-3xl shadow-2xl p-8 sm:p-12 space-y-8 flex flex-col items-center border-2 border-purple-300 border-opacity-30 bg-white bg-opacity-80 backdrop-blur-lg relative"
              style={{
                maxWidth: "500px",
                width: "100%",
              }}
            >
              {/* Glassmorphism overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-indigo-50 opacity-50 rounded-3xl"></div>
              {/* Enhanced Header with Icon */}
              <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full flex items-center justify-center shadow-2xl">
                  <FaSignInAlt className="text-white text-3xl" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-purple-900 drop-shadow-sm">
                    Login Portal
                  </h3>
                  <p className="text-sm text-purple-600 opacity-80">Welcome back to Campus Learn</p>
                </div>
              </div>

              <div className="space-y-6 w-full relative z-10">
                {/* Enhanced Email Input */}
                <div className="relative">
                  <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-600" />
                  <input
                    type="email"
                    placeholder="Enter Email"
                    className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent text-gray-700 bg-white shadow-md transition-all duration-300"
                  />
                </div>
                {/* Enhanced Password Input */}
                <div className="relative">
                  <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-600" />
                  <input
                    type="password"
                    placeholder="Enter Password"
                    className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent text-gray-700 bg-white shadow-md transition-all duration-300"
                  />
                </div>
              </div>

              {/* Enhanced Submit Button */}
              <button
                type="submit"
                className="w-2/3 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all duration-500 shadow-2xl hover:shadow-purple-500/50 hover:scale-110 text-lg relative z-10 transform hover:-translate-y-1"
              >
                <span className="flex items-center justify-center gap-2">
                  <FaSignInAlt />
                  Login
                </span>
              </button>
            </div>
          </div>
        </div>{" "}
        {/* End of max-w-6xl container */}
      </main>

      <Footer />
    </div>
  );
};

export default AuthLoginForm;
