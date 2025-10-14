import React from "react";
import { useNavigate } from "react-router-dom";
import { FaSignInAlt, FaUserPlus, FaKey, FaArrowLeft } from "react-icons/fa";
import Header from "../components/Header";
import Footer from "../components/Footer";

// Enhanced reusable card for Auth options with icons
interface AuthCardProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  onClick: () => void;
  gradient: string;
}

const AuthCard: React.FC<AuthCardProps> = ({
  title,
  subtitle,
  icon,
  onClick,
  gradient,
}) => (
  <div
    onClick={onClick}
    className="cursor-pointer rounded-3xl shadow-2xl overflow-hidden transform hover:scale-[1.03] transition-all duration-500 border-2 border-white border-opacity-20 hover:border-opacity-40 group relative backdrop-blur-sm"
    style={{ backgroundImage: gradient }}
  >
    {/* Glassmorphism overlay */}
    <div className="absolute inset-0 bg-white bg-opacity-10 backdrop-blur-sm"></div>
    {/* Animated border glow */}
    <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-white via-transparent to-white opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
    
    <div className="flex items-center justify-between p-8 sm:p-10 h-44 sm:h-48 relative z-10">
      {/* Left Content (Text) */}
      <div className="flex flex-col text-white w-2/3">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight group-hover:scale-105 transition-transform duration-500 drop-shadow-lg">
          {title}
        </h2>
        <p className="text-base sm:text-lg font-medium opacity-90 leading-tight mt-3 drop-shadow-md">
          {subtitle}
        </p>
        {/* Status indicator */}
        <div className="flex items-center gap-2 mt-4">
          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          <span className="text-sm opacity-80">Available 24/7</span>
        </div>
      </div>

      {/* Right Icon Area */}
      <div className="w-24 h-24 sm:w-32 sm:h-32 bg-white bg-opacity-20 backdrop-blur-md rounded-full flex items-center justify-center flex-shrink-0 shadow-2xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 border border-white border-opacity-30">
        <div className="text-white text-4xl sm:text-5xl drop-shadow-lg">
          {icon}
        </div>
      </div>
    </div>
  </div>
);

const AuthPage: React.FC = () => {
  const navigate = useNavigate();

  // 1. Define the handler functions that call navigate()
  const handleLoginClick = () => navigate("/auth/login");
  const handleRegisterClick = () => navigate("/auth/register");
  const handleForgotClick = () => navigate("/auth/forgot-password");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
        <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
      </div>
      <Header />

      <main className="max-w-4xl mx-auto py-4 px-4 space-y-6">
        {/* Enhanced Back Button with glassmorphism */}
        <div className="flex justify-start relative z-10">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-3 px-8 py-4 bg-white bg-opacity-20 backdrop-blur-md text-white rounded-2xl hover:bg-opacity-30 transition-all duration-500 shadow-2xl hover:shadow-purple-500/25 hover:scale-110 font-medium border border-white border-opacity-30"
          >
            <FaArrowLeft className="text-lg" />
            <span>Back to Home</span>
          </button>
        </div>

        {/* Enhanced Login Card */}
        <AuthCard
          title="LOGIN"
          subtitle="Access your Campus Learn account"
          icon={<FaSignInAlt />}
          onClick={handleLoginClick}
          gradient="linear-gradient(135deg, #6d28d9 0%, #9333ea 100%)"
        />

        {/* Enhanced Registration Card */}
        <AuthCard
          title="REGISTRATION"
          subtitle="Create your Campus Learn account"
          icon={<FaUserPlus />}
          onClick={handleRegisterClick}
          gradient="linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)"
        />

        {/* Enhanced Forgot Password Card */}
        <AuthCard
          title="FORGOT PASSWORD"
          subtitle="Reset your account password"
          icon={<FaKey />}
          onClick={handleForgotClick}
          gradient="linear-gradient(135deg, #8b5cf6 0%, #c084fc 100%)"
        />

        <Footer />
      </main>
    </div>
  );
};

export default AuthPage;
