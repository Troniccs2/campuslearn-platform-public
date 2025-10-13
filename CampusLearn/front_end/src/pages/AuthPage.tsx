import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

// Reusable card for Auth options (Login, Register, Forgot)
interface AuthCardProps {
  title: string;
  subtitle: string;
  imageSrc: string; // Path to the image asset
  imageAlt: string;
  onClick: () => void; // <-- The function that handles the navigation
}

const AuthCard: React.FC<AuthCardProps> = ({
  title,
  subtitle,
  imageSrc,
  imageAlt,
  onClick,
}) => (
  <div
    // This is where the click event is handled
    onClick={onClick}
    className="cursor-pointer rounded-xl shadow-xl overflow-hidden transform hover:scale-[1.01] transition duration-300 border-4 border-purple-900"
    style={{ backgroundImage: `linear-gradient(to right, #6d28d9, #9333ea)` }} // Gradient background
  >
    <div className="flex items-center justify-between p-4 sm:p-6 h-36 sm:h-40">
      {/* Left Content (Text) */}
      <div className="flex flex-col text-white w-2/3">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          {title}
        </h2>
        <p className="text-base sm:text-lg font-medium opacity-90 leading-tight">
          {subtitle}
        </p>
      </div>

      {/* Right Image Area */}
      <div className="w-16 h-16 sm:w-24 sm:h-24 bg-white rounded-full flex items-center justify-center flex-shrink-0">
        <img
          src={imageSrc}
          alt={imageAlt}
          className="max-w-full max-h-full object-contain"
        />
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
    // Note: Background color set to dark grey as per your mockups.
    <div className="min-h-screen" style={{ backgroundColor: "#212121" }}>
      <Header />

      <main className="max-w-4xl mx-auto py-4 px-4 space-y-6">
        {/* Back Button */}
        <div className="flex justify-start">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          >
            <span className="text-lg">←</span>
            <span className="font-medium">Home</span>
          </button>
        </div>

        {/* Login Card */}
        <AuthCard
          title="LOGIN"
          subtitle="Campus Learn with Copilot"
          onClick={handleLoginClick} // 2. Pass the handler to the component
          imageSrc="/images/login-graphic.png"
          imageAlt="Login Icon"
        />

        {/* Registration Card */}
        <AuthCard
          title="REGISTRATION"
          subtitle="Campus Learn with Copilot"
          onClick={handleRegisterClick} // 2. Pass the handler to the component
          imageSrc="/images/registration-graphic.png"
          imageAlt="Registration Icon"
        />

        {/* Forgot Password Card */}
        <AuthCard
          title="FORGOT PASSWORD"
          subtitle="Campus Learn"
          onClick={handleForgotClick} // 2. Pass the handler to the component
          imageSrc="/images/forgot-password-graphic.png"
          imageAlt="Forgot Password Icon"
        />

        <Footer />
      </main>
    </div>
  );
};

export default AuthPage;
