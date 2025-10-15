// src/components/FormInputCard.tsx

import React from 'react';

// Placeholder Icons
const BulbSettingIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c-3.31 0-6-2.69-6-6 0-2.67 1.76-4.93 4.24-5.66l.76-.2V3h2v7.14l.76.2C18.24 10.07 20 12.33 20 16c0 3.31-2.69 6-6 6z"/><path d="M12 16.5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5z"/></svg>
);
const UploadCheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
);

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
          <BulbSettingIcon className="w-8 h-8"/>
          <h2 className="text-2xl font-bold uppercase tracking-wider">{title}</h2>
        </div>
        <UploadCheckIcon className="w-6 h-6"/>
      </div>

      {/* Content/Input Area */}
      <div className="p-6 space-y-4">
        {children}
      </div>
    </div>
  );
};

export default FormInputCard;