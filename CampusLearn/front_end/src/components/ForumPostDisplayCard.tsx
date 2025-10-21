import React from "react";
// Assumes the same ThreadPost interface from ForumThreadViewPage.tsx
interface ThreadPost {
  id: number;
  authorName: string;
  content: string;
  postedDate: string;
}

const ForumPostDisplayCard: React.FC<{ post: ThreadPost }> = ({ post }) => {
  return (
    <div
      className="p-4 bg-gray-800 bg-opacity-70 rounded-xl shadow-lg border border-gray-700 transition-shadow duration-300 hover:shadow-purple-500/50"
      key={post.id}
    >
           {" "}
      <div className="flex justify-between items-start mb-2 border-b border-gray-600 pb-2">
               {" "}
        <div>
                   {" "}
          <span className="font-semibold text-purple-300 text-lg">
            {post.authorName}
          </span>
                 {" "}
        </div>
               {" "}
        <span className="text-xs text-gray-400 mt-1">
                    {new Date(post.postedDate).toLocaleString()}       {" "}
        </span>
             {" "}
      </div>
           {" "}
      <p className="text-gray-200 whitespace-pre-wrap leading-relaxed pt-2">
                {post.content}     {" "}
      </p>
         {" "}
    </div>
  );
};

export default ForumPostDisplayCard;
