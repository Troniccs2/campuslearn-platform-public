// src/components/TopicContentCard.tsx

import React from 'react';
// Placeholders for icons
const TopicIcon = (props: React.SVGProps<SVGSVGElement>) => (<svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>);
const UploadCheckIcon = (props: React.SVGProps<SVGSVGElement>) => (<svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>);

interface TopicContentCardProps {
  title: string;
  creator: string;
  date: string;
  content: string;
}

const TopicContentCard: React.FC<TopicContentCardProps> = ({ title, creator, date, content }) => {
  return (
    <div className="rounded-2xl shadow-xl overflow-hidden mb-8 bg-purple-700 bg-opacity-30 border border-purple-500 border-opacity-30 backdrop-blur-md">
      {/* Header Banner */}
      <div 
        className="
          flex justify-between items-center p-4 
          bg-gradient-to-r from-[#4B0082] to-[#8A2BE2] text-white 
          border-b border-white border-opacity-20
        "
      >
        <div className="flex items-center space-x-3">
          <TopicIcon className="w-8 h-8"/>
          <h2 className="text-2xl font-bold uppercase tracking-wider">TOPIC DETAILS</h2>
        </div>
        <UploadCheckIcon className="w-6 h-6"/>
      </div>

      {/* Content Area */}
      <div className="p-6 text-white">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-sm italic opacity-80 mb-4">
          Topic Starter ({creator}), {date}
        </p>
        <p className="text-base leading-relaxed bg-purple-900 bg-opacity-40 p-4 rounded-lg border border-purple-700 border-opacity-50">
          {content}
        </p>
      </div>
    </div>
  );
};

export default TopicContentCard;