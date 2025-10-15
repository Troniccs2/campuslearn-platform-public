// src/components/InboxBanner.tsx

import React from 'react';

// Placeholder Icons
const MessagePlusIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        <line x1="12" y1="9" x2="12" y2="15"/>
        <line x1="9" y1="12" x2="15" y2="12"/>
    </svg>
);
const EnvelopeSyncIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,14 2,6"/>
        <path d="M16 17l-4 4-4-4"/>
        <path d="M12 10v7"/>
    </svg>
);

const InboxBanner: React.FC = () => {
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
        <MessagePlusIcon className="w-10 h-10 text-white z-10" />
        <span className="z-10 drop-shadow-lg">INBOX / CONVERSATIONS</span>
      </div>
      <EnvelopeSyncIcon className="w-8 h-8 text-white z-10"/>
    </div>
  );
};

export default InboxBanner;