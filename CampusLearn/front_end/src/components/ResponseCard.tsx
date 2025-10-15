// src/components/ResponseCard.tsx

import React from 'react';
// Placeholder for the Responses banner icon
const MessageIcon = (props: React.SVGProps<SVGSVGElement>) => (<svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>);

interface ResponseCardProps {
  name: string;
  studentId: string;
  date: string;
  content: string;
  isFirst?: boolean; // To conditionally show the "RESPONSES" banner
}

const ResponseCard: React.FC<ResponseCardProps> = ({ name, studentId, date, content, isFirst = false }) => {
  return (
    <div className="mb-6">
      {isFirst && (
        <div 
          className="
            flex items-center justify-center p-3 mb-4 
            rounded-2xl shadow-xl 
            bg-gradient-to-r from-[#8A2BE2] to-[#6A5ACD] text-white
          "
        >
          <MessageIcon className="w-8 h-8 mr-3" />
          <h2 className="text-2xl font-bold uppercase tracking-wider">RESPONSES</h2>
        </div>
      )}
      
      <div 
        className="
          flex p-4 rounded-xl shadow-lg 
          bg-purple-700 bg-opacity-30 text-white 
          border border-purple-500 border-opacity-30
          backdrop-blur-sm
        "
      >
        {/* Profile Icon Placeholder */}
        <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex-shrink-0 mr-4">
          {/* Icon for user profile */}
        </div>
        
        <div className="flex-1">
          <p className="text-sm font-semibold">
            {name} (Student ID: {studentId})
          </p>
          <p className="text-xs italic opacity-70 mb-2">
            [Last updated: {date}]
          </p>
          <p className="text-base leading-snug">{content}</p>
        </div>
      </div>
    </div>
  );
};

export default ResponseCard;