/* eslint-disable react-refresh/only-export-components */
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";
import { useNavigate } from "react-router-dom";

// 1. Create the context
const FormContext = createContext();

// Initial state for the forms
const initialFormData = {
  name: "",
  email: "",
  phone: "",
  description: "",
};

// 2. Create the provider component
export const FormProvider = ({ children }) => {
  const navigate = useNavigate();

  // State for common fields
  const [formData, setFormData] = useState(initialFormData);

  // State for individual form
  const [resumeFile, setResumeFile] = useState(null);

  // State for organization form
  const [candidates, setCandidates] = useState([]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const resetForm = useCallback(() => {
    setFormData(initialFormData);
    setResumeFile(null);
    setCandidates([]);
  }, []);

  //individual submit
  const handleIndividualSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("description", formData.description);
      data.append("resume", resumeFile);

      try {
        const response = await fetch("/api/individual/register", {
          method: "POST",
          body: data,
        });
        const result = await response.json();
        if (response.ok) {
          console.log("Individual form submitted:", result);
          resetForm();
          navigate("/success");
        } else {
          throw new Error(result.message || "Submission failed");
        }
      } catch (err) {
        console.error("Submission error:", err);
        alert(`Error: ${err.message}`);
      }
    },
    [formData, resumeFile, navigate, resetForm]
  );

  //orgamisation submit
  const handleOrganizationSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("description", formData.description);

      const candidatesJSON = candidates.map((c) => ({
        candidateName: c.candidateName,
        candidateEmail: c.candidateEmail,
        role: c.role,
        experience: c.experience,
      }));
      data.append("candidates", JSON.stringify(candidatesJSON));

      candidates.forEach((c) => {
        if (c.file) {
          data.append("files", c.file, c.file.name);
        }
      });

      try {
        const response = await fetch("/api/organization/register", {
          method: "POST",
          body: data,
        });
        const result = await response.json();
        if (response.ok) {
          console.log("Organization form submitted:", result);
          resetForm();
          navigate("/success");
        } else {
          throw new Error(result.message || "Submission failed");
        }
      } catch (err) {
        console.error("Submission error:", err);
        alert(`Error: ${err.message}`);
      }
    },
    [formData, candidates, navigate, resetForm]
  );

  // Memoize the context value object itself to prevent unnecessary re-renders of consumers
  const value = useMemo(
    () => ({
      formData,
      handleChange,
      resumeFile,
      setResumeFile,
      candidates,
      setCandidates,
      handleIndividualSubmit,
      handleOrganizationSubmit,
      resetForm,
    }),
    [
      formData,
      handleChange,
      resumeFile,
      candidates,
      handleIndividualSubmit,
      handleOrganizationSubmit,
      resetForm,
    ]
  );

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};

// 4. Create a custom hook to use the context easily
export const useForm = () => {
  const context = useContext(FormContext);

  // Throw an error if the hook is used outside of the FormProvider
  if (context === undefined) {
    throw new Error("useForm must be used within a FormProvider");
  }

  return context;
};
