// src/components/TopicCard.tsx

import React from 'react';

interface TopicCardProps {
  topicName: string;
  author: string;
  lastUpdated: string;
  // This could be a link to the specific topic page
  href: string; 
}

const TopicCard: React.FC<TopicCardProps> = ({ topicName, author, lastUpdated, href }) => {
  return (
    <a 
      href={href}
      className="
        flex items-center p-4 rounded-xl shadow-md mb-4
        bg-purple-700 bg-opacity-30 border border-purple-500 border-opacity-30
        text-white cursor-pointer transition-transform duration-300 hover:scale-[1.02]
        backdrop-blur-sm
      "
    >
      {/* Placeholder for the Campus Learn logo/icon */}
      <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex-shrink-0 flex items-center justify-center mr-4">
        {/* You can replace this with your actual logo img or SVG */}
        <span className="text-sm font-bold text-white opacity-80">CL</span> 
      </div>
      <div>
        <h3 className="text-xl font-semibold">{topicName}</h3>
        <p className="text-sm opacity-80">
          By [{author}, Last updated: {lastUpdated}]
        </p>
      </div>
    </a>
  );
};

export default TopicCard;