// src/components/FileDropZone.tsx
import React, { useCallback, useState } from "react";
import { FaFolderOpen, FaFileUpload } from "react-icons/fa";
import api from "../services/api"; // Assuming this is your axios instance

interface FileDropZoneProps {
  topicId: string; // The ID of the newly created topic, passed from the parent
}

const FileDropZone: React.FC<FileDropZoneProps> = ({ topicId }) => {
  const [status, setStatus] = useState<
    "idle" | "uploading" | "complete" | "error"
  >("idle");
  const [fileCount, setFileCount] = useState(0);

  const handleFileChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(event.target.files || []);
      if (files.length === 0) return;

      setFileCount(files.length);
      setStatus("uploading");

      const formData = new FormData();
      files.forEach((file) => {
        // Appending all files under the same key 'files'
        formData.append("files", file);
      });

      try {
        // Post to the new async backend endpoint
        await api.post(`/topics/${topicId}/materials/upload`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setStatus("complete");
        alert(
          `Success! ${files.length} files are now processing in the background.`
        );
      } catch (error) {
        console.error("Upload failed:", error);
        setStatus("error");
        alert("Upload failed. See console for details.");
      }
    },
    [topicId]
  );

  const statusMessage = {
    idle: "Drag and drop files/folder here, or click to select.",
    uploading: `Uploading ${fileCount} files... This may take a moment.`,
    complete: `Upload accepted! ${fileCount} files are now being processed.`,
    error: "Upload failed! Try again.",
  }[status];

  const isUploading = status === "uploading";

  return (
    <div
      className="p-8 text-center border-4 border-dashed rounded-xl transition-colors duration-200 
            border-purple-600 hover:border-purple-400 bg-purple-900 bg-opacity-40"
    >
      <input
        type="file"
        // Key attributes for folder upload support (non-standard but widely supported)
        // Note: The 'multiple' attribute is essential
        webkitdirectory=""
        directory=""
        multiple
        onChange={handleFileChange}
        disabled={isUploading}
        className="hidden"
        id="folder-upload"
      />
      <label htmlFor="folder-upload" className="cursor-pointer block">
        <FaFileUpload
          className={`mx-auto text-5xl mb-3 ${
            isUploading ? "text-yellow-400 animate-pulse" : "text-white"
          }`}
        />
        <p className="text-white font-semibold mb-1">{statusMessage}</p>
        <p className="text-gray-400 text-sm">
          {isUploading ? "DO NOT navigate away" : "Select Folder or Files"}
        </p>
      </label>
    </div>
  );
};

export default FileDropZone;
