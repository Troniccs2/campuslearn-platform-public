// src/components/MicrosoftCopilotWidget.tsx

import React from 'react';
import { FaRobot } from 'react-icons/fa';


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
      
      {/* Icon container */}
      <div className="relative h-16 w-16 md:h-20 md:w-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
        <FaRobot className="w-8 h-8 md:w-10 md:h-10 text-white" />
      </div>
    </div>
  );
};

export default MicrosoftCopilotWidget;