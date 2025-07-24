// CommonFields.jsx
import React from "react";
import FormField from "./FormField";

const CommonFields = ({ formData, handleChange, type }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-8 rounded-2xl shadow-xl">
      <FormField
        label={type === "org" ? "Organization Name" : "Full Name"}
        name="name"
        icon="name"
        value={formData.name}
        onChange={handleChange}
        placeholder={
          type === "org"
            ? "Enter your Organisation name"
            : "Enter your full name"
        }
      />
      <FormField
        label="Email"
        name="email"
        icon="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="you@example.com"
      />
      <FormField
        label="Phone"
        name="phone"
        icon="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="+91 9876543210"
      />

      {/* Description Field */}
      <div className="col-span-full">
        <label className="font-semibold text-sm text-blue-700">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter description of the service you require"
          className="border-2 border-blue-200 rounded-xl px-3 py-3 w-full text-sm bg-gray-50 focus:border-blue-500 transition resize-none min-h-[100px]"
        />
      </div>
    </div>
  );
};

export default CommonFields;
