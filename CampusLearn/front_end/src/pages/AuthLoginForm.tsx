import React, { useState, useEffect, useContext, createContext } from "react";

// --- START MOCK DEPENDENCIES for Single File Compilation ---

// 1. Mock useNavigate and react-router-dom (using window.location and state)
const useNavigate = () => {
  // Basic navigation simulation for single-file environment
  return (path: string) => {
    console.log(`Navigating to: ${path}`); // In a real browser environment, you would use window.location.href = path; // Here we just log it and stop the timeout.
  };
};

// 2. Mock Font Awesome Icons (Fa) - using inline SVG representations
const FaSignInAlt = ({ className = "" }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    style={{ width: "1em", height: "1em" }}
  >
       {" "}
    <path
      fill="currentColor"
      d="M416 448h-84c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h84c22.1 0 40-17.9 40-40V148c0-22.1-17.9-40-40-40h-84c-6.6 0-12-5.4-12-12V56c0-6.6 5.4-12 12-12h84c48.6 0 88 39.4 88 88v240c0 48.6-39.4 88-88 88zm-84-332H184c-22.1 0-40 17.9-40 40v32h140V160c0-6.6 5.4-12 12-12h28c6.6 0 12 5.4 12 12v128c0 6.6-5.4 12-12 12h-28c-6.6 0-12-5.4-12-12V240H144v32c0 22.1 17.9 40 40 40h148c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12zM276 256h-28c-6.6 0-12-5.4-12-12v-32c0-6.6 5.4-12 12-12h28c6.6 0 12 5.4 12 12v32c0 6.6-5.4 12-12 12z"
    />
     {" "}
  </svg>
);
const FaArrowLeft = ({ className = "" }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
    style={{ width: "1em", height: "1em" }}
  >
       {" "}
    <path
      fill="currentColor"
      d="M256 448c-8.188 0-16.38-3.125-22.62-9.375L38.63 278.6c-12.5-12.5-12.5-32.75 0-45.25l194.4-194.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L109.3 256l194.4 194.4c12.5 12.5 12.5 32.75 0 45.25C272.4 444.9 264.2 448 256 448z"
    />
     {" "}
  </svg>
);
const FaEnvelope = ({ className = "" }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    style={{ width: "1em", height: "1em" }}
  >
       {" "}
    <path
      fill="currentColor"
      d="M464 64C490.5 64 512 85.49 512 112V400C512 426.5 490.5 448 464 448H48C21.49 448 0 426.5 0 400V112C0 85.49 21.49 64 48 64H464zM403.4 192L256 345.9L108.6 192H403.4zM48 400V112L256 319.1L464 112V400H48z"
    />
     {" "}
  </svg>
);
const FaLock = ({ className = "" }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
    style={{ width: "1em", height: "1em" }}
  >
       {" "}
    <path
      fill="currentColor"
      d="M224 256c-24.41 0-44 19.59-44 44v96c0 24.41 19.59 44 44 44h128c24.41 0 44-19.59 44-44v-96c0-24.41-19.59-44-44-44h-128zm-44-100v-44c0-48.56 39.44-88 88-88h128c48.56 0 88 39.44 88 88v44H180zm232 0v-44c0-48.56-39.44-88-88-88H224c-48.56 0-88 39.44-88 88v44h-28c-24.41 0-44 19.59-44 44v96c0 24.41 19.59 44 44 44h128c24.41 0 44-19.59 44-44v-96c0-24.41-19.59-44-44-44h-28zm24 140c0-13.25-10.75-24-24-24h-128c-13.25 0-24 10.75-24 24v96c0 13.25 10.75 24 24 24h128c13.25 0 24-10.75 24-24v-96z"
    />
     {" "}
  </svg>
);
const FaSpinner = ({ className = "" }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    style={{ width: "1em", height: "1em" }}
  >
       {" "}
    <path
      fill="currentColor"
      d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm335.5-16.5l-33.94-33.94c-12.49-12.49-32.75-12.49-45.24 0s-12.49 32.75 0 45.24l33.94 33.94c12.49 12.49 32.75 12.49 45.24 0s12.49-32.75 0-45.24zM175.5 352.5l-33.94 33.94c-12.49 12.49-32.75 12.49-45.24 0s-12.49-32.75 0-45.24l33.94-33.94c12.49-12.49 32.75-12.49 45.24 0s12.49 32.75 0 45.24zm208-160l33.94-33.94c12.49-12.49 12.49-32.75 0-45.24s-32.75-12.49-45.24 0l-33.94 33.94c-12.49 12.49-12.49 32.75 0 45.24s32.75 12.49 45.24 0zM130.5 130.5l-33.94 33.94c-12.49 12.49-32.75 12.49-45.24 0s-12.49-32.75 0-45.24l33.94-33.94c12.49-12.49 32.75-12.49 45.24 0s12.49 32.75 0 45.24z"
    />
     {" "}
  </svg>
);
const FaTimesCircle = ({ className = "" }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    style={{ width: "1em", height: "1em" }}
  >
       {" "}
    <path
      fill="currentColor"
      d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 464c-11.8 0-23.4-.9-34.9-2.7L256 464zm-144-48c-9.7-7.7-18.7-16.8-26.4-26.4L112 416zm304-48c9.7-7.7 18.7-16.8 26.4-26.4L400 416zm0-304c-9.7 7.7-18.7 16.8-26.4 26.4L400 96zm-304 0c9.7 7.7 18.7 16.8 26.4 26.4L112 96zm269.4 186.6L256 256l117.4-117.4c12.5-12.5 12.5-32.75 0-45.25s-32.75-12.5-45.25 0L256 208.8 138.6 91.43c-12.5-12.5-32.75-12.5-45.25 0s-12.5 32.75 0 45.25L208.8 256l-117.4 117.4c-12.5 12.5-12.5 32.75 0 45.25s32.75 12.5 45.25 0L256 303.2l117.4 117.4c12.5 12.5 32.75 12.5 45.25 0s12.5-32.75 0-45.25z"
    />
     {" "}
  </svg>
);

