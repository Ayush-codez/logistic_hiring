import React, { useState } from "react";
import CommonFields from "../components/CommonFields";
import OrganizationUpload from "../components/OrganizationUpload";

const OrganizationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    type: "Organization",
    description: "",
  });

  const [candidates, setCandidates] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fullData = { ...formData, candidates };
    console.log("Submitting Organization Data:", fullData);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6 flex justify-center items-start">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-white p-8 rounded-2xl shadow-lg"
      >
        <h2 className="text-2xl font-bold text-green-700 mb-6">
          Organization Registration
        </h2>

        <CommonFields formData={formData} handleChange={handleChange} />

        {/* Correctly Pass Candidates Upload Block */}
        <OrganizationUpload
          candidates={candidates}
          setCandidates={setCandidates}
        />

        <button
          type="submit"
          className="mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow block mx-auto"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default OrganizationForm;
