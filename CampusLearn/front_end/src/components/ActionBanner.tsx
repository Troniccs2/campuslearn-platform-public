// src/components/ActionBanner.tsx

import React from "react";
import { useNavigate } from "react-router-dom";

interface ActionBannerProps {
  title: string;
  href: string;
  className?: string;
  gradient: string; // e.g., 'from-pink-500 to-red-500'
  Icon: React.ElementType;
  // 🚨 NEW PROP: Optional handler for external click actions (like form submission)
  onClick?: (e: React.MouseEvent<HTMLButtonElement> | React.FormEvent) => void;
}

const ActionBanner: React.FC<ActionBannerProps> = ({
  title,
  href,
  gradient,
  Icon,
  className, // Destructure className
  onClick, // Destructure new onClick
}) => {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // 1. If an explicit onClick handler is provided (e.g., from the form in CreateTopicPage),
    //    call it and prevent the default navigation action.
    if (onClick) {
      e.preventDefault();
      onClick(e);
      return;
    }

    // 2. If no onClick is provided, proceed with the default navigation behavior.
    e.preventDefault();
    navigate(href);
  };

  return (
    <button
      // 🚨 Use the unified handleClick which correctly manages form submission vs. navigation
      onClick={handleClick}
      type={onClick ? "submit" : "button"} // 🚨 Set type to submit if an onClick (submission) is provided
      className={`
                flex items-center justify-center p-4 my-4 w-full
                rounded-2xl shadow-xl 
                bg-gradient-to-r ${gradient} text-white
                font-extrabold text-xl uppercase tracking-wider
                cursor-pointer transition-transform duration-300 hover:scale-[1.02]
                border-2 border-white border-opacity-30
                ${className || ""} 
            `}
    >
      <Icon className="w-7 h-7 mr-3 text-white z-10" />
      <span className="z-10 drop-shadow-lg">{title}</span>
    </button>
  );
};

export default ActionBanner;
