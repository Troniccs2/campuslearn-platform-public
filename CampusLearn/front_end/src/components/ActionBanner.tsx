// src/components/ActionBanner.tsx

import React from 'react';

interface ActionBannerProps {
  title: string;
  href: string;
  gradient: string; // e.g., 'from-pink-500 to-red-500'
  Icon: React.ElementType;
}

const ActionBanner: React.FC<ActionBannerProps> = ({ title, href, gradient, Icon }) => {
  return (
    <a 
      href={href}
      className={`
        flex items-center justify-center p-4 my-4 
        rounded-2xl shadow-xl 
        bg-gradient-to-r ${gradient} text-white
        font-extrabold text-xl uppercase tracking-wider
        cursor-pointer transition-transform duration-300 hover:scale-[1.02]
        border-2 border-white border-opacity-30
      `}
    >
      <Icon className="w-7 h-7 mr-3 text-white z-10" />
      <span className="z-10 drop-shadow-lg">{title}</span>
    </a>
  );
};

export default ActionBanner;