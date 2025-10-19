// src/pages/TopicDetailsPage.tsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import TopicContentCard from "../components/TopicContentCard";
import ResponseCard from "../components/ResponseCard";
import ActionBanner from "../components/ActionBanner";
import axios from "axios";

// --- Interface Definitions (FIXED for Flat DTO and Null Safety) ---

interface Author {
  id: number;
  firstName: string | null; // Added | null for safety
  lastName: string | null; // Added | null for safety
}

interface TopicDetail {
  id: number;
  topicName: string | null; // Added | null for safety
  title: string | null;
  content: string | null;
  author: Author;
  lastUpdated: string | null;
}

// 💥 FLATTENED DTO: Assumes the response contains TopicDetail fields + responses
interface TopicDetailDTO extends TopicDetail {
  responses: Response[] | null; // Added | null for safety
}

interface Response {
  id: number;
  name: string;
  studentId: string;
  date: string; // The response date
  content: string;
}

// --- Placeholder Icons (SVG Element Typo Fixed) ---
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

const AddResponseIcon = (props: React.SVGProps<SVGSVGElement>) => (
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
    <line x1="12" y1="8" x2="12" y2="16" />
    <line x1="8" y1="12" x2="16" y2="12" />
  </svg>
);

// 💥 FIX: Corrected typo from SVGSVGelement to SVGSVGElement
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
  const [responses, setResponses] = useState<Response[]>([]);
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
        // Use the DTO representing the entire successful response body
        const response = await axios.get<TopicDetailDTO>(
          `${API_BASE_URL}/${topicId}`
        );

        // 💥 FINAL FIX: Assign the entire data object to topicDetail
        // and safely pull responses. This resolves the DTO flattening issue.
        setTopicDetail(response.data);
        setResponses(response.data.responses || []);

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
        setResponses([]);
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

  // This block is what was being hit due to !topicDetail
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

  // 💥 DEFENSIVE CODE: Safely extract and default values to prevent crashes
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
        title={safeTitle} // Passing the safe, non-null value
        creator={displayCreator}
        date={safeDate}
        content={safeContent}
      />

      {/* Responses Section (Dynamic) */}
      <div className="mb-8">
        {responses.length === 0 && (
          <div className="text-center py-10 text-white text-lg bg-white bg-opacity-10 rounded-xl">
            No responses yet. Be the first to add one!
          </div>
        )}

        {responses.map((response, index) => (
          <ResponseCard
            key={response.id}
            isFirst={index === 0}
            name={response.name}
            studentId={response.studentId}
            date={response.date}
            content={response.content}
          />
        ))}
      </div>

      {/* Action Banners */}
      <ActionBanner
        title="ADD RESPONSE"
        href={`/topics/${topicId}/add-response`}
        Icon={AddResponseIcon}
        gradient="from-[#FF00FF] to-[#8A2BE2]"
      />

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
