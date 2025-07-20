
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import IndividualUpload from "../components/IndividualUpload";
// import CommonFields from "../components/CommonFields";
// import OrganizationUpload from "../components/OrganizationUpload";

// const RegistrationForm = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     type: "Individual",
//     description: "",
//   });

//   const [resumeFile, setResumeFile] = useState(null);

//   const [skills, setSkills] = useState([]);
//   const [experience, setExperience] = useState(0);
//   const [companySize, setCompanySize] = useState("");
//   const [website, setWebsite] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // You can do form validation here if needed

//     // Redirect to success page
//     navigate("/success");
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100 flex items-center justify-center py-10">
//       <form
//         onSubmit={handleSubmit}
//         className="w-full max-w-3xl mx-auto p-8 bg-white/90 shadow-2xl rounded-3xl space-y-8 border border-blue-100"
//       >
//         <div className="flex items-center gap-3 mb-6">
//           <div className="bg-blue-600 rounded-full p-3 shadow-lg">
//             <svg
//               className="w-7 h-7 text-white"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth={2}
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//               />
//             </svg>
//           </div>
//           <h2 className="text-2xl font-bold text-blue-800 tracking-tight">
//             Hiring Registration Form
//           </h2>
//         </div>

//         <div className="space-y-6">
//           <CommonFields formData={formData} handleChange={handleChange} />

//           {formData.type === "Individual" ? (
//             <IndividualUpload
//               onFileChange={(e) => setResumeFile(e.target.files[0])}
//               onSkillsChange={setSkills}
//               onExperienceChange={setExperience}
//             />
//           ) : (
//             <OrganizationUpload
//               onFileChange={(e) => setResumeFile(e.target.files[0])}
//               onCompanySizeChange={setCompanySize}
//               onWebsiteChange={setWebsite}
//             />
//           )}
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200 text-white py-3 px-4 rounded-xl text-base font-semibold shadow-md mt-6 tracking-wide"
//         >
//           Submit Form
//         </button>
//       </form>
//     </div>
//   );
// };

// export default RegistrationForm;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import IndividualUpload from "../components/IndividualUpload";
import CommonFields from "../components/CommonFields";
import OrganizationUpload from "../components/OrganizationUpload";

const RegistrationForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    type: "Individual",
    description: "",
  });

  const [resumeFile, setResumeFile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [experience, setExperience] = useState(0);
  const [companySize, setCompanySize] = useState("");
  const [website, setWebsite] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("type", formData.type);
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("description", formData.description);
    if (resumeFile) data.append("file", resumeFile);

    if (formData.type === "Individual") {
      skills.forEach((skill) => data.append("skills[]", skill));
      data.append("experience", experience);
    } else {
      data.append("companySize", companySize);
      data.append("website", website);
    }

    try {
      const response = await fetch("http://localhost:5000/api/submit", {
        method: "POST",
        body: data,
      });

      const result = await response.json();

      if (response.ok) {
        // Redirect to success page
        navigate("/success");
      } else {
        alert(`Submission failed: ${result.message}`);
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert("An error occurred while submitting the form.");
    }
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
              onSkillsChange={setSkills}
              onExperienceChange={setExperience}
            />
          ) : (
            <OrganizationUpload
              onFileChange={(e) => setResumeFile(e.target.files[0])}
              onCompanySizeChange={setCompanySize}
              onWebsiteChange={setWebsite}
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
