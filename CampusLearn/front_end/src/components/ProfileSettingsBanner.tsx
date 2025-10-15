// src/components/ProfileSettingsBanner.tsx

import React from 'react';

// Placeholder Icons
const UserGearIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/><path d="M17 21h-2l1-4.5h2l1 4.5z"/>
    </svg>
);
const LockShieldIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M16 11l-4 4-2-2"/>
    </svg>
);

const ProfileSettingsBanner: React.FC = () => {
  return (
    <div 
      className="
        flex justify-between items-center p-4 my-6 
        rounded-2xl shadow-xl overflow-hidden
        bg-gradient-to-r from-[#8A2BE2] to-[#FF00FF] /* Purple to Pink Gradient */
        text-white font-extrabold text-2xl uppercase tracking-wider
        border-2 border-white border-opacity-30
      "
    >
      <div className="flex items-center space-x-3">
        <UserGearIcon className="w-10 h-10 text-white z-10" />
        <span className="z-10 drop-shadow-lg">PROFILE / DETAILS</span>
      </div>
      <LockShieldIcon className="w-8 h-8 text-white z-10"/>
    </div>
  );
};

export default ProfileSettingsBanner;