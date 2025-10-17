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
  name: string; // Maps to topicName for TopicCard
  slug: string;
  lastAuthor: string; // Maps to author for TopicCard
  lastUpdated: string;
}

const ForumsPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const userRole = user?.role;

  // 2. State management for data fetching
  const [categories, setCategories] = useState<ForumCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
        setCategories(response.data);
      } catch (err) {
        setError(
          "Could not load forum categories. Please check your network and backend connection."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, [isAuthenticated]);

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
      {/* 5. FIX: Implement dynamic, role-based "Back to Dashboard" link */}
      <div className="flex justify-start mb-6">
        <Link
          to={dashboardPath}
          className="flex items-center gap-3 px-6 py-3 bg-white bg-opacity-20 backdrop-blur-md text-white rounded-xl hover:bg-opacity-30 transition-all duration-300 shadow-lg font-medium border border-white border-opacity-30"
        >
          <FaArrowLeft className="w-4 h-4" />
          <span>&lt; Dashboard</span>
        </Link>
      </div>

      <h1 className="text-4xl font-extrabold text-white mb-8 drop-shadow-lg">
        Forum
      </h1>

      <ForumCategoriesBanner />

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
              topicName={category.name} // Maps ForumCategory.name to TopicCard prop
              author={category.lastAuthor} // Maps ForumCategory.lastAuthor to TopicCard prop
              lastUpdated={category.lastUpdated}
              href={`/forums/${category.slug}`} // Use slug for navigation
            />
          ))
        )}
      </div>
    </Layout>
  );
};

export default ForumsPage;
