import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

interface BackButtonProps {
  to?: string;
  href?: string;
  label?: string;
  variant?: "light" | "dark";
}

const BackButton: React.FC<BackButtonProps> = ({
  to,
  label = "Back",
  variant = "dark",
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  const buttonClass =
    variant === "light"
      ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700"
      : "bg-white bg-opacity-20 backdrop-blur-md text-white hover:bg-opacity-30 border border-white border-opacity-30";

  return (
    <div className="flex justify-start">
      <button
        onClick={handleClick}
        className={`flex items-center gap-3 px-6 py-3 rounded-xl transition-all duration-300 shadow-lg font-medium hover:scale-105 ${buttonClass}`}
      >
        <FaArrowLeft className="text-lg" />
        <span>{label}</span>
      </button>
    </div>
  );
};

export default BackButton;
