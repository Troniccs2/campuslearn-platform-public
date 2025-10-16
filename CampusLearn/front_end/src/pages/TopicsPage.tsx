import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Need Link for the empty state button
import Layout from "../components/Layout";
import BackButton from "../components/BackButton";
import TopicCard from "../components/TopicCard";
import CreateNewTopicBanner from "../components/CreateNewTopicBanner";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

// Define the structure for a topic response from the backend
interface Topic {
  id: number;
  topicName: string; // e.g., SEN381
  title: string; // e.g., Software Engineering
  authorName: string; // The tutor who created it
  lastUpdated: string; // The timestamp
}

const TopicsPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const userRole = user?.role;
  const isCreator = userRole === "TUTOR" || userRole === "ADMIN";

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

  // --- Data Fetching Logic (Unchanged) ---
  useEffect(() => {
    if (!isAuthenticated) {
      setIsLoading(false);
      return;
    }

    const fetchTopics = async () => {
      try {
        const response = await api.get<Topic[]>("/topics");
        setTopics(response.data);
      } catch (err) {
        console.error("Failed to fetch topics:", err);
        setError(
          "Could not load topics. Please ensure the backend is running and you are logged in."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopics();
  }, [isAuthenticated]);

  // --- Conditional Rendering for Loading/Error States (Unchanged) ---
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

  // --- RENDERING TOPIC LIST OR EMPTY STATE ---
  return (
    <Layout variant="dark">
      <BackButton label="< Dashboard" href={dashboardPath} />

      <h1 className="text-4xl font-extrabold text-white mb-8 drop-shadow-lg">
        Browse Topics
      </h1>

      {/* Renders the static banner at the top, visible only to creators */}
      {isCreator && <CreateNewTopicBanner href="/topics/create" />}

      {/* *** START OF EMPTY STATE LOGIC FIX *** */}
      {topics.length === 0 ? (
        // Scenario: NO TOPICS FOUND
        <div className="bg-purple-900 bg-opacity-40 rounded-3xl p-10 shadow-xl border border-purple-800 border-opacity-50 text-center">
          <p className="text-gray-200 text-2xl font-semibold mb-4">
            No topics found.
          </p>

          {isCreator ? (
            // Creator: Show a prominent button to create the first topic
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
            // Non-Creator: Simple empty message
            <p className="text-gray-400 text-lg">
              Check back soon! Tutors and Admins have not created any topics
              yet.
            </p>
          )}
        </div>
      ) : (
        // Scenario: TOPICS EXIST (Original rendering logic)
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
