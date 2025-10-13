import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

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
    //  <-- ONLY CHANGE: Set background to white
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-4xl mx-auto py-10 px-4 space-y-6">
        {/* 1. AUTHENTICATION CARD */}
        <NavCard
          title="AUTHENTICATION PAGE"
          subtitle="SECURE LOGIN PROTECTED ACCESS"
          path="/auth"
          navigate={navigate}
          cardBgColor="#e0e0e0" // Light grey background for the card
          layoutType="AUTH"
          rightImageSrc="/images/AuthCard.PNG"
          rightImageAlt="Secure Login Authentication Graphic"
        />

        {/* 2. ABOUT US & CONTACT US CARD */}
        <NavCard
          title="About Us & Contact Us"
          subtitle="Tutor-Student Relations Management System"
          path="/about"
          navigate={navigate}
          cardBgColor="#9333ea" // Start color of the gradient for the card background
          layoutType="ABOUT"
          leftImageSrc="/images/AboutCard.PNG"
          leftImageAlt="Learning Graphic"
          rightImageSrc="/images/AboutCard2.PNG"
          rightImageAlt="Security Graphic"
        />

        <Footer />
      </main>
    </div>
  );
};

export default HomePage;
