// src/components/MicrosoftCopilotWidget.tsx

import React from 'react';

// Assuming you have an Icon component for Copilot/AI, or will use a placeholder.
// For the real implementation, replace 'div' with your actual icon/image component.
const AIAssistantIcon = (props: React.SVGProps<SVGSVGElement>) => (
    // Placeholder for a detailed AI wing/brain icon
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"/><path d="M8 12l2 2 4-4"/>
        <path d="M16 12s-2 1-4 1-4-1-4-1"/>
    </svg>
);


const MicrosoftCopilotWidget: React.FC = () => {
  return (
    <div 
      className="
        w-full p-4 md:p-6 my-6 
        rounded-2xl shadow-2xl 
        bg-gradient-to-r from-[#6A5ACD] to-[#483D8B] 
        text-white flex items-center justify-between
      "
    >
      <div className="flex flex-col">
        <h3 className="text-xl font-bold uppercase tracking-wide mb-1">
          MICROSOFT COPILOT
        </h3>
        <p className="text-sm font-light">
          Your Everyday AI Assistant.
        </p>
      </div>
      
      {/* Icon/Image container matching the prototype's aesthetic */}
      <div className="relative h-16 w-16 md:h-20 md:w-20">
        <AIAssistantIcon className="w-full h-full text-white" />
        {/* This is where the image (like the wing/brain) would go */}
      </div>
    </div>
  );
};

export default MicrosoftCopilotWidget;