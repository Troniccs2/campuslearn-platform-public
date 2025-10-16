import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
// import BackButton from "../components/BackButton"; // 🛑 REMOVED
import TopicCard from "../components/TopicCard";
import CreateNewTopicBanner from "../components/CreateNewTopicBanner";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

// Placeholder Icon for the Back Link
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

interface Topic {
  id: number;
  topicName: string;
  title: string;
  authorName: string;
  lastUpdated: string;
}

const TopicsPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const userRole = user?.role;

  const isCreator =
    user &&
    (user.role.toUpperCase() === "TUTOR" ||
      user.role.toUpperCase() === "ADMIN");

  const [topics, setTopics] = useState<Topic[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    if (!isAuthenticated) {
      setIsLoading(false);
      return;
    }

    const fetchTopics = async () => {
      try {
        // NOTE: Endpoint is already correct here: /topics
        const response = await api.get<Topic[]>("/topics");
        setTopics(response.data);
      } catch (err) {
        setError(
          "Could not load topics. Please ensure the backend is running and you are logged in."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopics();
  }, [isAuthenticated]);

  if (isLoading) {
    return (
      <Layout variant="dark">
        <p className="text-white text-center mt-20">Loading topics...</p>
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

  return (
    <Layout variant="dark">
      {/* 🛠️ FIX: Replaced BackButton with inline Link to ensure the correct path is used */}
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
        Browse Topics
      </h1>

      {isCreator && <CreateNewTopicBanner href="/topics/create" />}

      {topics.length === 0 ? (
        <div className="bg-purple-900 bg-opacity-40 rounded-3xl p-10 shadow-xl border border-purple-800 border-opacity-50 text-center">
          <p className="text-gray-200 text-2xl font-semibold mb-4">
            No topics found.
          </p>

          {isCreator ? (
            <>
              <p className="text-gray-400 text-lg mb-6">
                Be the first to create a topic and start a discussion!
              </p>
              <Link
                to="/topics/create"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl transition duration-300 shadow-lg hover:shadow-xl"
              >
                Create New Topic Now
              </Link>
            </>
          ) : (
            <p className="text-gray-400 text-lg">
              Check back soon! Tutors and Admins have not created any topics
              yet.
            </p>
          )}
        </div>
      ) : (
        <div className="bg-purple-900 bg-opacity-40 rounded-3xl p-6 shadow-xl border border-purple-800 border-opacity-50">
          {topics.map((topic) => (
            <TopicCard
              key={topic.id}
              topicName={topic.topicName}
              author={topic.authorName}
              lastUpdated={topic.lastUpdated}
              href={`/topics/${topic.topicName}`}
            />
          ))}
        </div>
      )}
    </Layout>
  );
};

export default TopicsPage;
