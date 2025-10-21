// src/pages/ForumsPage.tsx

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import TopicCard from "../components/TopicCard";
import ForumCategoriesBanner from "../components/ForumCategoriesBanner";
import api from "../services/api"; // Assuming you have a configured axios/fetch wrapper
import { useAuth } from "../context/AuthContext"; // Assuming this context is used for user data

// Placeholder Icon for the Back Link (using the same SVG as TopicsPage)
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

// 1. Define the interface for the data structure coming from the backend
interface ForumCategory {
  id: number;
  name: string;
  slug: string;
  lastAuthor: string | null;
  lastUpdated: string | null;
  description?: string | null;
}

const parseTimestamp = (value?: string | null): number => {
  if (!value) return 0;
  const parsed = Date.parse(value);
  return Number.isNaN(parsed) ? 0 : parsed;
};

const sortCategories = (list: ForumCategory[]): ForumCategory[] =>
  [...list].sort((a, b) => parseTimestamp(b.lastUpdated) - parseTimestamp(a.lastUpdated));

const formatLastUpdated = (value?: string | null): string => {
  if (!value) return "Recently updated";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "Recently updated";
  }
  return date.toLocaleString();
};

const ForumsPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const userRole = user?.role;

  // 2. State management for data fetching
  const [categories, setCategories] = useState<ForumCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [createError, setCreateError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 3. Role-based navigation logic (copied from TopicsPage for consistency)
  const getDashboardPath = (role: string | undefined): string => {
    switch (role) {
      case "ADMIN":
        return "/admin-dashboard";
      case "TUTOR":
        return "/tutor-dashboard";
      case "STUDENT":
        return "/student-dashboard";
      default:
        return "/dashboard";
    }
  };

  const dashboardPath = getDashboardPath(userRole);

  // 4. Data Fetching Logic
  useEffect(() => {
    if (!isAuthenticated) {
      setIsLoading(false);
      return;
    }

    const fetchCategories = async () => {
      try {
        // NOTE: Use the correct API endpoint for categories
        const response = await api.get<ForumCategory[]>("/forums/categories");
        setCategories(sortCategories(response.data));
      } catch (err) {
        console.error("Failed to load forum categories", err);
        setError(
          "Could not load forum categories. Please check your network and backend connection."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, [isAuthenticated]);

  const handleCreateCategory = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = newCategoryName.trim();
    if (!trimmed) {
      setCreateError("Please provide a forum name.");
      return;
    }

    setIsSubmitting(true);
    setCreateError(null);

    try {
      const response = await api.post<ForumCategory>("/forums/categories", {
        name: trimmed,
      });
      setCategories((prev) => sortCategories([response.data, ...prev]));
      setNewCategoryName("");
      setIsCreateMode(false);
    } catch (err) {
      console.error("Failed to create forum category", err);
      setCreateError(
        "Could not create the forum category. Please try again or contact support."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Conditional Rendering for Loading/Error States ---

  if (isLoading) {
    return (
      <Layout variant="dark">
        <p className="text-white text-center mt-20">
          Loading forum categories...
        </p>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout variant="dark">
        <p className="text-red-400 text-center mt-20 font-semibold">{error}</p>
      </Layout>
    );
  }

  // --- Main Render ---

  return (
    <Layout variant="dark">
      {/* 5. Implement dynamic, role-based "Back to Dashboard" link */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <Link
          to={dashboardPath}
          className="flex items-center gap-3 px-6 py-3 bg-white bg-opacity-20 backdrop-blur-md text-white rounded-xl hover:bg-opacity-30 transition-all duration-300 shadow-lg font-medium border border-white border-opacity-30"
        >
          <FaArrowLeft className="w-4 h-4" />
          <span>&lt; Dashboard</span>
        </Link>

        <button
          type="button"
          onClick={() => {
            setIsCreateMode((open) => !open);
            setCreateError(null);
          }}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#FF00FF] to-[#8A2BE2] text-white font-semibold shadow-lg transition-transform duration-300 hover:scale-[1.02]"
        >
          {isCreateMode ? "Cancel" : "Create Forum Category"}
        </button>
      </div>

      <h1 className="text-4xl font-extrabold text-white mb-8 drop-shadow-lg">
        Forum
      </h1>

      <ForumCategoriesBanner />

      {isCreateMode && (
        <form
          onSubmit={handleCreateCategory}
          className="mb-6 bg-purple-900 bg-opacity-40 rounded-3xl p-6 shadow-xl border border-purple-800 border-opacity-50 space-y-4"
        >
          <div>
            <label htmlFor="forum-name" className="block text-sm font-semibold text-white uppercase tracking-wider mb-2">
              Forum name
            </label>
            <input
              id="forum-name"
              type="text"
              placeholder="e.g. Exam Preparation"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 bg-opacity-70 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
              disabled={isSubmitting}
              maxLength={120}
            />
          </div>
          {createError && (
            <p className="text-sm text-red-300 font-semibold">{createError}</p>
          )}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => {
                setIsCreateMode(false);
                setNewCategoryName("");
                setCreateError(null);
              }}
              className="px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
              disabled={isSubmitting}
            >
              Close
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-pink-600 text-white font-semibold hover:bg-pink-700 transition-colors disabled:opacity-60"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      )}

      <div className="bg-purple-900 bg-opacity-40 rounded-3xl p-6 shadow-xl border border-purple-800 border-opacity-50">
        {/* Check if any categories were returned */}
        {categories.length === 0 ? (
          <p className="text-gray-200 text-center py-4">
            No forum categories have been created yet.
          </p>
        ) : (
          // 6. Dynamically map data from the database
          categories.map((category) => (
            <TopicCard
              key={category.id}
              topicName={category.name}
              author={category.lastAuthor ?? undefined}
              lastUpdated={formatLastUpdated(category.lastUpdated)}
              description={category.description ?? undefined}
              href={`/forums/${category.slug}/threads`}
            />
          ))
        )}
      </div>
    </Layout>
  );
};

export default ForumsPage;
