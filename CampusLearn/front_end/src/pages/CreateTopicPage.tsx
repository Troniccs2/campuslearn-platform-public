import React, { useState, useEffect, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FormInputCard from "../components/FormInputCard";
import ActionBanner from "../components/ActionBanner";
import api from "../services/api";
import FileDropZone from "../components/FileDropZone";

// --- START: Types and Placeholder Components ---

interface Student {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

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
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleStudent = (studentId: number) => {
    if (selected.includes(studentId)) {
      onChange(selected.filter((id) => id !== studentId));
    } else {
      onChange([...selected, studentId]);
    }
  };

  const selectedStudents = options.filter((student) =>
    selected.includes(student.id)
  );

  return (
    <div className="space-y-3">
      <label className="text-white font-bold text-lg uppercase tracking-wider flex items-center gap-2">
        <span className="w-2 h-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"></span>
        Select Students to Enroll
      </label>

      {/* Selected Count Badge */}
      {selected.length > 0 && (
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold rounded-full shadow-lg">
            {selected.length} student{selected.length !== 1 ? "s" : ""} selected
          </span>
        </div>
      )}

      {/* Custom Dropdown */}
      <div className="relative">
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={`w-full p-4 rounded-xl bg-gradient-to-r from-purple-800/40 to-indigo-800/40 backdrop-blur-md border border-purple-500/30 text-white font-medium text-left transition-all duration-300 ${
            disabled
              ? "opacity-50 cursor-not-allowed"
              : "hover:from-purple-700/50 hover:to-indigo-700/50 hover:border-purple-400/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
          } shadow-xl`}
        >
          <div className="flex items-center justify-between">
            <span
              className={selected.length === 0 ? "text-gray-300" : "text-white"}
            >
              {selected.length === 0
                ? options.length === 0
                  ? "Loading students..."
                  : "Click to select students"
                : `${selected.length} student${
                    selected.length !== 1 ? "s" : ""
                  } selected`}
            </span>
            <svg
              className={`w-5 h-5 transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </button>

        {/* Dropdown Menu - FIX APPLIED HERE: Opening UPWARDS ⬆️ 
           top-auto bottom-full forces the menu to anchor to the bottom of the button
           and extend upwards, clearing the space below it for the POST button.
        */}
        {isOpen && (
          <div className="absolute z-[9999] w-full mb-2 bottom-full max-h-40 overflow-y-auto rounded-xl bg-gradient-to-br from-gray-900/95 to-purple-900/95 backdrop-blur-md border border-purple-500/30 shadow-2xl">
            {options.length === 0 ? (
              <div className="p-4 text-gray-400 text-center font-medium">
                No students available
              </div>
            ) : (
              options.map((student) => {
                const isSelected = selected.includes(student.id);
                return (
                  <div
                    key={student.id}
                    onClick={() => toggleStudent(student.id)}
                    className={`p-4 cursor-pointer transition-all duration-200 border-b border-purple-500/20 last:border-b-0 ${
                      isSelected
                        ? "bg-gradient-to-r from-purple-600/50 to-pink-600/50 text-white"
                        : "hover:bg-purple-700/30 text-gray-200"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="font-semibold">
                          {student.firstName} {student.lastName}
                        </div>
                        <div className="text-sm text-gray-400">
                          {student.email}
                        </div>
                      </div>
                      {isSelected && (
                        <div className="w-5 h-5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
                          <svg
                            className="w-3 h-3 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>

      {/* Selected Students Preview (with max-h and scrollbar) */}
      {selectedStudents.length > 0 && (
        <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-purple-900/30 to-indigo-900/30 backdrop-blur-sm border border-purple-500/20 max-h-36 overflow-y-auto">
          {/* Sticky header added for better UX during scroll */}
          <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider sticky top-0 bg-purple-900/50 p-2 -m-2 z-10">
            Enrolled Students:
          </h4>
          <div className="flex flex-wrap gap-2">
            {selectedStudents.map((student) => (
              <span
                key={student.id}
                className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-purple-600/70 to-pink-600/70 text-white text-sm font-medium rounded-full shadow-lg backdrop-blur-sm"
              >
                {student.firstName} {student.lastName}
                <button
                  type="button"
                  onClick={() => toggleStudent(student.id)}
                  className="w-4 h-4 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                >
                  <svg
                    className="w-2.5 h-2.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

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

  // State for Student Enrollment
  const [availableStudents, setAvailableStudents] = useState<Student[]>([]);
  const [selectedStudentIds, setSelectedStudentIds] = useState<number[]>([]);

  const [newTopicId, setNewTopicId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Effect: Fetch students when the component mounts
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        // Calls the backend endpoint to get all students
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
      const topicData = {
        topicName: topicTitle
          .trim()
          .toLowerCase()
          .replaceAll(/[^a-z0-9]+/g, "-"),
        title: topicTitle.trim(),
        content: topicInfo.trim(),
        studentIds: selectedStudentIds, // Sending the selected IDs
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
      // Form onSubmit handles the entire submission flow
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

        <div className="mt-6">
          <div className="text-2xl font-bold text-white mb-4 uppercase tracking-wider">
            ENROLL STUDENTS
          </div>
          <MultiSelectDropdown
            options={availableStudents}
            selected={selectedStudentIds}
            onChange={setSelectedStudentIds}
            disabled={isLoading}
          />
        </div>

        {/* The z-50 is kept for safety, but the dropdown opening upwards is the main fix */}
        <div className="w-full mt-8 relative z-50">
          {/* The ActionBanner button must have type="submit" to trigger the form */}
          <ActionBanner
            title={isLoading ? "POSTING TOPIC..." : "POST NEW TOPIC"}
            href="#"
            Icon={PostIcon}
            gradient="from-[#8A2BE2] to-[#FF00FF]"
            className={`mt-8 ${
              isLoading ? "opacity-50 cursor-not-allowed" : "hover:scale-[1.02]"
            } transition-all`}
            // The form's onSubmit handles the logic, this is a dummy function:
            onClick={() => {}}
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
