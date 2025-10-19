// src/pages/TopicDetailsPage.tsx

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TopicContentCard from "../components/TopicContentCard";
import ResponseCard from "../components/ResponseCard";
import ActionBanner from "../components/ActionBanner";
import axios from "axios";

// --- Interface Definitions ---
interface ForumThread {
  id: number;
  subject: string;
  fullTitle: string;
  creator: string;
  date: string;
  content: string;
}

interface Response {
  id: number;
  name: string;
  studentId: string;
  date: string;
  content: string;
}

// Interface for the combined DTO from the Spring Boot backend
interface TopicDetailDTO {
  topic: ForumThread;
  responses: Response[];
}

// --- Placeholder Icons (Kept as is) ---
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
        <path d="M12 19l-7-7 7-7" /> {" "}
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
        <line x1="8" y1="12" x2="16" y2="12" /> {" "}
  </svg>
);
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
       {" "}
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2v10z" />
     {" "}
  </svg>
);

const TopicDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const { topicId } = useParams<{ topicId: string }>();

  const [topic, setTopic] = useState<ForumThread | null>(null);
  const [responses, setResponses] = useState<Response[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Backend Spring Boot port

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
        // Fetch the single combined DTO from the backend
        const response = await axios.get<TopicDetailDTO>(
          `${API_BASE_URL}/${topicId}`
        ); // Set the states from the combined DTO object

        setTopic(response.data.topic);
        setResponses(response.data.responses);

        setError(null);
      } catch (err) {
        console.error("Failed to fetch data:", err);
        if (axios.isAxiosError(err) && err.response) {
          if (err.response.status === 404) {
            setError("Topic not found.");
          } else if (err.response.status >= 500) {
            setError("Server Error: Cannot connect to database.");
          }
        } else {
          setError(
            "Failed to load topic details. Network connection failed or backend is down."
          );
        }
        setTopic(null);
        setResponses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTopicData();
  }, [topicId]); // --- RENDERING LOGIC ---

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
                Loading Topic...      {" "}
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen p-10 bg-gray-900 text-red-400">
                <p className="text-xl">Error: {error}</p>       {" "}
        <button
          onClick={() => navigate("/topics")}
          className="mt-4 text-indigo-400 underline"
        >
                    Go Back to Topics        {" "}
        </button>
             {" "}
      </div>
    );
  } // Safety check in case topic is null but no error caught

  if (!topic) {
    return (
      <div className="min-h-screen p-10 bg-gray-900 text-white">
                <p className="text-xl">Topic data is missing or invalid.</p>   
           {" "}
        <button
          onClick={() => navigate("/topics")}
          className="mt-4 text-indigo-400 underline"
        >
                    Go Back to Topics        {" "}
        </button>
             {" "}
      </div>
    );
  }

  const { subject, fullTitle, creator, date, content } = topic;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 relative overflow-hidden">
           {" "}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
               {" "}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
               {" "}
        <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
             {" "}
      </div>
            <Header />     {" "}
      <main className="max-w-4xl mx-auto py-4 px-4 space-y-4 relative z-10">
                {/* Back to Browse Link */}       {" "}
        <div className="flex justify-start mb-6">
                   {" "}
          <button
            onClick={() => navigate("/topics")}
            className="flex items-center gap-3 px-6 py-3 bg-white bg-opacity-20 backdrop-blur-md text-white rounded-xl hover:bg-opacity-30 transition-all duration-300 shadow-lg font-medium border border-white border-opacity-30"
          >
                        <FaArrowLeft className="w-4 h-4" />           {" "}
            <span>&lt; Browse</span>         {" "}
          </button>
                 {" "}
        </div>
               {" "}
        <h1 className="text-4xl font-extrabold text-white mb-2 drop-shadow-lg">
                    {subject} - {fullTitle}       {" "}
        </h1>
                {/* Topic Details Card (Dynamic) */}       {" "}
        <TopicContentCard
          title={`${subject} - ${fullTitle}`}
          creator={creator}
          date={date}
          content={content}
        />
                {/* Responses Section (Dynamic) */}       {" "}
        <div className="mb-8">
                   {" "}
          {responses.length > 0 ? (
            responses.map((response, index) => (
              <ResponseCard
                key={response.id}
                isFirst={index === 0}
                name={response.name}
                studentId={response.studentId}
                date={response.date}
                content={response.content}
              />
            ))
          ) : (
            <div className="text-center py-10 text-white text-lg bg-white bg-opacity-10 rounded-xl">
                            No responses yet. Be the first to add one!          
               {" "}
            </div>
          )}
                 {" "}
        </div>
                {/* Action Banners */}       {" "}
        <ActionBanner
          title="ADD RESPONSE"
          href={`/topics/${topicId}/add-response`}
          Icon={AddResponseIcon}
          gradient="from-[#FF00FF] to-[#8A2BE2]"
        />
               {" "}
        <ActionBanner
          title="VIEW LEARNING MATERIAL"
          href={`/topics/${topicId}/materials`}
          Icon={LearningMaterialIcon}
          gradient="from-[#8A2BE2] to-[#4B0082]"
        />
             {" "}
      </main>
            <Footer />   {" "}
    </div>
  );
};

export default TopicDetailsPage;
