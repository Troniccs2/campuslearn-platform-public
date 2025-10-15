// src/components/ThreadHeaderBanner.tsx

import React from 'react';

// Placeholder Icons (Book and Shield from prototype)
const BookShieldIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V5H6.5A2.5 2.5 0 0 0 4 7.5v12z"/>
        <path d="M12 8l2 4 4-2-4-2z"/>
        <path d="M12 16l-2-4-4 2 4 2z"/>
    </svg>
);
const GearCheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20V4l6 8-6 8z"/>
        <path d="M18 10l-4-4-4 4"/>
        <path d="M8 12l-4 4 4 4"/>
        <circle cx="12" cy="12" r="3"/>
    </svg>
);

interface ThreadHeaderBannerProps {
  title: string;
}

const ThreadHeaderBanner: React.FC<ThreadHeaderBannerProps> = ({ title }) => {
  return (
    <div 
      className="
        flex justify-between items-center p-4 my-6 
        rounded-2xl shadow-xl overflow-hidden
        bg-gradient-to-r from-[#4B0082] to-[#FF00FF] /* Dark Purple to Pink Gradient, matching prototype */
        text-white font-extrabold text-2xl uppercase tracking-wider
        border-2 border-white border-opacity-30
      "
    >
      <div className="flex items-center space-x-3">
        <BookShieldIcon className="w-10 h-10 text-white z-10" />
        <span className="z-10 drop-shadow-lg">{title}</span>
      </div>
      <GearCheckIcon className="w-8 h-8 text-white z-10"/>
    </div>
  );
};

export default ThreadHeaderBanner;