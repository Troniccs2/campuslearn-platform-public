// src/pages/ForumThreadListPage.tsx

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TopicCard from "../components/TopicCard";
import BrowseThreadsBanner from "../components/BrowseThreadsBanner";
import api from "../services/api";
import { FaArrowLeft } from "react-icons/fa";
// Reusing FaArrowLeft...

// NEW Interface for the data fetched from the backend
interface ForumThread {
  id: number;
  title: string; // The main display title (e.g., SEN381)
  slug: string; // The URL part (e.g., sen381-thread)
  authorName: string;
  lastUpdated: string;
}

const ForumThreadListPage: React.FC = () => {
  const navigate = useNavigate();
  // The URL parameter is the category slug (e.g., 'workshops')
  const { categoryId: categorySlug } = useParams<{ categoryId: string }>();

  const [threads, setThreads] = useState<ForumThread[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Dynamic name display
  const categoryName = categorySlug
    ? categorySlug.charAt(0).toUpperCase() +
      categorySlug.slice(1).replace("-", " ")
    : "Forum Category";

  // NEW: Fetch threads from the backend
  useEffect(() => {
    if (!categorySlug) return;

    const fetchThreads = async () => {
      try {
        // Call the new Spring Boot endpoint: /api/forums/{categorySlug}/threads
        const response = await api.get<ForumThread[]>(
          `/forums/${categorySlug}/threads`
        );
        setThreads(response.data);
      } catch (err) {
        console.error("Failed to fetch threads:", err);
        setError(
          "Could not load forum threads. Please ensure the backend is running and the URL is correct."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchThreads();
  }, [categorySlug]); // Re-fetch if the category slug changes

  if (isLoading) {
    // Simple loading state
    return (
      // ... (Use your Layout or minimal container)
      <div className="text-white text-center mt-20">Loading threads...</div>
    );
  }

  if (error) {
    // Simple error state
    return (
      // ... (Use your Layout or minimal container)
      <div className="text-red-400 text-center mt-20 font-semibold">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* ... Background and Header ... */}
      <Header />

      <main className="max-w-4xl mx-auto py-4 px-4 space-y-6 relative z-10">
        {/* "Back to Categories" Link */}
        <div className="flex justify-start mb-6">
          <button
            onClick={() => navigate("/forums")}
            className="flex items-center gap-3 px-6 py-3 bg-white bg-opacity-20 backdrop-blur-md text-white rounded-xl hover:bg-opacity-30 transition-all duration-300 shadow-lg font-medium border border-white border-opacity-30"
          >
            <FaArrowLeft className="w-4 h-4" />
            <span>&lt; Categories</span>
          </button>
        </div>

        <h1 className="text-4xl font-extrabold text-white mb-8 drop-shadow-lg">
          {categoryName}
        </h1>

        <BrowseThreadsBanner />

        {/* List of Thread Cards (Dynamic Mapping) */}
        <div className="bg-purple-900 bg-opacity-40 rounded-3xl p-6 shadow-xl border border-purple-800 border-opacity-50">
          {threads.length === 0 ? (
            <p className="text-gray-200 text-center py-4">
              No threads found in this category.
            </p>
          ) : (
            threads.map((thread) => (
              <TopicCard
                key={thread.id}
                topicName={thread.title} // Use the thread title from DB
                author={thread.authorName} // Use the author name from DB
                lastUpdated={thread.lastUpdated} // Use the timestamp from DB
                href={`/forums/${categorySlug}/${thread.slug}`} // Build the navigation link
              />
            ))
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ForumThreadListPage;
