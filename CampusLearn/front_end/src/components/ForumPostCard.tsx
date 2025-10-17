import React, { useState } from "react";

// Placeholder Icon for the Campus Learn logo
const CampusLearnIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M8 12l4-4 4 4" />
  </svg>
);

interface ForumPostCardProps {
  author: string;
  content: string;
  updatedAt: string;
  isReplyBox?: boolean; // For the special "Post Reply" box at the end
  // 🚀 NEW PROP: Function to call when the user clicks Post Reply
  onPostSubmit?: (content: string) => void;
}

const ForumPostCard: React.FC<ForumPostCardProps> = ({
  author,
  content,
  updatedAt,
  isReplyBox = false,
  onPostSubmit,
}) => {
  // 🚀 STATE FOR INPUT: Manages the content of the new reply
  const [replyContent, setReplyContent] = useState("");

  // 🚀 NEW FUNCTION: Handles the click and submits the content
  const handleSubmit = () => {
    const trimmedContent = replyContent.trim();
    if (trimmedContent && onPostSubmit) {
      onPostSubmit(trimmedContent);
      setReplyContent(""); // Clear the textarea on successful submission attempt
    }
  };

  if (isReplyBox) {
    // --- REPLY BOX IMPLEMENTATION ---
    return (
      <div
        className="
                    flex flex-col p-4 rounded-xl shadow-lg 
                    bg-purple-700 bg-opacity-30 text-white 
                    border border-purple-500 border-opacity-30
                    backdrop-blur-sm mt-4 space-y-3
                "
      >
        <div className="flex items-center">
          <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex-shrink-0 mr-3">
            <CampusLearnIcon className="w-full h-full p-1" />
          </div>
          {/* Placeholder for the logged-in user's name */}
          <p className="text-base font-semibold">
            Your Reply (as AuthenticatedUser)
          </p>
        </div>

        {/* 🚀 TEXTAREA: Replaces the static text */}
        <textarea
          className="
                        w-full p-3 rounded-lg bg-gray-900 bg-opacity-50 text-white 
                        border border-gray-700 focus:border-[#FF00FF] focus:outline-none 
                        resize-none min-h-[80px]
                    "
          placeholder="Type your reply here..."
          value={replyContent}
          onChange={(e) => setReplyContent(e.target.value)}
        />

        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            // Disable button if content is empty
            disabled={replyContent.trim().length === 0}
            className={`
                            flex items-center px-4 py-2 rounded-lg 
                            bg-gradient-to-r from-[#FF00FF] to-[#8A2BE2] /* Pink to Purple */
                            font-semibold text-sm transition-opacity shadow-md
                            ${
                              replyContent.trim().length === 0
                                ? "opacity-50 cursor-not-allowed"
                                : "hover:opacity-90"
                            }
                        `}
          >
            <span className="mr-1">POST REPLY</span>
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 19v-7h7" />
              <path d="M12 12l6.5-6.5L12 12zM5 19l7-7-7-7" />
            </svg>
          </button>
        </div>
      </div>
    );
  }

  // --- REGULAR POST IMPLEMENTATION (Unchanged) ---
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
