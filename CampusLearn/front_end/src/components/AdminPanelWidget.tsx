// src/components/AdminPanelWidget.tsx

import React from 'react';

// Assuming you have an Icon component for the Admin Cog/Crown
const AdminIcon = (props: React.SVGProps<SVGSVGElement>) => (
    // Placeholder for a Cog/Gear icon
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 5.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H12a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1.82 1.51 1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
);


const AdminPanelWidget: React.FC = () => {
  return (
    <a 
      href="/admin-panel"
      className="
        w-full p-4 my-6 
        rounded-2xl shadow-xl 
        bg-gradient-to-r from-[#8A2BE2] to-[#4B0082] 
        text-white flex items-center justify-center
        transition-transform duration-300 hover:scale-[1.03]
      "
    >
      <div className="flex items-center space-x-4">
        <h3 className="text-xl md:text-2xl font-bold uppercase tracking-wider">
          ADMIN PANEL
        </h3>
        <AdminIcon className="w-8 h-8 text-white" />
      </div>
    </a>
  );
};

export default AdminPanelWidget;