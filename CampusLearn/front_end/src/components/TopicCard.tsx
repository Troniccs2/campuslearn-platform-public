// src/components/TopicCard.tsx

import React from "react";
import { Link } from "react-router-dom";
import { FaGraduationCap } from "react-icons/fa";

interface TopicCardProps {
  topicName: string;
  author?: string | null;
  lastUpdated?: string | null;
  description?: string | null;
  href: string;
  target?: string;
}

const TopicCard: React.FC<TopicCardProps> = ({
  topicName,
  author,
  lastUpdated,
  description,
  href,
  target,
}) => {
  const displayAuthor = author && author.trim().length > 0 ? author : "Community";
  const displayUpdated = lastUpdated && lastUpdated.trim().length > 0 ? lastUpdated : null;

  return (
    <Link
      to={href}
      target={target}
      className="flex w-full items-center gap-4 p-4 rounded-xl shadow-md mb-4 bg-purple-700 bg-opacity-30 border border-purple-500 border-opacity-30 text-white cursor-pointer transition-transform duration-300 hover:scale-[1.02] backdrop-blur-sm"
    >
      <div className="w-12 h-12 bg-white/20 rounded-full flex-shrink-0 flex items-center justify-center">
        <FaGraduationCap className="text-white text-lg" />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-xl font-semibold truncate">{topicName}</h3>
        <p className="text-sm opacity-80">
          By {displayAuthor}
          {displayUpdated ? ` · Last updated: ${displayUpdated}` : ""}
        </p>
        {description && (
          <p className="text-sm text-gray-200 opacity-80 mt-2 line-clamp-2">
            {description}
          </p>
        )}
      </div>
    </Link>
  );
};

export default TopicCard;
