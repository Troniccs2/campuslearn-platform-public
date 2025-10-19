// src/pages/TopicDetailsPage.tsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import TopicContentCard from "../components/TopicContentCard";
// import ResponseCard from "../components/ResponseCard"; // <--- REMOVED
import ActionBanner from "../components/ActionBanner";
import axios from "axios";

// --- Interface Definitions (SIMPLIFIED - No Responses) ---

interface Author {
  id: number;
  firstName: string | null;
  lastName: string | null;
}

interface TopicDetail {
  id: number;
  topicName: string | null;
  title: string | null;
  content: string | null;
  author: Author;
  lastUpdated: string | null;
}

// 💥 SIMPLIFIED DTO: Only needs to match TopicDetail now
interface TopicDetailDTO extends TopicDetail {}

// The Response interface has been removed.

// --- Placeholder Icons ---
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

// The AddResponseIcon is no longer needed.

// FIX: Corrected typo from SVGSVGelement to SVGSVGElement
const LearningMaterialIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2v10z" />
  </svg>
);

const TopicDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const { topicId } = useParams<{ topicId: string }>();

  // State to hold the fetched data
  const [topicDetail, setTopicDetail] = useState<TopicDetail | null>(null);
  // const [responses, setResponses] = useState<Response[]>([]); <--- REMOVED
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_BASE_URL = "http://localhost:8080/api/topics";

  useEffect(() => {
    if (!topicId) {
      setError("Error: Topic ID is missing.");
      setLoading(false);
      return;
    }

    const fetchTopicData = async () => {
      setLoading(true);
      try {
        const response = await axios.get<TopicDetailDTO>(
          `${API_BASE_URL}/${topicId}`
        );

        // Assign the entire data object. Responses are no longer handled here.
        setTopicDetail(response.data);
        // setResponses(response.data.responses || []); <--- REMOVED

        setError(null);
      } catch (err) {
        console.error("Failed to fetch data:", err);
        if (axios.isAxiosError(err) && err.response) {
          if (err.response.status === 404) {
            setError("Topic not found.");
          } else {
            setError(
              `Server Error: Failed to load topic details (Status ${err.response.status}).`
            );
          }
        } else {
          setError(
            "Failed to load topic details. Network connection failed or backend is down."
          );
        }
        setTopicDetail(null);
        // setResponses([]); <--- REMOVED
      } finally {
        setLoading(false);
      }
    };

    fetchTopicData();
  }, [topicId]);

  // --- RENDERING LOGIC ---

  if (loading) {
    return (
      <Layout variant="dark" showFooter={false}>
        <p className="text-white text-center mt-20">Loading Topic...</p>
      </Layout>
    );
  }

  if (error || !topicDetail) {
    return (
      <Layout variant="dark" showFooter={false}>
        <div className="min-h-[50vh] p-10 flex flex-col justify-center items-center">
          <p className="text-xl text-red-400">
            Error: {error || "Topic data is missing or invalid."}
          </p>
          <button
            onClick={() => navigate("/topics")}
            className="mt-4 text-indigo-400 underline hover:text-indigo-300"
          >
            Go Back to Topics
          </button>
        </div>
      </Layout>
    );
  }

  // DEFENSIVE CODE: Safely extract and default values to prevent crashes
  const { topicName, title, author, lastUpdated, content } = topicDetail;

  const safeTopicName = topicName ?? "N/A Topic";
  const safeTitle = title ?? "N/A Title";
  const safeFirstName = author?.firstName ?? "Unknown";
  const safeLastName = author?.lastName ?? "Author";
  const safeDate = lastUpdated ?? "Unknown Date";
  const safeContent = content ?? "Content could not be loaded.";

  const displayTitle = `${safeTopicName} - ${safeTitle}`;
  const displayCreator = `${safeFirstName} ${safeLastName}`;

  return (
    <Layout variant="dark">
      <div className="flex justify-start mb-6">
        <button
          onClick={() => navigate("/topics")}
          className="flex items-center gap-3 px-6 py-3 bg-white bg-opacity-20 backdrop-blur-md text-white rounded-xl hover:bg-opacity-30 transition-all duration-300 shadow-lg font-medium border border-white border-opacity-30"
        >
          <FaArrowLeft className="w-4 h-4" />
          <span>&lt; Browse</span>
        </button>
      </div>

      <h1 className="text-4xl font-extrabold text-white mb-8 drop-shadow-lg">
        {displayTitle}
      </h1>

      {/* Topic Details Card (Dynamic) */}
      <TopicContentCard
        title={safeTitle}
        creator={displayCreator}
        date={safeDate}
        content={safeContent}
      />

      {/* The Responses Section (Dynamic) is REMOVED */}

      {/* Action Banner (ADD RESPONSE) is REMOVED */}

      <ActionBanner
        title="VIEW LEARNING MATERIAL"
        href={`/topics/${topicId}/materials`}
        Icon={LearningMaterialIcon}
        gradient="from-[#8A2BE2] to-[#4B0082]"
      />
    </Layout>
  );
};

export default TopicDetailsPage;
