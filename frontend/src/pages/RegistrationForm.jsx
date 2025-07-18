import React, { useState } from "react";
import IndividualUpload from "../components/IndividualUpload";
import CommonFields from "../components/CommonFields";
import OrganizationUpload from "../components/OrganizationUpload";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    type: "Individual",
    description: "",
  });
  const [resumeFile, setResumeFile] = useState(null);
  const [candidates, setCandidates] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted", formData, resumeFile, candidates);
    // Add form submission logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100 flex items-center justify-center py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl mx-auto p-8 bg-white/90 shadow-2xl rounded-3xl space-y-8 border border-blue-100"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-blue-600 rounded-full p-3 shadow-lg">
            <svg
              className="w-7 h-7 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-blue-800 tracking-tight">
            Hiring Registration Form
          </h2>
        </div>
        <div className="space-y-6">
          <CommonFields formData={formData} handleChange={handleChange} />
          {formData.type === "Individual" ? (
            <IndividualUpload
              onFileChange={(e) => setResumeFile(e.target.files[0])}
            />
          ) : (
            <OrganizationUpload
              candidates={candidates}
              setCandidates={setCandidates}
            />
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200 text-white py-3 px-4 rounded-xl text-base font-semibold shadow-md mt-6 tracking-wide"
        >
          Submit Form
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
