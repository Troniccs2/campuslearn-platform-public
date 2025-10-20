import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TopicCard from "../components/TopicCard";
import LearningMaterialsBanner from "../components/LearningMaterialsBanner";
import api from "../services/api"; // Assuming you have a configured axios instance

// 🛑 CRITICAL FIX: Define the base URL of your Spring Boot server 🛑
const BACKEND_BASE_URL = "http://localhost:8080";

// Define a type for the material data received from the backend
interface Material {
  id: number;
  filename: string;
  topicName: string; // The module code (e.g., SEN381)
  authorName: string;
  uploadDate: string; // ISO 8601 string
  fileUrl: string; // The URL to download the file (e.g., /api/files/download/...)
}

// Reusing FaArrowLeft
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

const ViewLearningMaterialsPage: React.FC = () => {
  const navigate = useNavigate();
  const { topicId } = useParams<{ topicId: string }>();

  // --- STATE FOR DATA ---
  const [materials, setMaterials] = useState<Material[]>([]);
  const [topicTitle, setTopicTitle] = useState("Loading...");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const backPath = topicId ? `/topics/${topicId}` : "/topics";
  // Assuming topicId is used as the module code/slug (e.g., software-engineering)
  const moduleCode = topicId || "UNKNOWN";

  // --- DATA FETCHING LOGIC ---
  useEffect(() => {
    if (!topicId) {
      setTopicTitle("Topic Not Found");
      setError("No topic ID provided in the URL.");
      setIsLoading(false);
      return;
    }

    const fetchMaterials = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // 1. Fetch materials linked to this topicId
        const materialsResponse = await api.get(`/materials/topic/${topicId}`);

        const materialsArray = Array.isArray(materialsResponse.data)
          ? materialsResponse.data
          : [];
        setMaterials(materialsArray as Material[]);

        // 2. Fetch topic details for the title
        const topicResponse = await api.get(`/topics/${topicId}`);
        setTopicTitle((topicResponse.data as any)?.title || "Topic Materials");
      } catch (err: any) {
        console.error("Failed to fetch learning materials:", err);

        setError(
          err.response?.data?.message ||
            "Could not load learning materials. Please check server logs."
        );
        setMaterials([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMaterials();
  }, [topicId]);

  const getTopicCardTitle = (material: Material) => {
    // Example: SEN381 - Lecture Slide 1.pdf
    const fileNameWithoutExt = material.filename.replace(/\.[^/.]+$/, "");
    return `${material.topicName}: ${fileNameWithoutExt}`;
  };

  // Helper to format the date in a readable way
  const timeAgo = (dateString: string) => {
    const now = new Date();
    const past = new Date(dateString);

    if (isNaN(past.getTime())) return "Unknown Date";

    const diffInHours = Math.floor(
      (now.getTime() - past.getTime()) / (1000 * 60 * 60)
    );
    if (diffInHours < 24) return `${diffInHours || 1} hours ago`;
    return past.toLocaleDateString();
  };

  // --- RENDERING LOGIC (WITH THE FIX) ---
  const renderMaterials = () => {
    // ... (Loading, Error, Empty state logic remains the same)

    if (isLoading) {
      return (
        <div className="text-white text-center p-8">Loading materials...</div>
      );
    }

    if (error) {
      return (
        <div className="bg-red-800 text-white p-4 rounded-lg text-center">
          {error}
        </div>
      );
    }

    if (materials.length === 0) {
      return (
        <div className="text-gray-400 text-center p-8">
          No learning materials have been uploaded for this topic yet.
        </div>
      );
    }

    // Map over the fetched 'materials' state
    return materials.map((material) => {
      // 🛑 CRITICAL FIX APPLIED HERE 🛑
      // Ensure the file URL is correctly formatted for the public endpoint:
      // http://localhost:8080/api/files/download/{filename}

      const API_PREFIX = "/api/files/download";
      let filePath = material.fileUrl;

      // 1. Check if the fileUrl already contains the correct API path.
      if (!filePath.startsWith(API_PREFIX)) {
        // 2. If it's missing, ensure it starts with API_PREFIX and clean up any leading slashes.
        // This handles cases where fileUrl is just 'filename.pdf' or '/filename.pdf'
        filePath = `${API_PREFIX}/${filePath.replace(/^\//, "")}`;
      }

      return (
        <TopicCard
          key={material.id}
          topicName={material.filename}
          author={`Uploaded by: ${material.authorName}`}
          lastUpdated={`Uploaded ${timeAgo(material.uploadDate)}`}
          // Combine the base URL with the guaranteed correct file path
          href={BACKEND_BASE_URL + filePath}
          target="_blank"
        />
      );
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
        <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
      </div>

      <Header />

      <main className="max-w-4xl mx-auto py-4 px-4 space-y-6 relative z-10">
        {/* "Back to Topic" Link */}
        <div className="flex justify-start mb-6">
          <button
            onClick={() => navigate(backPath)}
            className="flex items-center gap-3 px-6 py-3 bg-white bg-opacity-20 backdrop-blur-md text-white rounded-xl hover:bg-opacity-30 transition-all duration-300 shadow-lg font-medium border border-white border-opacity-30"
            disabled={isLoading}
          >
            <FaArrowLeft className="w-4 h-4" />
            <span>&lt; Topic</span>
          </button>
        </div>

        <h1 className="text-4xl font-extrabold text-white mb-8 drop-shadow-lg">
          {moduleCode} - {topicTitle}
        </h1>

        <LearningMaterialsBanner />

        {/* List of Material Cards (Dynamic Content) */}
        <div className="bg-purple-900 bg-opacity-40 rounded-3xl p-6 shadow-xl border border-purple-800 border-opacity-50">
          {renderMaterials()}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ViewLearningMaterialsPage;
