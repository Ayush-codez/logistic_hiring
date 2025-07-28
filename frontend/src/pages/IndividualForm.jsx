import React, { useEffect } from "react";
import CommonFields from "../components/CommonFields";
import IndividualUpload from "../components/IndividualUpload";
import { useForm } from "../context/FormContext";

const IndividualForm = () => {
  const {
    formData,
    handleChange,
    setResumeFile,
    handleIndividualSubmit,
    resetForm,
  } = useForm();

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setResumeFile(file);
  };

  const handleParsedData = (parsed) => {
    // Loop through each field and update formData
    if (parsed.name) handleChange({ target: { name: "name", value: parsed.name } });
    if (parsed.email) handleChange({ target: { name: "email", value: parsed.email } });
    if (parsed.phone) handleChange({ target: { name: "phone", value: parsed.phone } });
    if (parsed.skills) handleChange({ target: { name: "skills", value: parsed.skills.join(", ") } });
    if (parsed.description) handleChange({ target: { name: "description", value: parsed.description } });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6 flex justify-center items-start">
      <form
        onSubmit={handleIndividualSubmit}
        className="w-full max-w-3xl bg-white p-8 rounded-2xl shadow-lg"
      >
        <h2 className="text-2xl font-bold text-blue-700 mb-6">
          Individual Registration
        </h2>

        <CommonFields formData={formData} handleChange={handleChange} />
        <IndividualUpload
          onFileChange={handleFileChange}
          onParsedData={handleParsedData}
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

export default IndividualForm;
