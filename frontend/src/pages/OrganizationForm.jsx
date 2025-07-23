import React, { useEffect } from "react";
import CommonFields from "../components/CommonFields";
import OrganizationUpload from "../components/OrganizationUpload";
import { useForm } from "../context/FormContext"; // Import the custom hook

const OrganizationForm = () => {
  // Get everything you need from the context
  const {
    formData,
    handleChange,
    candidates,
    setCandidates,
    handleOrganizationSubmit,
    resetForm,
  } = useForm();

  // Reset form state when component unmounts or before it mounts
  useEffect(() => {
    resetForm();
  }, [resetForm]);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6 flex justify-center items-start">
      <form
        onSubmit={handleOrganizationSubmit} // Use the submit handler from context
        className="w-full max-w-3xl bg-white p-8 rounded-2xl shadow-lg"
      >
        <h2 className="text-2xl font-bold text-green-700 mb-6">
          Organization Registration
        </h2>

        <CommonFields formData={formData} handleChange={handleChange} />

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
