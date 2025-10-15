// src/components/CreateNewTopicBanner.tsx

import React from 'react';

// You might use an actual icon here (e.g., FaPlusCircle from react-icons)
const PlusCircleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>
    </svg>
);


interface CreateNewTopicBannerProps {
  href: string; // The link for creating a new topic
}

const CreateNewTopicBanner: React.FC<CreateNewTopicBannerProps> = ({ href }) => {
  return (
    <a 
      href={href}
      className="
        relative flex items-center justify-center p-4 my-6 
        rounded-2xl shadow-2xl overflow-hidden
        bg-gradient-to-r from-[#FF00FF] to-[#8A2BE2]  /* Pink to Purple Gradient */
        text-white font-extrabold text-2xl uppercase tracking-wider
        cursor-pointer transition-transform duration-300 hover:scale-[1.02]
        border-2 border-white border-opacity-30
      "
    >
      {/* Subtle background pattern/texture to match prototype */}
      <div className="absolute inset-0 bg-pattern-dots opacity-10"></div>
      
      <PlusCircleIcon className="w-8 h-8 mr-3 text-white z-10" />
      <span className="z-10 drop-shadow-lg">CREATE NEW TOPIC</span>
    </a>
  );
};

export default CreateNewTopicBanner;