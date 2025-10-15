// src/components/ForumCategoriesBanner.tsx

import React from 'react';

// Placeholder Icons
const ListChatIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        <line x1="12" y1="8" x2="12" y2="12"/>
        <line x1="8" y1="8" x2="8" y2="8"/>
        <line x1="16" y1="8" x2="16" y2="8"/>
    </svg>
);
const SearchFolderIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2v10z"/>
        <circle cx="11.5" cy="11.5" r="4.5"/>
        <path d="M15 15l2 2"/>
    </svg>
);


const ForumCategoriesBanner: React.FC = () => {
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
        <ListChatIcon className="w-10 h-10 text-white z-10" />
        <span className="z-10 drop-shadow-lg">FORUM CATEGORIES</span>
      </div>
      <SearchFolderIcon className="w-8 h-8 text-white z-10"/>
    </div>
  );
};

export default ForumCategoriesBanner;