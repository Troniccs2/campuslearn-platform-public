import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// Added icons for feedback: FaSpinner, FaCheckCircle, FaTimesCircle
import {
  FaKey,
  FaArrowLeft,
  FaEnvelope,
  FaSpinner,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import Header from "../components/Header";
import Footer from "../components/Footer";
import api from "../services/api"; // 👈 Your configured Axios instance

const AuthForgotPasswordForm: React.FC = () => {
  const navigate = useNavigate();

  // State for Form Input
  const [email, setEmail] = useState<string>("");

  // State for UI Feedback
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  // Submission Handler
  const handleResetRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    setIsLoading(true);

    try {
      // Send the email to the backend to initiate the reset process
      const response = await api.post("/auth/forgot-password", { email });

      if (response.status === 200) {
        // Security best practice: show a generic success message
        setSuccessMessage(
          "If an account exists, a password reset link has been sent to your email."
        );
        setEmail("");
      }
    } catch (err: any) {
      // Security best practice: also show the success message on common errors (like 404)
      if (err.response) {
        setSuccessMessage(
          "If an account exists, a password reset link has been sent to your email."
        );
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-indigo-100 flex flex-col relative overflow-hidden">
      {/* Floating elements (Design unchanged) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-32 h-32 bg-purple-200 rounded-full opacity-30"></div>
        <div
          className="absolute bottom-40 left-10 w-24 h-24 bg-indigo-200 rounded-full opacity-40 animate-bounce"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>
      <Header />

      <main className="w-full py-8 px-4 flex-grow">
        <div className="max-w-6xl mx-auto w-full">
          {/* TOP NAVIGATION BLOCK (Design unchanged) */}
          <div className="space-y-4 mb-10 md:mb-16">
            <div className="text-sm text-gray-500">
              Home/Authentication/ForgotPassword
            </div>

            <button
              onClick={() => navigate("/auth")}
              className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 font-medium"
            >
              <FaArrowLeft className="text-lg" />
              <span>Back to Authentication</span>
            </button>
          </div>

          {/* FORM CONTAINER */}
          <div className="flex justify-center w-full">
            <form // 👈 Wrapped components in a form
              onSubmit={handleResetRequest} // 👈 Added submit handler
              className="rounded-3xl shadow-2xl p-8 sm:p-12 space-y-8 flex flex-col items-center border-2 border-purple-300 border-opacity-30 bg-white bg-opacity-80 backdrop-blur-lg relative"
              style={{
                maxWidth: "500px",
                width: "100%",
              }}
            >
              {/* Glassmorphism overlay (Design unchanged) */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-indigo-50 opacity-50 rounded-3xl"></div>

              {/* Enhanced Header (Design unchanged) */}
              <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full flex items-center justify-center shadow-2xl">
                  <FaKey className="text-white text-3xl" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-purple-900 drop-shadow-sm">
                    Forgot Password
                  </h3>
                  <p className="text-sm text-purple-600 opacity-80">
                    Enter your email to receive a reset link.
                  </p>
                </div>
              </div>

              {/* MESSAGES */}
              {error && (
                <div className="w-full p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center gap-2 relative z-10">
                  <FaTimesCircle />
                  <p className="text-sm font-medium">{error}</p>
                </div>
              )}
              {successMessage && (
                <div className="w-full p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center gap-2 relative z-10">
                  <FaCheckCircle />
                  <p className="text-sm font-medium">{successMessage}</p>
                </div>
              )}

              <div className="space-y-6 w-full relative z-10">
                {/* Enhanced Email Input */}
                <div className="relative">
                  <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-600" />
                  <input
                    type="email"
                    placeholder="Enter Email"
                    value={email} // 👈 Added value
                    onChange={(e) => setEmail(e.target.value)} // 👈 Added onChange
                    required
                    className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent text-gray-700 bg-white shadow-md transition-all duration-300"
                  />
                </div>
                {/* Removed New Password Input: handled in a separate step after token is emailed */}
              </div>

              {/* Enhanced Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-2/3 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all duration-500 shadow-2xl hover:shadow-purple-500/50 text-lg relative z-10 transform ${
                  isLoading
                    ? "opacity-70 cursor-not-allowed scale-100"
                    : "hover:scale-110 hover:-translate-y-1"
                }`}
              >
                <span className="flex items-center justify-center gap-2">
                  {isLoading ? (
                    <FaSpinner className="animate-spin" />
                  ) : (
                    <FaKey />
                  )}
                  {isLoading ? "Sending Request..." : "Send Reset Link"}
                </span>
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AuthForgotPasswordForm;
