// import React, { useState } from "react";
// import { Upload, FileText, Trash2 } from "lucide-react";

// const IndividualUpload = ({ onFileChange }) => {
//   const [file, setFile] = useState(null);
//   const [error, setError] = useState("");

//   const handleFileChange = (e) => {
//     const selected = e.target.files[0];
//     if (selected) {
//       const isValidType = [
//         "application/pdf",
//         "application/msword",
//         "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//       ].includes(selected.type);
//       const isValidSize = selected.size <= 5 * 1024 * 1024;

//       if (!isValidType) {
//         setError("Only PDF or DOC files are allowed.");
//         setFile(null);
//         return;
//       }

//       if (!isValidSize) {
//         setError("File must be less than or equal to 5MB.");
//         setFile(null);
//         return;
//       }

//       setFile(selected);
//       setError("");
//       onFileChange(e); // Propagate to parent
//     }
//   };

//   const removeFile = () => {
//     setFile(null);
//     setError("");
//     onFileChange({ target: { files: [] } }); // clear in parent too
//   };

//   return (
//     <div className="flex flex-col gap-3 mt-6">
//       <label className="font-semibold text-base text-gray-800 mb-1">
//         Upload Resume
//       </label>

//       <div className="relative group border-2 border-blue-400 border-dashed rounded-xl p-6 bg-gradient-to-r from-blue-50 to-blue-100 shadow-md transition-all duration-300 hover:shadow-lg hover:border-blue-600">
//         {!file ? (
//           <div className="flex flex-col items-center justify-center gap-2">
//             <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 group-hover:bg-blue-200 transition-colors">
//               <Upload className="w-6 h-6 text-blue-500" />
//             </div>
//             <span className="text-gray-700 text-sm font-medium">
//               Drag & drop your file here, or
//             </span>
//             <label className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer font-semibold shadow hover:bg-blue-600 transition-colors flex items-center gap-2">
//               <Upload className="w-4 h-4" /> Browse Files
//               <input
//                 type="file"
//                 accept=".pdf,.doc,.docx"
//                 onChange={handleFileChange}
//                 className="hidden"
//               />
//             </label>
//             <span className="text-xs text-gray-500 mt-2">
//               PDF or DOC up to 5MB
//             </span>
//           </div>
//         ) : (
//           <div className="flex items-center justify-between gap-4 bg-white rounded-lg px-4 py-3 shadow-sm border">
//             <div className="flex items-center gap-2">
//               <FileText className="text-blue-600 w-5 h-5" />
//               <span className="text-sm font-medium text-gray-700 truncate max-w-[200px]">
//                 {file.name}
//               </span>
//             </div>
//             <button
//               onClick={removeFile}
//               className="text-red-500 hover:text-red-700 transition-colors"
//               title="Remove File"
//             >
//               <Trash2 className="w-5 h-5" />
//             </button>
//           </div>
//         )}
//       </div>

//       {error && <span className="text-sm text-red-600 mt-1">{error}</span>}
//     </div>
//   );
// };

// export default IndividualUpload;

import React, { useState } from "react";
import { Upload, FileText, Trash2 } from "lucide-react";

const IndividualUpload = ({ onFileChange, onSkillsChange, onExperienceChange }) => {
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
      onFileChange(e); // Lift to parent
    }
  };

  const removeFile = () => {
    setFile(null);
    setError("");
    onFileChange({ target: { files: [] } });
  };

  return (
    <div className="flex flex-col gap-4 mt-6">
      {/* Skills Input */}
      <div>
        <label className="font-semibold text-base text-gray-800 mb-1">Skills</label>
        <input
          type="text"
          placeholder="E.g., JavaScript, Node.js, React"
          className="w-full border rounded-md px-3 py-2"
          onChange={(e) => onSkillsChange(e.target.value.split(",").map(skill => skill.trim()))}
        />
        <span className="text-xs text-gray-500">Comma-separated values</span>
      </div>

      {/* Experience Input */}
      <div>
        <label className="font-semibold text-base text-gray-800 mb-1">Years of Experience</label>
        <input
          type="number"
          className="w-full border rounded-md px-3 py-2"
          min="0"
          onChange={(e) => onExperienceChange(Number(e.target.value))}
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

export default IndividualUpload;