// 3. Mock User Type and Auth Utilities
type Role = "STUDENT" | "TUTOR" | "ADMIN" | "GUEST";
interface User {
  email: string;
  firstName: string;
  role: Role;
}
const createBasicAuthToken = (email: string, password: string): string => {
  // Simple Base64 encoding mock for Basic Auth
  return btoa(`${email}:${password}`);
};

// 4. Mock Auth Context
interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (userData: User, token: string) => void;
  logout: () => void;
}
// Note: createContext is used without a type argument here to avoid the "Expected 0 type arguments, but got 1" error
// in some compilation environments when using an explicit default value type,
// though the variable is correctly typed (AuthContextType | undefined).
const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const login = (userData: User, authToken: string) => {
    setUser(userData);
    setToken(authToken);
    console.log("MOCK AUTH: User logged in.");
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    console.log("MOCK AUTH: User logged out.");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}   {" "}
    </AuthContext.Provider>
  );
};

const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// 5. Mock API Service (Simulates Axios or Fetch with expected structure)
interface LoginResponse {
  message: string;
  userRole: string;
}

const mockApiPost = async (
  url: string,
  _body: any, // FIX: Renamed 'body' to '_body' to resolve 'declared but its value is never read' TS error
  config: any
): Promise<{ status: number; data: LoginResponse }> => {
  console.log("MOCK API CALL:", url, config); // Simulate network delay

  await new Promise((resolve) => setTimeout(resolve, 800));

  const authHeader = config?.headers?.Authorization || "";
  const base64Credentials = authHeader.split("Basic ")[1];

  if (!base64Credentials) {
    // Mock error structure for 401
    throw {
      response: { status: 401, data: { message: "Authentication required." } },
      message: "Authentication required.",
    };
  }

  try {
    const [email, password] = atob(base64Credentials).split(":"); // Mock User Credential Check

    if (email === "student@test.com" && password === "pass") {
      return {
        status: 200,
        data: {
          message: "Auth Success! Welcome Student.",
          userRole: "student",
        },
      };
    } else if (email === "tutor@test.com" && password === "pass") {
      return {
        status: 200,
        data: { message: "Auth Success! Welcome Tutor.", userRole: "tutor" },
      };
    } else if (email === "admin@test.com" && password === "pass") {
      return {
        status: 200,
        data: { message: "Auth Success! Welcome Admin.", userRole: "admin" },
      };
    } else if (email && password) {
      // Generic failed login
      throw {
        response: {
          status: 401,
          data: { message: "Invalid email or password." },
        },
        message: "Invalid email or password.",
      };
    } else {
      // Missing credentials
      throw {
        response: {
          status: 400,
          data: { message: "Email and password are required." },
        },
        message: "Email and password are required.",
      };
    }
  } catch (e) {
    // Re-throw if it's already a controlled error object
    if ((e as any).response) {
      throw e;
    } // Handle Base64 decode error or other unexpected issues
    throw {
      response: {
        status: 400,
        data: { message: "Invalid token format or server error." },
      },
      message: "Invalid token format or server error.",
    };
  }
};

const api = {
  // Note: The original error was likely on this line if it was defined as api.post<LoginResponse> = async...
  // The fixed definition is a regular async function with a return Promise type.
  post: mockApiPost,
};

// 6. Mock Header and Footer Components
const Header: React.FC = () => (
  <header className="bg-white shadow-md p-4 sticky top-0 z-20">
       {" "}
    <div className="max-w-6xl mx-auto flex justify-between items-center">
           {" "}
      <h1 className="text-2xl font-extrabold text-purple-700">
                Campus Learn MOCK      {" "}
      </h1>
           {" "}
      <div className="text-sm text-gray-500">
                <FaSignInAlt className="inline mr-2 text-indigo-500" />       
        Login      {" "}
      </div>
         {" "}
    </div>
     {" "}
  </header>
);

