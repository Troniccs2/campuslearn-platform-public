import React from "react";
import { useNavigate } from "react-router-dom";
import { FaLock, FaUsers, FaShieldAlt, FaInfoCircle } from "react-icons/fa";
import Layout from "../components/Layout";

// Refactored NavCardProps to handle the different content types for Auth and About cards
interface NavCardProps {
  title: string;
  subtitle?: string;
  path: string;
  navigate: ReturnType<typeof useNavigate>;

  // Specific background color or gradient for the card container
  cardBgColor: string;

  leftImageSrc?: string; // Used for the graphic on the left (ABOUT)
  leftImageAlt?: string;

  rightImageSrc: string; // Used for the graphic on the right (AUTH and ABOUT)
  rightImageAlt: string;

  layoutType: "AUTH" | "ABOUT";
}

const NavCard: React.FC<NavCardProps> = ({
  title,
  subtitle,
  path,
  navigate,
  cardBgColor,
  leftImageSrc,
  leftImageAlt,
  rightImageSrc,
  rightImageAlt,
  layoutType,
}) => {
  const isAuth = layoutType === "AUTH";

  // Define the purple text color class
  const purpleTextColor = "text-purple-900";

  // Determine the card's background style (color or gradient)
  const cardStyle = {
    background: isAuth
      ? cardBgColor
      : `linear-gradient(to right, ${cardBgColor}, #a855f7)`,
    borderColor: "#6d28d9", // Consistent purple border color
    height: "240px", // Fixed height
  };

  return (
    <div
      onClick={() => navigate(path)}
      className="cursor-pointer rounded-2xl shadow-2xl overflow-hidden transform hover:scale-[1.01] transition duration-300 border-4 relative"
      style={cardStyle}
    >
      <div className="flex items-center justify-between p-6 h-full w-full">
        {/* ----------------- AUTH CARD CONTENT (Light Grey Card, Text Left, Image Right) ----------------- */}
        {isAuth && (
          <>
            {/* Text Content */}
            <div className="flex flex-col w-2/3 md:w-1/2">
              <h2
                className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${purpleTextColor}`}
              >
                {title}
              </h2>
              <p
                className={`text-lg sm:text-xl font-medium mt-2 opacity-90 leading-tight ${purpleTextColor}`}
              >
                {subtitle}
              </p>
            </div>

            {/* Right-side Image */}
            <div className="w-1/3 sm:w-1/3 flex items-center justify-center flex-shrink-0 h-full">
              <img
                src={rightImageSrc}
                alt={rightImageAlt}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </>
        )}

        {/* ----------------- ABOUT CARD CONTENT (Gradient Card, Two Images, Center Text) ----------------- */}
        {!isAuth && (
          <>
            {/* Left Image */}
            <div className="w-1/4 flex-shrink-0 flex items-center justify-center h-full">
              {leftImageSrc && leftImageAlt && (
                <img
                  src={leftImageSrc}
                  alt={leftImageAlt}
                  className="max-w-full max-h-full object-contain"
                />
              )}
            </div>

            {/* Central Text Content */}
            <div className="flex flex-col text-center flex-grow mx-4">
              <h2
                className={`text-3xl sm:text-4xl font-extrabold tracking-tight leading-none text-white`}
              >
                {title}
              </h2>
              <p className={`text-lg font-medium mt-1 opacity-90 text-white`}>
                {subtitle}
              </p>
            </div>

            {/* Right Image */}
            <div className="w-1/4 flex-shrink-0 flex items-center justify-center h-full">
              <img
                src={rightImageSrc}
                alt={rightImageAlt}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Layout variant="light">
        {/* 1. ENHANCED AUTHENTICATION CARD */}
        <div
          onClick={() => navigate("/auth")}
          className="cursor-pointer rounded-3xl shadow-2xl overflow-hidden transform hover:scale-[1.02] transition-all duration-500 border-4 border-purple-900 bg-gradient-to-r from-white via-purple-50 to-indigo-50 group relative"
          style={{ height: "260px" }}
        >
          {/* Animated border glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
          <div className="flex items-center justify-between p-8 h-full w-full relative z-10">
            <div className="flex flex-col w-2/3 md:w-1/2">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-purple-900 group-hover:text-purple-700 transition-colors duration-300">
                AUTHENTICATION PAGE
              </h2>
              <p className="text-lg sm:text-xl font-medium mt-3 opacity-90 leading-tight text-purple-800">
                SECURE LOGIN PROTECTED ACCESS
              </p>
              <div className="flex items-center gap-2 mt-4 text-purple-600">
                <FaShieldAlt className="text-sm" />
                <span className="text-sm font-medium">256-bit Encryption</span>
              </div>
            </div>
            <div className="w-1/3 sm:w-1/3 flex items-center justify-center flex-shrink-0 h-full">
              <div className="w-28 h-28 bg-gradient-to-br from-purple-900 to-indigo-900 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                <FaLock className="text-white text-4xl group-hover:text-purple-200 transition-colors duration-300" />
              </div>
            </div>
          </div>
        </div>

        {/* 2. ENHANCED ABOUT US & CONTACT US CARD */}
        <div
          onClick={() => navigate("/about")}
          className="cursor-pointer rounded-3xl shadow-2xl overflow-hidden transform hover:scale-[1.02] transition-all duration-500 border-4 border-purple-900 group relative"
          style={{ 
            background: "linear-gradient(135deg, #9333ea, #a855f7, #c084fc)",
            height: "260px" 
          }}
        >
          {/* Animated sparkles */}
          <div className="absolute top-4 right-4 w-2 h-2 bg-white rounded-full opacity-60 animate-ping"></div>
          <div className="absolute bottom-6 left-6 w-1 h-1 bg-white rounded-full opacity-80 animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="flex items-center justify-between p-8 h-full w-full relative z-10">
            <div className="w-1/4 flex-shrink-0 flex items-center justify-center h-full">
              <div className="w-24 h-24 bg-white bg-opacity-25 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500">
                <FaUsers className="text-white text-3xl" />
              </div>
            </div>
            <div className="flex flex-col text-center flex-grow mx-4">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-none text-white group-hover:scale-105 transition-transform duration-300">
                About Us & Contact Us
              </h2>
              <p className="text-lg font-medium mt-2 opacity-90 text-white">
                Tutor-Student Relations Management System
              </p>
              <div className="flex justify-center gap-4 mt-3">
                <div className="flex items-center gap-1 text-white text-sm">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>24/7 Support</span>
                </div>
                <div className="flex items-center gap-1 text-white text-sm">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>Expert Team</span>
                </div>
              </div>
            </div>
            <div className="w-1/4 flex-shrink-0 flex items-center justify-center h-full">
              <div className="w-24 h-24 bg-white bg-opacity-25 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                <FaInfoCircle className="text-white text-3xl" />
              </div>
            </div>
          </div>
        </div>

    </Layout>
  );
};

export default HomePage;
