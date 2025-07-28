import React, { useState } from "react";
import axios from "axios";
import { Upload, FileText, Trash2 } from "lucide-react";

const IndividualUpload = ({ onFileChange, onParsedData }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e) => {
    const selected = e.target.files[0];

    if (selected) {
      const isValidType = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ].includes(selected.type);
      const isValidSize = selected.size <= 5 * 1024 * 1024;

      if (!isValidType) {
        setError("Only PDF or DOC files are allowed.");
        setFile(null);
        return;
      }

      if (!isValidSize) {
        setError("File must be less than or equal to 5MB.");
        setFile(null);
        return;
      }

      setFile(selected);
      setError("");
      onFileChange(e); // Update context

      // Parse resume via backend
      const formData = new FormData();
      formData.append("resume", selected);

      try {
        setLoading(true);
        const response = await axios.post(
          "http://localhost:5000/api/individual/parse-resume",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        if (response.data?.success) {
          onParsedData(response.data.data); // Send parsed data up
        }
      } catch (err) {
        console.error("Resume parsing failed:", err);
        setError("Failed to parse resume. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  const removeFile = () => {
    setFile(null);
    setError("");
    onFileChange({ target: { files: [] } });
  };

  return (
    <div className="flex flex-col gap-4 mt-6">
      <label className="font-semibold text-base text-gray-800 mb-1">
        Upload Resume
      </label>
      <div className="relative group border-2 border-blue-400 border-dashed rounded-xl p-6 bg-gradient-to-r from-blue-50 to-blue-100 shadow-md">
        {!file ? (
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100">
              <Upload className="w-6 h-6 text-blue-500" />
            </div>
            <label className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer font-semibold flex items-center gap-2">
              <Upload className="w-4 h-4" /> {loading ? "Parsing..." : "Browse Files"}
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
            <span className="text-xs text-gray-500 mt-2">
              PDF or DOC up to 5MB
            </span>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-4 bg-white rounded-lg px-4 py-3 shadow-sm border">
            <div className="flex items-center gap-2">
              <FileText className="text-blue-600 w-5 h-5" />
              <span className="text-sm font-medium text-gray-700 truncate max-w-[200px]">
                {file.name}
              </span>
            </div>
            <button
              onClick={removeFile}
              className="text-red-500 hover:text-red-700"
              title="Remove File"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
      {error && <span className="text-sm text-red-600 mt-1">{error}</span>}
    </div>
  );
};

export default IndividualUpload;
