import React, { useState, useEffect, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FormInputCard from "../components/FormInputCard";
import ActionBanner from "../components/ActionBanner";
import api from "../services/api";
import FileDropZone from "../components/FileDropZone";

// --- START: Types and Placeholder Components ---

// Type for the data received from the backend /users/students endpoint
interface Student {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

// ⚠️ Placeholder for a Multi-Select UI Component
const MultiSelectDropdown = ({
  options,
  selected,
  onChange,
  disabled,
}: {
  options: Student[];
  selected: number[];
  onChange: (selectedIds: number[]) => void;
  disabled: boolean;
}) => (
  <div className="space-y-2">
    <label className="text-gray-300 font-medium text-lg">
      Select Students to Enroll (Optional)
    </label>
    <select
      multiple
      value={selected.map(String)} // Map to string for <select> value
      onChange={(e) => {
        const selectedIds = Array.from(e.target.options)
          .filter((option) => option.selected)
          .map((option) => Number(option.value));
        onChange(selectedIds);
      }}
      className="w-full p-4 rounded-lg bg-gray-800 bg-opacity-70 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors h-48"
      disabled={disabled}
    >
      {options.map((student) => (
        <option key={student.id} value={student.id}>
          {student.firstName} {student.lastName} ({student.email})
        </option>
      ))}
      {options.length === 0 && <option disabled>Loading students...</option>}
    </select>
  </div>
);

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
// --- END: Types and Placeholder Components ---

const CreateTopicPage: React.FC = () => {
  const navigate = useNavigate();

  // State for Topic Details
  const [moduleCode, setModuleCode] = useState("");
  const [topicTitle, setTopicTitle] = useState("");
  const [topicInfo, setTopicInfo] = useState("");

  // ⬇️ NEW STATE FOR STUDENT ENROLLMENT ⬇️
  const [availableStudents, setAvailableStudents] = useState<Student[]>([]);
  const [selectedStudentIds, setSelectedStudentIds] = useState<number[]>([]);

  const [newTopicId, setNewTopicId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // ----------------------------------------

  // ⬇️ NEW EFFECT: Fetch students when the component mounts ⬇️
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        // Calls the new backend endpoint: GET /api/users/students
        const response = await api.get<Student[]>("/users/students");
        setAvailableStudents(response.data);
      } catch (err) {
        console.error("Failed to fetch students for enrollment:", err);
      }
    };
    if (!newTopicId) {
      fetchStudents();
    }
  }, [newTopicId]);

  const handleNavigation = () => {
    navigate("/topics");
  };

  const handleCreateTopic = async (event: FormEvent) => {
    event.preventDefault();

    console.log("handleCreateTopic initiated...");
    setError(null);
    setIsLoading(true);

    if (!moduleCode.trim() || !topicTitle.trim()) {
      console.log("Validation failed: Missing Module Code or Topic Title.");
      setError("Module Code and Topic Title are required.");
      setIsLoading(false);
      return;
    }

    try {
      // 🚨 FIX: INCLUDE selectedStudentIds in the topicData
      const topicData = {
        // We ensure the topicName (slug) is created using the title, matching backend logic
        topicName: topicTitle
          .trim()
          .toLowerCase()
          .replaceAll(/[^a-z0-9]+/g, "-"),
        title: topicTitle.trim(),
        content: topicInfo.trim(),
        studentIds: selectedStudentIds, // ⬅️ The key the backend's TopicRequest DTO is now expecting
      };

      console.log("Attempting API POST to /topics with data:", topicData);

      const response = await api.post("/topics", topicData);

      console.log("API POST successful. Response data:", response.data);

      const createdTopicId =
        (response.data as any).id || (response.data as any).topicId;

      if (!createdTopicId) {
        throw new Error(
          "API responded successfully but did not return a topic ID."
        );
      }

      setNewTopicId(createdTopicId.toString());
    } catch (err: any) {
      console.error("Topic Creation Failed:", err);

      if (err.response) {
        if (err.response.status === 403) {
          setError(
            "Permission Denied. Only Tutors and Admins can create topics."
          );
        } else if (err.response.data && err.response.data.message) {
          setError(`Error: ${err.response.data.message}`);
        } else {
          setError("Failed to create topic due to a server error.");
        }
      } else {
        setError("Network error. Check your server connection.");
      }
    } finally {
      setIsLoading(false);
      console.log("handleCreateTopic finished. isLoading set to false.");
    }
  };

  const renderContent = () => {
    if (newTopicId) {
      // STAGE 2: File Upload
      return (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-white">
            Topic Created! Now Upload Materials 📤
          </h2>
          <p className="text-lg text-gray-300">
            Topic ID:
            <span className="font-mono text-yellow-400">{newTopicId}</span>
          </p>
          <FileDropZone topicId={newTopicId} />
          <button
            onClick={handleNavigation}
            className="w-full mt-8 p-4 bg-green-600 rounded-lg text-white font-bold text-xl hover:bg-green-700 transition-colors"
          >
            Finish and Go to Topics List
          </button>
        </div>
      );
    }

    // STAGE 1: Topic Creation Form
    return (
      <form onSubmit={handleCreateTopic}>
        <FormInputCard title="TOPIC DETAILS">
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
            placeholder="Enter Topic Information (Content for the Topic):"
            value={topicInfo}
            onChange={(e) => setTopicInfo(e.target.value)}
            rows={5}
            className="w-full p-4 rounded-lg bg-gray-800 bg-opacity-70 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors resize-none"
            required
            disabled={isLoading}
          />
        </FormInputCard>

        {/* ⬇️ NEW SECTION: Student Selection Card ⬇️ */}
        <div className="mt-6">
          <FormInputCard title="ENROLL STUDENTS">
            <MultiSelectDropdown
              options={availableStudents}
              selected={selectedStudentIds}
              onChange={setSelectedStudentIds}
              disabled={isLoading}
            />
          </FormInputCard>
        </div>
        {/* ------------------------------------- */}

        <div className="w-full mt-8">
          <ActionBanner
            title={isLoading ? "POSTING TOPIC..." : "POST NEW TOPIC"}
            // 🚨 FIX for TypeScript error: Required prop must be present 🚨
            href="#"
            // -------------------------------------------------------------
            Icon={PostIcon}
            gradient="from-[#8A2BE2] to-[#FF00FF]"
            className={`mt-8 ${
              isLoading ? "opacity-50 cursor-not-allowed" : "hover:scale-[1.02]"
            } transition-all`}
            onClick={handleCreateTopic}
          />
        </div>
      </form>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      <Header />
      <main className="max-w-4xl mx-auto py-4 px-4 space-y-6 relative z-10">
        <div className="flex justify-start mb-6">
          <button
            onClick={handleNavigation}
            className="flex items-center gap-3 px-6 py-3 bg-white bg-opacity-20 backdrop-blur-md text-white rounded-xl hover:bg-opacity-30 transition-all duration-300 shadow-lg font-medium border border-white border-opacity-30"
            disabled={isLoading}
          >
            <FaArrowLeft className="w-4 h-4" />
            <span>&lt; Browse</span>
          </button>
        </div>

        <h1 className="text-4xl font-extrabold text-white mb-8 drop-shadow-lg">
          {newTopicId ? "Upload Materials" : "Create Topic"}
        </h1>

        {error && (
          <div className="bg-red-900 bg-opacity-70 text-white p-4 rounded-lg border border-red-700 font-semibold">
            {error}
          </div>
        )}
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
};

export default CreateTopicPage;
