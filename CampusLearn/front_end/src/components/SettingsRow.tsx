// src/components/SettingsRow.tsx

import React from 'react';

const ChevronUpIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"/></svg>
);

interface SettingsRowProps {
  label: string;
  status: 'Enabled' | 'Disabled';
  onClick: () => void;
}

const SettingsRow: React.FC<SettingsRowProps> = ({ label, status, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="
        flex justify-between items-center w-full p-3 rounded-lg 
        bg-gray-800 bg-opacity-70 text-white 
        hover:bg-opacity-80 transition-colors cursor-pointer
        border-b border-white border-opacity-10 last:border-b-0
      "
    >
      <span className="text-base font-medium text-left">{label}</span>
      <div className="flex items-center space-x-2 text-sm text-purple-300">
        <span>({status})</span>
        <ChevronUpIcon className="w-4 h-4"/>
      </div>
    </button>
  );
};

export default SettingsRow;