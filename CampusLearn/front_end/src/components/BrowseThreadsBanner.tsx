// src/components/BrowseThreadsBanner.tsx

import React from 'react';

// Placeholder Icons
const ChatPlusIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        <line x1="12" y1="9" x2="12" y2="15"/>
        <line x1="9" y1="12" x2="15" y2="12"/>
    </svg>
);
const FolderSearchIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2v10z"/>
        <circle cx="11.5" cy="11.5" r="4.5"/>
        <path d="M15 15l2 2"/>
    </svg>
);


const BrowseThreadsBanner: React.FC = () => {
  return (
    <div 
      className="
        flex justify-between items-center p-4 my-6 
        rounded-2xl shadow-xl overflow-hidden
        bg-gradient-to-r from-[#8A2BE2] to-[#FF00FF] /* Purple to Pink Gradient, matching prototype */
        text-white font-extrabold text-2xl uppercase tracking-wider
        border-2 border-white border-opacity-30
      "
    >
      <div className="flex items-center space-x-3">
        <ChatPlusIcon className="w-10 h-10 text-white z-10" />
        <span className="z-10 drop-shadow-lg">BROWSE THREADS</span>
      </div>
      <FolderSearchIcon className="w-8 h-8 text-white z-10"/>
    </div>
  );
};

export default BrowseThreadsBanner;