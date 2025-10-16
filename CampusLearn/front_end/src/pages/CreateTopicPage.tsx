// src/pages/CreateTopicPage.tsx

import React, { useState } from "react"; // Import useState
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FormInputCard from "../components/FormInputCard";
import DragDropBanner from "../components/DragDropBanner";
import ActionBanner from "../components/ActionBanner";
import api from "../services/api";

// Placeholder Icons
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
const PostIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 19v-7h7" />
    <path d="M12 12l6.5-6.5L12 12zM5 19l7-7-7-7" />
  </svg>
);

const CreateTopicPage: React.FC = () => {
  const navigate = useNavigate();

  // State for form fields
  const [moduleCode, setModuleCode] = useState("");
  const [topicTitle, setTopicTitle] = useState("");
  const [topicInfo, setTopicInfo] = useState(""); // Note: This field is currently NOT sent to the backend

  // State for loading and errors
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePostTopic = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    // 1. Client-side Validation
    if (!moduleCode.trim() || !topicTitle.trim()) {
      setError("Module Code and Topic Title are required.");
      setIsLoading(false);
      return;
    }

    try {
      // 2. Prepare data object (matching backend DTO: topicName, title)
      const topicData = {
        topicName: moduleCode.trim().toUpperCase(), // Send moduleCode as topicName
        title: topicTitle.trim(),
        content: topicInfo.trim(),
      };

      // 3. Make API call to POST the new topic
      await api.post("/topics", topicData);

      // 4. Redirect on success
      navigate("/topics");
    } catch (err: any) {
      console.error("Topic Creation Failed:", err);

      // 5. Handle errors from the backend (e.g., 403 Forbidden, 400 Bad Request)
      if (err.response) {
        if (err.response.status === 403) {
          setError(
            "Permission Denied. Only Tutors and Admins can create topics."
          );
        } else if (err.response.data.message) {
          setError(`Error: ${err.response.data.message}`);
        } else {
          setError("Failed to create topic due to a server error.");
        }
      } else {
        setError("Network error. Check your server connection.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Background elements (consistent) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
        <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
      </div>

      <Header />

      <main className="max-w-4xl mx-auto py-4 px-4 space-y-6 relative z-10">
        {/* Back to Browse Link */}
        <div className="flex justify-start mb-6">
          <button
            onClick={() => navigate("/topics")} // Navigate back to the topic list
            className="flex items-center gap-3 px-6 py-3 bg-white bg-opacity-20 backdrop-blur-md text-white rounded-xl hover:bg-opacity-30 transition-all duration-300 shadow-lg font-medium border border-white border-opacity-30"
            disabled={isLoading}
          >
            <FaArrowLeft className="w-4 h-4" />
            <span>&lt; Browse</span>
          </button>
        </div>

        <h1 className="text-4xl font-extrabold text-white mb-8 drop-shadow-lg">
          Create Topic
        </h1>

        {/* Error Banner */}
        {error && (
          <div className="bg-red-900 bg-opacity-70 text-white p-4 rounded-lg border border-red-700 font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handlePostTopic}>
          <FormInputCard title="TOPIC DETAILS">
            {/* Input Fields */}
            <input
              type="text"
              placeholder="Enter Module Code (e.g., SEN381):"
              value={moduleCode}
              onChange={(e) => setModuleCode(e.target.value)}
              className="w-full p-4 rounded-lg bg-gray-800 bg-opacity-70 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
              required
              disabled={isLoading}
            />
            <input
              type="text"
              placeholder="Enter Topic Title (e.g., Software Engineering):"
              value={topicTitle}
              onChange={(e) => setTopicTitle(e.target.value)}
              className="w-full p-4 rounded-lg bg-gray-800 bg-opacity-70 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
              required
              disabled={isLoading}
            />
            <textarea
              placeholder="Enter Topic Information (Not saved to DB yet):"
              value={topicInfo}
              onChange={(e) => setTopicInfo(e.target.value)}
              rows={5}
              className="w-full p-4 rounded-lg bg-gray-800 bg-opacity-70 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors resize-none"
              required
              disabled={isLoading}
            />
          </FormInputCard>

          <DragDropBanner />

          {/* Submit Button (wrapped in ActionBanner, but we use the form's submit event) */}
          <button type="submit" disabled={isLoading} className="w-full">
            <ActionBanner
              title={isLoading ? "POSTING..." : "POST NEW TOPIC"}
              href="#"
              Icon={PostIcon}
              gradient="from-[#8A2BE2] to-[#FF00FF]" // Purple to Pink
              className={`mt-4 ${
                isLoading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:scale-[1.02]"
              } transition-all`}
            />
          </button>
        </form>
      </main>

      <Footer />
    </div>
  );
};

export default CreateTopicPage;
