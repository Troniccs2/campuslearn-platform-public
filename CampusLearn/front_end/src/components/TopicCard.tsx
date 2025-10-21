// src/components/TopicCard.tsx

import React from "react";
import { Link } from "react-router-dom"; // 🚀 FIX: Import Link
import { FaGraduationCap } from "react-icons/fa";

interface TopicCardProps {
  topicName: string;
  author: string;
  lastUpdated: string; // The navigation path
  href: string; // target is generally ignored by Link, but we keep it for now if you revert to <a>
  target?: string;
}

const TopicCard: React.FC<TopicCardProps> = ({
  topicName,
  author,
  lastUpdated,
  href,
  target,
}) => {
  return (
    <Link // 🚀 FIX: Change <a> tag to <Link> component
      to={href} // 🚀 FIX: Use 'to' prop for Link (instead of 'href')
      target={target}
      className="
        flex items-center p-4 rounded-xl shadow-md mb-4
        bg-purple-700 bg-opacity-30 border border-purple-500 border-opacity-30
        text-white cursor-pointer transition-transform duration-300 hover:scale-[1.02]
        backdrop-blur-sm
      "
    >
                  {/* Campus Learn icon */}     {" "}
      <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex-shrink-0 flex items-center justify-center mr-4">
                        <FaGraduationCap className="text-white text-lg" />     {" "}
      </div>
                       {" "}
      <div>
                        <h3 className="text-xl font-semibold">{topicName}</h3> 
             {" "}
        <p className="text-sm opacity-80">
                              By [{author}, Last updated: {lastUpdated}]        {" "}
        </p>
                           {" "}
      </div>
                   {" "}
    </Link>
  );
};

export default TopicCard;
