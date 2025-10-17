import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ThreadHeaderBanner from "../components/ThreadHeaderBanner";
import ForumPostCard from "../components/ForumPostCard";

// Assume a function to format the timestamp (you might need to implement this)
const formatTimestamp = (timestamp: string) => {
  // Basic example: convert ISO string to a readable format
  return new Date(timestamp).toLocaleString();
};

// Define the shape of the data returned from your Java/Spring Boot API
interface ForumPost {
  id: number;
  content: string;
  authorName: string;
  postedAt: string; // Use the field name from your ForumPost.java
}

interface ForumThreadView {
  id: number;
  title: string;
  slug: string;
  authorName: string;
  lastUpdated: string;
  forumCategory: {
    id: number;
    slug: string;
    name: string;
    // ... other category fields
  };
  posts: ForumPost[]; // The array of replies/chats
}

// Reusing FaArrowLeft
const FaArrowLeft = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 12H5" />
    <path d="M12 19l-7-7 7-7" />
  </svg>
);

const ForumThreadViewPage: React.FC = () => {
  const navigate = useNavigate();
  const { categoryId, threadId } = useParams<{
    categoryId: string;
    threadId: string;
  }>();

  // State to hold the fetched thread data
  const [threadData, setThreadData] = useState<ForumThreadView | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 🚀 STEP 1: Fetch data from the new API endpoint
  useEffect(() => {
    if (!categoryId || !threadId) {
      setError("Missing Category or Thread ID in URL.");
      setIsLoading(false);
      return;
    }

    const fetchThread = async () => {
      try {
        // The URL now matches your Spring Boot Controller endpoint
        const response = await fetch(
          `http://localhost:8080/api/forums/${categoryId}/${threadId}`
        );

        if (!response.ok) {
          throw new Error("Thread not found or server error.");
        }

        const data: ForumThreadView = await response.json();
        setThreadData(data);
      } catch (err) {
        // Type assertion for error handling
        const message =
          err instanceof Error ? err.message : "Failed to fetch thread data.";
        setError(message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchThread();
  }, [categoryId, threadId]);

  // 🚀 STEP 2: Handle Loading and Error states
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center">
        Loading discussion...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-red-400 p-8">
        Error: {error}
      </div>
    );
  }

  // If threadData is null (e.g., thread not found, but no explicit error message)
  if (!threadData) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center">
        Thread not found.
      </div>
    );
  }

  // Prepare data for the banner and the first post
  const mainThreadPost =
    threadData.posts.length > 0 ? threadData.posts[0] : null;
  const replies = threadData.posts.length > 1 ? threadData.posts.slice(1) : []; // Treat the first post as the main thread post

  // NOTE: This logic assumes the very first post in the array is the original thread starter.
  // If your backend separates the thread header from the posts, adjust this logic.

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* ... Background elements (unchanged) ... */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
        <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
      </div>

      <Header />

      <main className="max-w-4xl mx-auto py-4 px-4 space-y-4 relative z-10">
        {/* "Back to Browse" Link */}
        <div className="flex justify-start mb-6">
          <button
            onClick={() => navigate(`/forums/${threadData.forumCategory.slug}`)} // Use actual category slug
            className="flex items-center gap-3 px-6 py-3 bg-white bg-opacity-20 backdrop-blur-md text-white rounded-xl hover:bg-opacity-30 transition-all duration-300 shadow-lg font-medium border border-white border-opacity-30"
          >
            <FaArrowLeft className="w-4 h-4" />
            <span>&lt; Browse</span>
          </button>
        </div>

        <h1 className="text-4xl font-extrabold text-white mb-8 drop-shadow-lg">
          View
        </h1>

        {/* 🚀 Dynamic Banner Title */}
        <ThreadHeaderBanner title={threadData.title} />

        {/* --- Discussion Posts --- */}
        <div className="bg-purple-900 bg-opacity-40 rounded-3xl p-6 shadow-xl border border-purple-800 border-opacity-50">
          {/* 🚀 Render Main Thread Post (using the first item in the posts array) */}
          {mainThreadPost && (
            <ForumPostCard
              author={mainThreadPost.authorName}
              content={mainThreadPost.content}
              updatedAt={formatTimestamp(mainThreadPost.postedAt)}
            />
          )}

          {/* 🚀 Render Replies (mapping over the rest of the array) */}
          {replies.map((post) => (
            <ForumPostCard
              key={post.id} // Use unique key for list rendering
              author={post.authorName}
              content={post.content}
              updatedAt={formatTimestamp(post.postedAt)}
            />
          ))}

          {/* Reply Box/Action */}
          <ForumPostCard isReplyBox={true} author="" content="" updatedAt="" />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ForumThreadViewPage;
