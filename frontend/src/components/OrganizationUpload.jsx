// import React from "react";
// import { Plus } from "lucide-react";
// import CandidateUploadBlock from "./CandidateUploadBlock";

// const OrganizationUpload = ({ candidates, setCandidates }) => {
//   const handleAddCandidate = () => {
//     setCandidates([
//       ...candidates,
//       {
//         candidateName: "",
//         candidateEmail: "",
//         role: "",
//         experience: "",
//         file: null,
//       },
//     ]);
//   };

//   const handleChange = (index, field, value) => {
//     const newList = [...candidates];
//     newList[index][field] = value;
//     setCandidates(newList);
//   };

//   const handleRemove = (index) => {
//     const updated = [...candidates];
//     updated.splice(index, 1);
//     setCandidates(updated);
//   };

//   return (
//     <div className="flex flex-col gap-6 mt-6 bg-gradient-to-br from-blue-50 to-white p-8 rounded-xl shadow-lg">
//       <h2 className="text-2xl font-bold text-blue-700 mb-2">
//         Upload Candidates
//       </h2>
//       {candidates.map((c, i) => (
//         <div
//           key={i}
//           className="bg-white rounded-lg shadow-md p-6 mb-2 border border-blue-100 transition-transform hover:scale-[1.01]"
//         >
//           <CandidateUploadBlock
//             index={i}
//             candidate={c}
//             onChange={handleChange}
//             onRemove={handleRemove}
//           />
//         </div>
//       ))}
//       <button
//         type="button"
//         onClick={handleAddCandidate}
//         className="flex items-center gap-2 self-start bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-4 py-2 rounded-lg shadow transition-all duration-150"
//       >
//         <Plus className="w-4 h-4" /> Add Candidate
//       </button>
//     </div>
//   );
// };

// export default OrganizationUpload;
import React, { useState } from "react";
import { Upload, FileText, Trash2 } from "lucide-react";

const OrganizationUpload = ({ onFileChange, onCompanySizeChange, onWebsiteChange }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
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
      onFileChange(e);
    }
  };

  const removeFile = () => {
    setFile(null);
    setError("");
    onFileChange({ target: { files: [] } });
  };

  return (
    <div className="flex flex-col gap-4 mt-6">
      <div>
        <label className="font-semibold text-base text-gray-800 mb-1">Company Size</label>
        <select
          className="w-full border rounded-md px-3 py-2"
          onChange={(e) => onCompanySizeChange(e.target.value)}
        >
          <option value="">Select Size</option>
          <option value="1-10">1-10 employees</option>
          <option value="11-50">11-50 employees</option>
          <option value="51-200">51-200 employees</option>
          <option value="200+">200+ employees</option>
        </select>
      </div>

      <div>
        <label className="font-semibold text-base text-gray-800 mb-1">Website</label>
        <input
          type="url"
          placeholder="https://example.com"
          className="w-full border rounded-md px-3 py-2"
          onChange={(e) => onWebsiteChange(e.target.value)}
        />
      </div>

      {/* Resume Upload */}
      <label className="font-semibold text-base text-gray-800 mb-1">Upload Resume</label>
      <div className="relative group border-2 border-blue-400 border-dashed rounded-xl p-6 bg-gradient-to-r from-blue-50 to-blue-100 shadow-md">
        {!file ? (
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100">
              <Upload className="w-6 h-6 text-blue-500" />
            </div>
            <label className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer font-semibold flex items-center gap-2">
              <Upload className="w-4 h-4" /> Browse Files
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
            <span className="text-xs text-gray-500 mt-2">PDF or DOC up to 5MB</span>
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

export default OrganizationUpload;
