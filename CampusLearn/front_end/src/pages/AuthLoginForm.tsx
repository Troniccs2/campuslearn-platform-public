import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaSignInAlt,
  FaArrowLeft,
  FaEnvelope,
  FaLock,
  FaSpinner,
  FaTimesCircle,
} from "react-icons/fa";

// =======================================================
// STUBBED DEPENDENCIES & UTILITIES
// These must be replaced with your actual imports in your project!
// =======================================================

// --- STUBBED TYPES (from ../utils/authUtils) ---
export interface User {
  email: string;
  firstName: string;
  role: "ADMIN" | "TUTOR" | "STUDENT";
}

interface LoginResponse {
  message: string;
  userRole: string; // e.g., "STUDENT", "TUTOR", "ADMIN"
}

// --- STUBBED createBasicAuthToken (from ../utils/authUtils) ---
// Note: This is a placeholder function, ensure your original handles Base64 encoding.
const createBasicAuthToken = (email: string, password: string): string => {
  // In a real app, you must use btoa() for Base64 encoding here.
  // Example: return btoa(`${email}:${password}`);
  // For local testing without btoa, we'll return a basic string:
  return `TEST_BASIC_TOKEN_FOR_${email}`;
};

// --- STUBBED useAuth (from ../context/AuthContext) ---
// This mimics your context hook.
const useAuth = () => {
  // Placeholder for the login function in your AuthContext
  const login = (userData: User, token: string) => {
    console.log(
      `STUB: AuthContext received user: ${userData.email} and token: ${token}. This should trigger state storage.`
    );
    // In your real context, this is where you would save the token to storage
    // and update the global user state.
  };
  return { login };
};

// --- STUBBED API (from ../services/api) ---
// Since the environment can't resolve your axios instance, we'll use a local one.
const API_BASE_URL = "https://campuslearn-backend-final.onrender.com/api";
const api = axios.create({ baseURL: API_BASE_URL });

// --- STUBBED COMPONENTS (from ../components/Header and ../components/Footer) ---
const Header = () => (
  <header className="w-full bg-white shadow-md p-4 sticky top-0 z-50">
    <div className="max-w-6xl mx-auto text-xl font-bold text-purple-700">
      CampusLearn
    </div>
  </header>
);
const Footer = () => (
  <footer className="w-full bg-gray-100 mt-auto p-4 text-center text-sm text-gray-500">
    &copy; {new Date().getFullYear()} Campus Learn. All rights reserved.
  </footer>
);

// =======================================================
// END OF STUBBED DEPENDENCIES
// =======================================================

const AuthLoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // Using the stubbed useAuth above

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setIsLoading(true);

    // Generate the Basic Auth token
    const basicAuthToken = createBasicAuthToken(email, password);

    try {
      // CRITICAL FIX 1: Send the Basic Auth header for Spring Security
      // Body is empty {} since credentials are in the header.
      const response = await api.post<LoginResponse>(
        "/auth/login",
        {},
        {
          headers: {
            Authorization: `Basic ${basicAuthToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const receivedRole = response.data.userRole;

        if (!receivedRole) {
          throw new Error(
            "Login failed: User role not provided by the server."
          );
        }

        // Construct user data
        const userData: User = {
          email: email,
          firstName: "", // Assuming firstName will be populated post-login
          role: receivedRole.toUpperCase() as User["role"],
        };

        // Call context login to store token and user data
        login(userData, basicAuthToken);

        let redirectPath: string | null = null;
        const normalizedRole = userData.role; // Determine redirect path based on role

        if (normalizedRole === "STUDENT") {
          redirectPath = "/student-dashboard";
        } else if (normalizedRole === "TUTOR") {
          redirectPath = "/tutor-dashboard";
        } else if (normalizedRole === "ADMIN") {
          redirectPath = "/admin-dashboard";
        }

        if (!redirectPath) {
          throw new Error(
            "Login failed: Invalid user role detected. Please contact support."
          );
        }

        // CRITICAL FIX 2: Stop loading immediately on success (before timeout)
        setIsLoading(false);
        setSuccessMessage(
          response.data.message || "Login successful! Redirecting..."
        );
        setPassword("");

        // Navigate after a short delay
        setTimeout(() => {
          navigate(redirectPath!);
        }, 1500);
      }
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Login failed. Check credentials and server status.";
      setError(errorMessage);
    } finally {
      // Ensure loading is turned off in all failure paths
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-indigo-100 flex flex-col relative overflow-hidden">
           {" "}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
               {" "}
        <div className="absolute top-20 right-20 w-32 h-32 bg-purple-200 rounded-full opacity-30"></div>
               {" "}
        <div
          className="absolute bottom-40 left-10 w-24 h-24 bg-indigo-200 rounded-full opacity-40 animate-bounce"
          style={{ animationDelay: "2s" }}
        ></div>
             {" "}
      </div>
            <Header />     {" "}
      <main className="w-full py-8 px-4 flex-grow">
               {" "}
        <div className="max-w-6xl mx-auto w-full">
                   {" "}
          <div className="space-y-4 mb-10 md:mb-16">
                       {" "}
            <div className="text-sm text-gray-500">
                            Home/Authentication/LoginPortal            {" "}
            </div>
                       {" "}
            <button
              onClick={() => navigate("/auth")}
              className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 font-medium"
            >
                            <FaArrowLeft className="text-lg" />             {" "}
              <span>Back to Authentication</span>           {" "}
            </button>
                     {" "}
          </div>
                   {" "}
          <div className="flex justify-center w-full">
                       {" "}
            <form
              onSubmit={handleLogin}
              className="rounded-3xl shadow-2xl p-8 sm:p-12 space-y-8 flex flex-col items-center border-2 border-purple-300 border-opacity-30 bg-white bg-opacity-80 backdrop-blur-lg relative"
              style={{
                maxWidth: "500px",
                width: "100%",
              }}
            >
                           {" "}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-indigo-50 opacity-50 rounded-3xl"></div>
                           {" "}
              <div className="flex items-center gap-4 mb-6 relative z-10">
                               {" "}
                <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full flex items-center justify-center shadow-2xl">
                                   {" "}
                  <FaSignInAlt className="text-white text-3xl" />               {" "}
                </div>
                               {" "}
                <div>
                                   {" "}
                  <h3 className="text-3xl font-bold text-purple-900 drop-shadow-sm">
                                        Login Portal                  {" "}
                  </h3>
                                   {" "}
                  <p className="text-sm text-purple-600 opacity-80">
                                        Welcome back to Campus Learn            
                         {" "}
                  </p>
                                 {" "}
                </div>
                             {" "}
              </div>
                           {" "}
              {error && (
                <div className="w-full p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center gap-2 relative z-10">
                                    <FaTimesCircle />                 {" "}
                  <p className="text-sm font-medium">{error}</p>               {" "}
                </div>
              )}
                           {" "}
              {successMessage && (
                <div className="w-full p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center gap-2 relative z-10">
                                    <FaSpinner className="animate-spin" />     
                             {" "}
                  <p className="text-sm font-medium">{successMessage}</p>       
                         {" "}
                </div>
              )}
                           {" "}
              <div className="space-y-6 w-full relative z-10">
                               {" "}
                <div className="relative">
                                   {" "}
                  <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-600" />
                                   {" "}
                  <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent text-gray-700 bg-white shadow-md transition-all duration-300"
                  />
                                 {" "}
                </div>
                               {" "}
                <div className="relative">
                                   {" "}
                  <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-600" />
                                   {" "}
                  <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent text-gray-700 bg-white shadow-md transition-all duration-300"
                  />
                                 {" "}
                </div>
                             {" "}
              </div>
                           {" "}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-2/3 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all duration-500 shadow-2xl hover:shadow-purple-500/50 text-lg relative z-10 transform ${
                  isLoading
                    ? "opacity-70 cursor-not-allowed scale-100"
                    : "hover:scale-110 hover:-translate-y-1"
                }`}
              >
                               {" "}
                <span className="flex items-center justify-center gap-2">
                                   {" "}
                  {isLoading ? (
                    <FaSpinner className="animate-spin" />
                  ) : (
                    <FaSignInAlt />
                  )}
                                    {isLoading ? "Logging In..." : "Login"}     
                           {" "}
                </span>
                             {" "}
              </button>
                         {" "}
            </form>
                     {" "}
          </div>
                 {" "}
        </div>
             {" "}
      </main>
            <Footer />   {" "}
    </div>
  );
};

export default AuthLoginForm;
