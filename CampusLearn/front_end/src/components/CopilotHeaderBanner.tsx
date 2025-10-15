// src/components/CopilotHeaderBanner.tsx

import React from 'react';

// Placeholder Icons
const BrainCircuitIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a3 3 0 0 0-3 3v2a3 3 0 0 0-3 3v2a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3v-2a3 3 0 0 0-3-3V5a3 3 0 0 0-3-3z"/>
        <path d="M7 16l-3 3v3h3l3-3"/>
        <path d="M17 16l3 3v3h-3l-3-3"/>
    </svg>
);
const MicrosofLogoIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="9" height="9" fill="currentColor" stroke="none"/>
        <rect x="13" y="2" width="9" height="9" fill="currentColor" stroke="none"/>
        <rect x="2" y="13" width="9" height="9" fill="currentColor" stroke="none"/>
        <rect x="13" y="13" width="9" height="9" fill="currentColor" stroke="none"/>
    </svg>
);

const CopilotHeaderBanner: React.FC = () => {
  return (
    <div 
      className="
        flex flex-col justify-center items-center p-4 my-6 
        rounded-2xl shadow-xl overflow-hidden
        bg-gradient-to-r from-[#8A2BE2] to-[#FF00FF] /* Purple to Pink Gradient */
        text-white font-extrabold text-2xl uppercase tracking-wider
        border-2 border-white border-opacity-30
      "
    >
      <div className="flex items-center space-x-4 mb-2">
        <MicrosofLogoIcon className="w-6 h-6 text-white z-10"/>
        <span className="z-10 drop-shadow-lg text-xl">MICROSOFT COPILOT</span>
        <BrainCircuitIcon className="w-10 h-10 text-white z-10" />
      </div>
      <p className="text-sm font-medium tracking-normal">Your Everyday AI Assistant.</p>
    </div>
  );
};

export default CopilotHeaderBanner;