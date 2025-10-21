import React, { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { FaPlusCircle, FaRegCommentDots, FaUser } from "react-icons/fa";
import Header from "../components/Header";
import Footer from "../components/Footer";
import api from "../services/api";

// Interface for a single Thread object returned from the backend
interface ForumThreadHeader {
  id: number;
  title: string;
  // ✅ FIX 1: CHANGE to threadSlug to match the DTO @JsonProperty
  threadSlug: string;
  authorName: string;
  replyCount: number;
  lastUpdated: string;
  categorySlug: string;
}

// Interface for the Forum Category details
interface ForumCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
}

const ForumThreadListPage: React.FC = () => {
  const { slug: categorySlug } = useParams<{ slug: string }>();

  const [category, setCategory] = useState<ForumCategory | null>(null);
  const [threads, setThreads] = useState<ForumThreadHeader[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchThreadsData = useCallback(async () => {
    if (!categorySlug) {
      setError("Category not specified in URL.");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const categoryResponse = await api.get<ForumCategory>(
        `/forums/${categorySlug}`
      );
      setCategory(categoryResponse.data);

      const threadsResponse = await api.get<ForumThreadHeader[]>(
        `/forums/${categorySlug}/threads`
      );

      const transformedThreads = threadsResponse.data.map((thread) => ({
        ...thread,
        categorySlug: thread.categorySlug || categorySlug,
      }));
      setThreads(transformedThreads);
    } catch (err) {
      console.error("Failed to fetch thread list:", err);
      setError(
        "Could not load forum threads. Ensure the backend is running and the API endpoint is correct."
      );
    } finally {
      setIsLoading(false);
    }
  }, [categorySlug]);

  useEffect(() => {
    fetchThreadsData();
  }, [fetchThreadsData]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center">
        Loading threads...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-red-400 p-8 font-semibold">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      <Header />
      <main className="max-w-4xl mx-auto py-4 px-4 space-y-8 relative z-10">
        {/* Category Header */}
        <div className="flex items-center justify-between border-b border-purple-700 pb-4">
          <h1 className="text-4xl font-extrabold text-white drop-shadow-lg">
            {category?.name || "Forum Category"}
          </h1>
          <Link
            to={`/forums/create-thread?category=${categorySlug}`}
            className="flex items-center gap-2 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors shadow-lg font-medium"
          >
            <FaPlusCircle className="w-4 h-4" />
            New Thread
          </Link>
        </div>

        <p className="text-gray-300 italic">
          {category?.description || "A place for community discussion."}
        </p>

        {/* Thread List Section */}
        <section className="space-y-3 pt-4">
          {threads.length > 0 ? (
            threads.map((thread) => (
              <div
                key={thread.id}
                className="
                  flex justify-between items-center p-4 rounded-xl shadow-lg 
                  bg-purple-900 bg-opacity-30 hover:bg-opacity-40 transition-colors 
                  border-l-4 border-pink-500
                "
              >
                {/* Thread Title and Link (CRITICAL FIX APPLIED HERE) */}
                <div className="flex-1 min-w-0">
                  <Link
                    // ✅ FIX 2: Use thread.threadSlug to construct the URL
                    to={`/forums/${categorySlug}/${thread.threadSlug}`}
                    className="text-xl font-bold text-white hover:text-pink-400 transition-colors truncate block"
                  >
                    {thread.title}
                  </Link>
                  <p className="text-sm text-gray-400 flex items-center gap-2 mt-1">
                    <FaUser className="w-3 h-3" />
                    <span className="font-medium">
                      Started by: {thread.authorName}
                    </span>
                  </p>
                </div>

                {/* Thread Stats */}
                <div className="flex-shrink-0 text-right space-y-1 ml-4">
                  <p className="text-sm text-gray-300 flex items-center justify-end gap-1">
                    <FaRegCommentDots className="w-3 h-3 text-pink-400" />
                    {thread.replyCount} Replies
                  </p>
                  <p className="text-xs italic text-gray-400">
                    Last activity: {thread.lastUpdated}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center p-12 bg-purple-900 bg-opacity-30 rounded-xl">
              <p className="text-gray-300 font-medium text-lg">
                No threads found in this category yet. Be the first to start a
                conversation!
              </p>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ForumThreadListPage;
