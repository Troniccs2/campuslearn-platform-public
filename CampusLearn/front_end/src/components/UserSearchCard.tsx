// src/components/UserSearchCard.tsx

import React from 'react';
import { Link } from 'react-router-dom';
// Reusing CampusLearnIcon from ForumPostCard
const CampusLearnIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 12l4-4 4 4"/></svg>
);


interface UserSearchCardProps {
  name: string;
  role: string;
  onClick?: () => void;
  to?: string;
}

const UserSearchCard: React.FC<UserSearchCardProps> = ({ name, role, onClick, to }) => {
  const content = (
    <div
      className="
        flex flex-col items-center p-3 rounded-xl 
        bg-purple-700 bg-opacity-30 border border-purple-500 border-opacity-30
        text-white cursor-pointer transition-transform duration-300 hover:scale-[1.05]
        backdrop-blur-sm w-32 shadow-lg
      "
    >
      {/* Icon */}
      <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex-shrink-0 flex items-center justify-center mb-2">
        <CampusLearnIcon className="w-full h-full p-1" />
      </div>

      <h3 className="text-sm font-semibold text-center">{name}</h3>
      <p className="text-xs opacity-70">({role})</p>
    </div>
  );

  if (to) {
    return (
      <Link to={to} onClick={onClick} className="no-underline">
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className="p-0 bg-transparent border-0">
      {content}
    </button>
  );
};

export default UserSearchCard;