// src/components/ForumPostCard.tsx

import React from 'react';

// Placeholder Icon for the Campus Learn logo
const CampusLearnIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 12l4-4 4 4"/></svg>
);

interface ForumPostCardProps {
  author: string;
  content: string;
  updatedAt: string;
  isReplyBox?: boolean; // For the special "Post Reply" box at the end
}

const ForumPostCard: React.FC<ForumPostCardProps> = ({ author, content, updatedAt, isReplyBox = false }) => {
  
  if (isReplyBox) {
    return (
      <div 
        className="
          flex items-center justify-between p-4 rounded-xl shadow-lg 
          bg-purple-700 bg-opacity-30 text-white 
          border border-purple-500 border-opacity-30
          backdrop-blur-sm mt-4
        "
      >
        <div className="flex items-center">
            <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex-shrink-0 mr-3">
                <CampusLearnIcon className="w-full h-full p-1" />
            </div>
            <p className="text-base italic">But, I've got double classes I can't make it!</p>
        </div>
        
        <button
          className="
            flex items-center px-4 py-2 rounded-lg 
            bg-gradient-to-r from-[#FF00FF] to-[#8A2BE2] /* Pink to Purple */
            font-semibold text-sm transition-opacity hover:opacity-90
          "
        >
          <span className="mr-1">POST REPLY</span>
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19v-7h7"/><path d="M12 12l6.5-6.5L12 12zM5 19l7-7-7-7"/></svg>
        </button>
      </div>
    );
  }

  return (
    <div 
      className="
        flex justify-between items-start p-4 rounded-xl shadow-lg 
        bg-purple-700 bg-opacity-30 text-white 
        border border-purple-500 border-opacity-30
        backdrop-blur-sm mt-4
      "
    >
      <div className="flex-1">
        <p className="text-base font-semibold text-right">{author}</p>
        <p className="text-sm leading-snug">{content}</p>
        <p className="text-xs italic opacity-70 text-right mt-1">
          [Last updated: {updatedAt}]
        </p>
      </div>
      
      {/* User Profile Icon */}
      <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex-shrink-0 ml-4">
        <CampusLearnIcon className="w-full h-full p-1" />
      </div>
    </div>
  );
};

export default ForumPostCard;