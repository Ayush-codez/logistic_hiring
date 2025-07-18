import React from "react";
import { Trash2, Upload } from "lucide-react";

const CandidateUploadBlock = ({ index, candidate, onChange, onRemove }) => (
  <div className="relative bg-gradient-to-br from-blue-50 to-purple-100 border border-blue-200 shadow-lg p-6 rounded-2xl space-y-4 transition-transform hover:scale-[1.02]">
    <button
      type="button"
      className="absolute top-3 right-3 text-red-500 hover:bg-red-100 rounded-full p-1 transition-colors"
      onClick={() => onRemove(index)}
      title="Remove Candidate"
    >
      <Trash2 className="w-5 h-5" />
    </button>
    <div className="flex flex-col gap-3">
      <input
        type="text"
        name="candidateName"
        placeholder="Candidate Name"
        value={candidate.candidateName}
        onChange={(e) => onChange(index, "candidateName", e.target.value)}
        className="border border-blue-200 px-3 py-2 rounded-lg w-full text-base focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white shadow-sm"
      />
      <input
        type="email"
        name="candidateEmail"
        placeholder="Candidate Email"
        value={candidate.candidateEmail}
        onChange={(e) => onChange(index, "candidateEmail", e.target.value)}
        className="border border-blue-200 px-3 py-2 rounded-lg w-full text-base focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white shadow-sm"
      />
      <input
        type="text"
        name="role"
        placeholder="Role"
        value={candidate.role}
        onChange={(e) => onChange(index, "role", e.target.value)}
        className="border border-blue-200 px-3 py-2 rounded-lg w-full text-base focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white shadow-sm"
      />
      <input
        type="number"
        name="experience"
        placeholder="Years of Experience"
        value={candidate.experience}
        onChange={(e) => onChange(index, "experience", e.target.value)}
        className="border border-blue-200 px-3 py-2 rounded-lg w-full text-base focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white shadow-sm"
      />
      <label className="cursor-pointer text-blue-600 font-medium flex items-center gap-2 bg-blue-100 hover:bg-blue-200 transition-colors px-4 py-2 rounded-lg shadow-inner w-fit">
        <Upload className="w-5 h-5" />
        {candidate.file ? (
          <span className="truncate max-w-[120px] text-blue-700">
            {candidate.file.name}
          </span>
        ) : (
          "Upload Resume"
        )}
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => onChange(index, "file", e.target.files[0])}
          className="hidden"
        />
      </label>
    </div>
  </div>
);

export default CandidateUploadBlock;
