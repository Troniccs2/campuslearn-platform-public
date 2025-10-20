// src/components/ActionBanner.tsx

import React from "react";
import { useNavigate } from 'react-router-dom';

interface ActionBannerProps {
  title: string;
  href: string;
  className?: string;
  gradient: string; // e.g., 'from-pink-500 to-red-500'
  Icon: React.ElementType;
}

const ActionBanner: React.FC<ActionBannerProps> = ({
  title,
  href,
  gradient,
  Icon,
}) => {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // Client-side navigation to avoid full page reloads
    navigate(href);
  };

  return (
    <button
      onClick={handleClick}
      className={`
        flex items-center justify-center p-4 my-4 w-full
        rounded-2xl shadow-xl 
        bg-gradient-to-r ${gradient} text-white
        font-extrabold text-xl uppercase tracking-wider
        cursor-pointer transition-transform duration-300 hover:scale-[1.02]
        border-2 border-white border-opacity-30
      `}
    >
      <Icon className="w-7 h-7 mr-3 text-white z-10" />
      <span className="z-10 drop-shadow-lg">{title}</span>
    </button>
  );
};

export default ActionBanner;
