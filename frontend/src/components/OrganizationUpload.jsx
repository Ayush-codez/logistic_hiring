import React from "react";
import { Plus } from "lucide-react";
import CandidateUploadBlock from "./CandidateUploadBlock";

const OrganizationUpload = ({ candidates, setCandidates }) => {
  const handleAddCandidate = () => {
    setCandidates([
      ...candidates,
      {
        candidateName: "",
        candidateEmail: "",
        role: "",
        experience: "",
        file: null,
      },
    ]);
  };

  const handleChange = (index, field, value) => {
    const newList = [...candidates];
    newList[index][field] = value;
    setCandidates(newList);
  };

  const handleRemove = (index) => {
    const updated = [...candidates];
    updated.splice(index, 1);
    setCandidates(updated);
  };

  return (
    <div className="flex flex-col gap-6 mt-6 bg-gradient-to-br from-blue-50 to-white p-8 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-blue-700 mb-2">
        Upload Candidates
      </h2>
      {candidates.map((c, i) => (
        <div
          key={i}
          className="bg-white rounded-lg shadow-md p-6 mb-2 border border-blue-100 transition-transform hover:scale-[1.01]"
        >
          <CandidateUploadBlock
            index={i}
            candidate={c}
            onChange={handleChange}
            onRemove={handleRemove}
          />
        </div>
      ))}
      <button
        type="button"
        onClick={handleAddCandidate}
        className="flex items-center gap-2 self-start bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-4 py-2 rounded-lg shadow transition-all duration-150"
      >
        <Plus className="w-4 h-4" /> Add Candidate
      </button>
    </div>
  );
};

export default OrganizationUpload;
