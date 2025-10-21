import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

// Interface for the simplified Reply Box
interface ForumPostCardProps {
  // This is the ONLY prop required by the parent component
  onSubmit: (content: string) => Promise<void>;
}

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

const ForumPostCard: React.FC<ForumPostCardProps> = ({ onSubmit }) => {
  const [content, setContent] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const trimmedContent = content.trim();

    if (trimmedContent === "") {
      setError("Reply cannot be empty.");
      return;
    }

    setIsPosting(true);
    try {
      await onSubmit(trimmedContent);
      setContent("");
    } catch (err) {
      setError("Failed to post reply. Please check your connection.");
      console.error("Error submitting post:", err);
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div
      className="
        flex flex-col p-4 rounded-xl shadow-lg 
        bg-purple-700 bg-opacity-30 text-white 
        border border-purple-500 border-opacity-30
        backdrop-blur-sm mt-4 space-y-3
      "
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex-shrink-0 mr-3">
            <CampusLearnIcon className="w-full h-full p-1" />
          </div>

          <p className="text-base font-semibold">Post a Reply</p>
        </div>

        <textarea
          className="
            w-full p-3 rounded-lg bg-gray-900 bg-opacity-50 text-white 
            border border-gray-700 focus:border-[#FF00FF] focus:outline-none 
            resize-none min-h-[80px]
          "
          placeholder="Type your reply here..."
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            setError(null);
          }}
          disabled={isPosting}
        />
        {error && <p className="text-red-400 text-sm font-medium">{error}</p>}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={content.trim().length === 0 || isPosting}
            className={`
              flex items-center px-4 py-2 rounded-lg 
              bg-gradient-to-r from-[#FF00FF] to-[#8A2BE2] /* Pink to Purple */
              font-semibold text-sm transition-opacity shadow-md
              ${
                content.trim().length === 0 || isPosting
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:opacity-90"
              }
            `}
          >
            <span className="mr-1">
              {isPosting ? "Posting..." : "POST REPLY"}
            </span>

            <FaPaperPlane className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForumPostCard;
