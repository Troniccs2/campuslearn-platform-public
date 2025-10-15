// src/components/DragDropBanner.tsx

import React from 'react';

// Placeholder Icons
const UploadFolderIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2v10z"/><polyline points="12 17 12 11 9 14"/></svg>
);
const CloudDownloadIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 17v-8"/><path d="M5 12h14"/><path d="M16 19H8a4 4 0 0 1 0-8h.5"/><path d="M8 12l4 4 4-4"/></svg>
);


const DragDropBanner: React.FC = () => {
  // In a real app, this would use hooks like `useDropzone`
  return (
    <div 
      className="
        relative flex items-center justify-between p-6 my-6 
        rounded-2xl shadow-2xl overflow-hidden
        bg-gradient-to-r from-[#8A2BE2] to-[#FF00FF] /* Purple to Pink Gradient */
        text-white font-extrabold text-lg uppercase tracking-wider
        cursor-pointer transition-transform duration-300 hover:scale-[1.02]
        border-2 border-white border-opacity-30
      "
    >
      <div className="flex items-center space-x-4">
        <UploadFolderIcon className="w-10 h-10 text-white z-10" />
        <span className="z-10 drop-shadow-lg">DRAG AND DROP LEARNING MATERIALS HERE</span>
      </div>
      <CloudDownloadIcon className="w-8 h-8 text-white z-10"/>
    </div>
  );
};

export default DragDropBanner;