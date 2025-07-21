import React, { useState } from "react";
import CommonFields from "../components/CommonFields";
import IndividualUpload from "../components/IndividualUpload";

const IndividualForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    type: "Individual",
    description: "",
    resume: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, resume: file });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting Individual Data:", formData);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6 flex justify-center items-start">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-white p-8 rounded-2xl shadow-lg"
      >
        <h2 className="text-2xl font-bold text-blue-700 mb-6">
          Individual Registration
        </h2>

        <CommonFields formData={formData} handleChange={handleChange} />
        <IndividualUpload onFileChange={handleFileChange} />
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

export default IndividualForm;
