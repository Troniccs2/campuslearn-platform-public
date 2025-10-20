import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUserPlus,
  FaEnvelope,
  FaLock,
  FaSpinner,
  FaTimesCircle,
  FaCheckCircle,
  FaUser, // NEW ICON for name input
  FaGraduationCap, // NEW ICON for role selection
} from "react-icons/fa";
import Header from "../components/Header";
import Footer from "../components/Footer";
// BackButton not used in this form currently
import api from "../services/api";

const AuthRegistrationForm: React.FC = () => {
  const navigate = useNavigate();

  // 🚀 UPDATED State for Form Inputs
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [role, setRole] = useState<"STUDENT" | "TUTOR">("STUDENT"); // 🚀 NEW ROLE STATE

  // State for UI Feedback
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  // Submission Handler
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    // --- 1. Client-Side Validation ---
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    if (!firstName || !lastName) {
      setError("First Name and Last Name are required.");
      return;
    }
    // ----------------------------------

    setIsLoading(true);

    try {
      // 🚀 UPDATED: Send ALL required fields, including the selected role
      const response = await api.post("/auth/register", {
        firstName,
        lastName,
        email,
        password,
        role,
      });

      if (response.status === 200 || response.status === 201) {
        setSuccessMessage("Registration successful! Redirecting to login...");

        // Clear inputs after success
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setRole("STUDENT");

        // Redirect to login page
        setTimeout(() => {
          navigate("/auth/login");
        }, 2000);
      }
    } catch (err: any) {
      // Handle registration failure
      const errorMessage =
        err.response?.data?.message ||
        "Registration failed. This email may already be in use.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-indigo-100 flex flex-col relative overflow-hidden">
      <Header />
      <main className="w-full py-8 px-4 flex-grow">
        <div className="max-w-6xl mx-auto w-full">
          {/* TOP NAVIGATION BLOCK */}
          <div className="space-y-4 mb-10 md:mb-16">
            <div className="text-sm text-gray-500">
              Home/Authentication/RegistrationPortal
            </div>
            {/* Note: Assuming BackButton is a component that wraps the navigation logic */}
            <button
              onClick={() => navigate("/auth")}
              className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 font-medium"
            >
              <FaUserPlus className="text-lg" />
              <span>Back to Authentication</span>
            </button>
          </div>

          {/* FORM CONTAINER */}
          <div className="flex justify-center w-full">
            <form
              onSubmit={handleRegister}
              className="rounded-3xl shadow-2xl p-8 sm:p-12 space-y-8 flex flex-col items-center border-2 border-purple-300 border-opacity-30 bg-white bg-opacity-80 backdrop-blur-lg relative"
              style={{
                maxWidth: "500px",
                width: "100%",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-indigo-50 opacity-50 rounded-3xl"></div>

              <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full flex items-center justify-center shadow-2xl">
                  <FaUserPlus className="text-white text-3xl" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-purple-900 drop-shadow-sm">
                    Registration Portal
                  </h3>
                  <p className="text-sm text-purple-600 opacity-80">
                    Join the Campus Learn community
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
                {/* 🚀 NEW: First Name Input */}
                <div className="relative">
                  <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-600" />
                  <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent text-gray-700 bg-white shadow-md transition-all duration-300"
                  />
                </div>

                {/* 🚀 NEW: Last Name Input */}
                <div className="relative">
                  <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-600" />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent text-gray-700 bg-white shadow-md transition-all duration-300"
                  />
                </div>

                {/* Enhanced Email Input */}
                <div className="relative">
                  <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-600" />
                  <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent text-gray-700 bg-white shadow-md transition-all duration-300"
                  />
                </div>

                {/* Enhanced Password Input */}
                <div className="relative">
                  <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-600" />
                  <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent text-gray-700 bg-white shadow-md transition-all duration-300"
                  />
                </div>

                {/* Added Confirm Password Input */}
                <div className="relative">
                  <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-600" />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent text-gray-700 bg-white shadow-md transition-all duration-300"
                  />
                </div>

                {/* 🚀 NEW: Role Selection */}
                <div className="w-full p-4 border border-purple-300 rounded-xl bg-purple-50/50 shadow-inner">
                  <label className="flex items-center gap-3 text-purple-800 font-semibold mb-3">
                    <FaGraduationCap className="text-xl" />
                    Select Your Role:
                  </label>
                  <div className="flex gap-8 justify-start">
                    {/* Student Radio Button */}
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="role"
                        value="STUDENT"
                        checked={role === "STUDENT"}
                        onChange={() => setRole("STUDENT")}
                        className="form-radio h-4 w-4 text-indigo-600 border-purple-400 focus:ring-indigo-500"
                      />
                      <span className="text-gray-700 font-medium">Student</span>
                    </label>

                    {/* Tutor Radio Button */}
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="role"
                        value="TUTOR"
                        checked={role === "TUTOR"}
                        onChange={() => setRole("TUTOR")}
                        className="form-radio h-4 w-4 text-indigo-600 border-purple-400 focus:ring-indigo-500"
                      />
                      <span className="text-gray-700 font-medium">Tutor</span>
                    </label>
                  </div>
                </div>
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
                    <FaUserPlus />
                  )}
                  {isLoading ? "Registering..." : "Register"}
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

export default AuthRegistrationForm;
