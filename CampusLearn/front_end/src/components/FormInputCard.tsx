// src/components/FormInputCard.tsx

import React from 'react';
import { FaLightbulb, FaCheckCircle } from 'react-icons/fa';

interface FormInputCardProps {
  title: string;
  children: React.ReactNode;
}

const FormInputCard: React.FC<FormInputCardProps> = ({ title, children }) => {
  return (
    <div className="rounded-2xl shadow-xl overflow-hidden mb-8 bg-purple-700 bg-opacity-30 border border-purple-500 border-opacity-30 backdrop-blur-md">
      {/* Header Banner (Consistent Topic Details Style) */}
      <div 
        className="
          flex justify-between items-center p-4 
          bg-gradient-to-r from-[#4B0082] to-[#8A2BE2] text-white 
          border-b border-white border-opacity-20
        "
      >
        <div className="flex items-center space-x-3">
          <FaLightbulb className="w-8 h-8"/>
          <h2 className="text-2xl font-bold uppercase tracking-wider">{title}</h2>
        </div>
        <FaCheckCircle className="w-6 h-6"/>
      </div>

      {/* Content/Input Area */}
      <div className="p-6 space-y-4">
        {children}
      </div>
    </div>
  );
};

export default FormInputCard;