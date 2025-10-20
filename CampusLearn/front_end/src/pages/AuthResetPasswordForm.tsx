import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  FaKey,
  FaLock,
  FaSpinner,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import Layout from "../components/Layout";
import BackButton from "../components/BackButton";
import api from "../services/api";

const AuthResetPasswordForm: React.FC = () => {
  const navigate = useNavigate();
  // Gets the 'token' and 'email' parameters from the URL
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  // --- State for Form Input ---
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  // --- State for UI Feedback ---
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  useEffect(() => {
    // If the token or email is missing from the URL, redirect or show an error
    if (!token || !email) {
      setError("Invalid or expired password reset link.");
      // Optionally redirect after a delay
      setTimeout(() => navigate("/auth"), 3000);
    }
  }, [token, email, navigate]);

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("New password and confirmation password do not match.");
      return;
    }

    if (!token || !email) {
      setError("Cannot submit: Link is invalid.");
      return;
    }

    setIsLoading(true);

    try {
      // Send the token, email, and new password to the backend
      const response = await api.post("/auth/reset-password", {
        token, // The secure token from the URL
        email, // The user's email from the URL
        newPassword,
      });

      if (response.status === 200) {
        setSuccessMessage(
          "Password successfully reset! Redirecting to login..."
        );
        setTimeout(() => navigate("/auth"), 3000);
      }
    } catch (err: any) {
      // Handle expired token or other server-side errors
      const serverError =
        err.response?.data?.message ||
        "Failed to reset password. The link may have expired.";
      setError(serverError);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout variant="light">
      <div className="space-y-4 mb-10 md:mb-16">
        <div className="text-sm text-gray-500">
          Home/Authentication/ResetPassword
        </div>
        <BackButton to="/auth" label="Back to Authentication" variant="light" />
      </div>

      <div className="flex justify-center w-full">
        <form
          onSubmit={handlePasswordReset}
          className="rounded-3xl shadow-2xl p-8 sm:p-12 space-y-8 flex flex-col items-center border-2 border-purple-300 border-opacity-30 bg-white bg-opacity-80 backdrop-blur-lg relative"
          style={{ maxWidth: "500px", width: "100%" }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-indigo-50 opacity-50 rounded-3xl"></div>

          {/* Header */}
          <div className="flex items-center gap-4 mb-6 relative z-10">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full flex items-center justify-center shadow-2xl">
              <FaLock className="text-white text-3xl" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-purple-900 drop-shadow-sm">
                Reset Password
              </h3>
              <p className="text-sm text-purple-600 opacity-80">
                Enter your new password below.
              </p>
            </div>
          </div>

          {/* Error/Success Messages */}
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

          {/* Password Inputs */}
          <div className="space-y-6 w-full relative z-10">
            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-600" />
              <input
                type="password"
                placeholder="New Password (min 8 chars)"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-600 text-gray-700 bg-white shadow-md"
              />
            </div>
            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-600" />
              <input
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-600 text-gray-700 bg-white shadow-md"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || !token || !email}
            className={`w-2/3 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all duration-500 shadow-2xl hover:shadow-purple-500/50 text-lg relative z-10 transform ${
              isLoading || !token || !email
                ? "opacity-70 cursor-not-allowed scale-100"
                : "hover:scale-110 hover:-translate-y-1"
            }`}
          >
            <span className="flex items-center justify-center gap-2">
              {isLoading ? <FaSpinner className="animate-spin" /> : <FaKey />}
              {isLoading ? "Resetting..." : "Reset Password"}
            </span>
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default AuthResetPasswordForm;
