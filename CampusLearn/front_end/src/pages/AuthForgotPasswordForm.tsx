import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const AuthForgotPasswordForm: React.FC = () => {
  const navigate = useNavigate();

  const mainPurple = "#4C1D95";
  const lightPurpleBg = "#EDE9FE";

  return (
    // CONTAINER FIX: Use flex-col to push content up and footer down
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      {/* Main content area: flex-grow allows this section to fill all available space */}
      <main className="w-full py-8 px-4 flex-grow">
        {/* Inner container to control max width of content and center the form */}
        <div className="max-w-6xl mx-auto w-full">
          {/* TOP NAVIGATION BLOCK (FLUSHED LEFT) */}
          <div className="space-y-4 mb-10 md:mb-16">
            {/* Breadcrumb/Navigation Info */}
            <div className="text-sm text-gray-500">
              Home/Authentication/ForgotPassword
            </div>

            {/* Back Button - Flushed to the left edge */}
            <button
              onClick={() => navigate("/auth")}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition shadow-md"
            >
              <span className="text-lg">←</span>
              <span className="font-medium">Authentication</span>
            </button>
          </div>

          {/* FORM CONTAINER - Center the form itself */}
          <div className="flex justify-center w-full">
            <div
              className="rounded-xl shadow-2xl p-8 sm:p-12 space-y-8 flex flex-col items-center border border-purple-300"
              style={{
                backgroundColor: lightPurpleBg,
                maxWidth: "500px",
                width: "100%",
              }}
            >
              <h3
                className="text-2xl font-bold text-center"
                style={{ color: mainPurple }}
              >
                Forgot Password
              </h3>

              <div className="space-y-6 w-full">
                {/* TEXT FIELDS */}
                <input
                  type="email"
                  placeholder="Enter Email"
                  className="w-full p-3 rounded-lg border border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-700 text-gray-700"
                />
                <input
                  type="password"
                  placeholder="Enter New Password"
                  className="w-full p-3 rounded-lg border border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-700 text-gray-700"
                />
              </div>

              <button
                type="submit"
                className="w-2/3 py-3 bg-purple-800 text-white rounded-lg font-semibold hover:bg-purple-900 transition shadow-md"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER: Pushed to the very bottom */}
      <Footer />
    </div>
  );
};

export default AuthForgotPasswordForm;
