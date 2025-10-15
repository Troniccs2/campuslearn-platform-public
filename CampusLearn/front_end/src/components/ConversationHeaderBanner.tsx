// src/components/ConversationHeaderBanner.tsx

import React from 'react';

// Placeholder Icons
const GraduationCapIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v7a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h8"/><path d="M16 3l6 6-6 6"/><path d="M16 3v6h6"/></svg>
);
const ChatCheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M9 12l2 2 4-4"/></svg>
);

interface ConversationHeaderBannerProps {
  name: string;
  role: string;
}

const ConversationHeaderBanner: React.FC<ConversationHeaderBannerProps> = ({ name, role }) => {
  return (
    <div 
      className="
        flex justify-between items-center p-4 my-6 
        rounded-2xl shadow-xl overflow-hidden
        bg-gradient-to-r from-[#4B0082] to-[#FF00FF] /* Dark Purple to Pink Gradient */
        text-white font-extrabold text-2xl uppercase tracking-wider
        border-2 border-white border-opacity-30
      "
    >
      <div className="flex items-center space-x-3">
        <GraduationCapIcon className="w-10 h-10 text-white z-10" />
        <span className="z-10 drop-shadow-lg">{name} ({role})</span>
      </div>
      <ChatCheckIcon className="w-8 h-8 text-white z-10"/>
    </div>
  );
};

export default ConversationHeaderBanner;