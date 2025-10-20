// src/components/ActionBanner.tsx

import React from "react";
import { useNavigate } from "react-router-dom";

interface ActionBannerProps {
  title: string;
  href: string;
  className?: string;
  gradient: string; // e.g., 'from-pink-500 to-red-500'
  Icon: React.ElementType;
  // The onClick handler is designed to take the MouseEvent from the button click
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const ActionBanner: React.FC<ActionBannerProps> = ({
  title,
  href,
  gradient,
  Icon,
  className,
  onClick,
}) => {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // 1. If an explicit onClick handler is provided, we assume it manages submission
    //    (i.e., it came from a component's form submission logic).
    if (onClick) {
      // We call the external handler. If the external handler doesn't call
      // preventDefault (e.g., if it's used inside a <form>), the form will submit.
      // Note: We don't call e.preventDefault() here by default if type="submit",
      // to allow the parent <form onSubmit> to fire naturally.
      onClick(e);
      return;
    }

    // 2. If no onClick is provided, this component handles navigation.
    //    We prevent the default button action, which might be "submit" if the
    //    button is inside a form without a type specified.
    e.preventDefault();
    navigate(href);
  };

  // The component uses a <button> which is crucial for form submission
  return (
    <button
      onClick={handleClick}
      // 🚨 Key Fix: Setting type="submit" guarantees the parent form's onSubmit
      //    handler is called when onClick is present (implying form context).
      //    Otherwise, it's a standard button.
      type={onClick ? "submit" : "button"}
      disabled={!onClick && href === "#"} // Optional: Disable if it's a dummy navigation link
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
