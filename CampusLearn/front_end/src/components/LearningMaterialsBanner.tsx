// src/components/LearningMaterialsBanner.tsx

import React from 'react';

// Placeholder Icons
const BookLightbulbIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V5H6.5A2.5 2.5 0 0 0 4 7.5v12z"/>
        <path d="M12 8l.5-1.5 3 3 1.5-1.5"/>
        <path d="M10 12l2-4 2 4z"/>
    </svg>
);
const RefreshFolderIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2v10z"/>
        <path d="M14 10l-2 2-2-2"/>
        <path d="M12 14v-4"/>
    </svg>
);


const LearningMaterialsBanner: React.FC = () => {
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
        <BookLightbulbIcon className="w-10 h-10 text-white z-10" />
        <span className="z-10 drop-shadow-lg">BROWSE LEARNING MATERIALS</span>
      </div>
      <RefreshFolderIcon className="w-8 h-8 text-white z-10"/>
    </div>
  );
};

export default LearningMaterialsBanner;