const Footer: React.FC = () => (
  <footer className="bg-gray-800 text-white p-4 mt-auto">
       {" "}
    <div className="max-w-6xl mx-auto text-center text-sm">
            &copy; 2024 Campus Learn. All rights reserved.    {" "}
    </div>
     {" "}
  </footer>
);

// --- END MOCK DEPENDENCIES ---

const AuthLoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setIsLoading(true); // 1. Create the Basic Auth token immediately.

    const token = createBasicAuthToken(email, password);

    try {
      // 2. Perform the API call using the Basic Auth token in the 'Authorization' header.
      // The body is sent as an empty object ({}), as the credentials are in the header.
      const response = await api.post(
        "/auth/login",
        {},
        {
          // Removed explicit type argument here as api.post is already typed
          headers: {
            Authorization: `Basic ${token}`,
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
        } // 3. Use type assertion (as Role) for type safety

        const userData: User = {
          email: email,
          firstName: email.split("@")[0], // Basic parsing for first name mock
          role: receivedRole.toUpperCase() as Role, // Using Role type alias defined above
        }; // Use the token created earlier

        login(userData, token);

        let redirectPath: string | null = null;
        const normalizedRole = userData.role;

        if (normalizedRole === "STUDENT") {
          redirectPath = "/student-dashboard";
        } else if (normalizedRole === "TUTOR") {
          redirectPath = "/tutor-dashboard";
        } else if (normalizedRole === "ADMIN") {
          redirectPath = "/admin-dashboard";
        }

        if (!redirectPath) {
          throw new Error(
            "Login failed: User role not provided or invalid. Please contact support."
          );
        }

        setSuccessMessage(
          response.data.message || "Login successful! Redirecting..."
        );
        setPassword("");

        setTimeout(() => {
          navigate(redirectPath!);
        }, 1500);
      }
    } catch (err: any) {
      const errorMessage =
        err.message ||
        err.response?.data?.message ||
        "Login failed. Check credentials and ensure the server is running.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthProvider>
                     {" "}
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-indigo-100 flex flex-col relative overflow-hidden font-sans">
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
          <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-pink-200 rounded-full opacity-20"></div>
                                 {" "}
        </div>
                      <Header />             {" "}
        <main className="w-full py-8 px-4 flex-grow">
                                     {" "}
          <div className="max-w-6xl mx-auto w-full">
                                             {" "}
            <div className="space-y-4 mb-10 md:mb-16">
                                                     {" "}
              <div className="text-sm text-gray-500">
                                              Home/Authentication/LoginPortal  
                                       {" "}
              </div>
                                                     {" "}
              <button
                onClick={() => navigate("/auth")}
                className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 font-medium"
              >
                                             {" "}
                <FaArrowLeft className="text-lg" />                             {" "}
                <span>Back to Authentication</span>                         {" "}
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
                    <FaSignInAlt className="text-white text-3xl" />             
                                                           {" "}
                  </div>
                                                                     {" "}
                  <div>
                                                                             {" "}
                    <h3 className="text-3xl font-bold text-purple-900 drop-shadow-sm">
                                                                Login Portal    
                                                       {" "}
                    </h3>
                                                                             {" "}
                    <p className="text-sm text-purple-600 opacity-80">
                                                                Welcome back to
                      Campus Learn                                              
                                   {" "}
                    </p>
                                                                         {" "}
                  </div>
                                                                 {" "}
                </div>
                                {/* --- MOCK LOGIN HINT --- */}               {" "}
                <div className="w-full p-2 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-lg text-xs relative z-10">
                                   {" "}
                  <p className="font-semibold mb-1">
                                        Mock Credentials (Email / Password =
                    pass):                  {" "}
                  </p>
                                   {" "}
                  <ul className="list-disc list-inside space-y-0.5">
                                        <li>**Student:** student@test.com</li> 
                                      <li>**Tutor:** tutor@test.com</li>       
                                <li>**Admin:** admin@test.com</li>             
                       {" "}
                  </ul>
                                 {" "}
                </div>
                                {/* --- END MOCK HINT --- */}                   
                         {" "}
                {error && (
                  <div className="w-full p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center gap-2 relative z-10">
                                                                             {" "}
                    <FaTimesCircle className="flex-shrink-0" />                 {" "}
                                       {" "}
                    <p className="text-sm font-medium">{error}</p>             
                                                           {" "}
                  </div>
                )}
                                                             {" "}
                {successMessage && (
                  <div className="w-full p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center gap-2 relative z-10">
                                                                             {" "}
                    <FaSpinner className="animate-spin flex-shrink-0" />       
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
                                                         {" "}
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
                      <Footer />         {" "}
      </div>
         {" "}
    </AuthProvider>
  );
};

// Default export of the App wrapped in AuthProvider for useAuth()
export default AuthLoginForm;
