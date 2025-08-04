import React, { useState, useRef, useEffect } from "react";
import FormField from "./FormField";
import skillsList from "../data/skills";

// Mock FormField component for demo
const MockFormField = ({ label, name, value, onChange, placeholder }) => (
  <div className="space-y-2">
    <label className="font-semibold text-sm text-blue-700">{label}</label>
    <input
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="border-2 border-blue-200 rounded-xl px-3 py-3 w-full text-sm bg-gray-50 focus:border-blue-500 transition"
    />
  </div>
);

const CommonFields = ({ formData, handleChange, type }) => {
  const isOrg = type === "org";
  const [skillInput, setSkillInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSkills, setFilteredSkills] = useState([]);
  const skillInputRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Get current skills as array
  const getCurrentSkills = () => {
    const skillsValue = isOrg ? formData.description : formData.skills;
    return skillsValue
      ? skillsValue
          .split(",")
          .map((skill) => skill.trim())
          .filter((skill) => skill)
      : [];
  };

  // Handle skill input change
  const handleSkillInputChange = (e) => {
    const value = e.target.value;
    setSkillInput(value);

    if (value.trim()) {
      const filtered = skillsList.filter(
        (skill) =>
          skill.toLowerCase().includes(value.toLowerCase()) &&
          !getCurrentSkills().some(
            (existingSkill) =>
              existingSkill.toLowerCase() === skill.toLowerCase()
          )
      );
      setFilteredSkills(filtered.slice(0, 5)); // Show max 5 suggestions
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  // Handle skill selection
  const handleSkillSelect = (selectedSkill) => {
    const currentSkills = getCurrentSkills();
    const newSkills = [...currentSkills, selectedSkill].join(", ");

    // Create synthetic event for consistency with existing handleChange
    const syntheticEvent = {
      target: {
        name: isOrg ? "description" : "skills",
        value: newSkills,
      },
    };

    handleChange(syntheticEvent);
    setSkillInput("");
    setShowSuggestions(false);
    skillInputRef.current?.focus();
  };

  // Handle removing a skill
  const handleRemoveSkill = (skillToRemove) => {
    const currentSkills = getCurrentSkills();
    const newSkills = currentSkills
      .filter((skill) => skill !== skillToRemove)
      .join(", ");

    const syntheticEvent = {
      target: {
        name: isOrg ? "description" : "skills",
        value: newSkills,
      },
    };

    handleChange(syntheticEvent);
  };

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target) &&
        skillInputRef.current &&
        !skillInputRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && filteredSkills.length > 0) {
      e.preventDefault();
      handleSkillSelect(filteredSkills[0]);
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-8 rounded-2xl shadow-xl">
      <MockFormField
        label={isOrg ? "Organization Name" : "Full Name"}
        name="name"
        icon="name"
        value={formData.name || ""}
        onChange={handleChange}
        placeholder={
          isOrg ? "Enter your Organisation name" : "Enter your full name"
        }
      />
      <MockFormField
        label="Email"
        name="email"
        icon="email"
        value={formData.email || ""}
        onChange={handleChange}
        placeholder="you@example.com"
      />
      <MockFormField
        label="Phone"
        name="phone"
        icon="phone"
        value={formData.phone || ""}
        onChange={handleChange}
        placeholder="+91 9876543210"
      />

      {/* Skills/Description Field */}
      <div className="col-span-full">
        <label className="font-semibold text-sm text-blue-700">
          {isOrg ? "Description" : "Skills"}
        </label>

        {isOrg ? (
          // Organization description - regular textarea
          <textarea
            name="description"
            value={formData.description || ""}
            onChange={handleChange}
            placeholder="Enter description of the service you require"
            className="border-2 border-blue-200 rounded-xl px-3 py-3 w-full text-sm bg-gray-50 focus:border-blue-500 transition resize-none min-h-[100px]"
          />
        ) : (
          // Skills section with autocomplete
          <div className="space-y-3">
            {/* Display selected skills as tags */}
            {getCurrentSkills().length > 0 && (
              <div className="flex flex-wrap gap-2">
                {getCurrentSkills().map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="ml-2 text-blue-600 hover:text-blue-800 focus:outline-none"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}

            {/* Skill input with autocomplete */}
            <div className="relative">
              <input
                ref={skillInputRef}
                type="text"
                value={skillInput}
                onChange={handleSkillInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Type to search and add skills (e.g., JavaScript, React, Node.js)"
                className="border-2 border-blue-200 rounded-xl px-3 py-3 w-full text-sm bg-gray-50 focus:border-blue-500 transition"
              />

              {/* Suggestions dropdown */}
              {showSuggestions && filteredSkills.length > 0 && (
                <div
                  ref={suggestionsRef}
                  className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-40 overflow-y-auto"
                >
                  {filteredSkills.map((skill, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleSkillSelect(skill)}
                      className="w-full text-left px-4 py-2 hover:bg-blue-50 focus:bg-blue-50 focus:outline-none text-sm border-b border-gray-100 last:border-b-0"
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Hidden field to maintain compatibility */}
            <input type="hidden" name="skills" value={formData.skills || ""} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CommonFields;
