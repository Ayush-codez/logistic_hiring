// CommonFields.jsx
import React from "react";
import FormField from "./FormField";
import { Users } from "lucide-react";

const CommonFields = ({ formData, handleChange }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-8 rounded-2xl shadow-xl">
    <FormField
      label="Full Name / Org Name"
      name="name"
      icon="name"
      value={formData.name}
      onChange={handleChange}
      placeholder="Enter your full name or company name"
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

    {/* Improved Dropdown Styled Like Inputs */}
    <div className="flex flex-col gap-1">
      <label className="font-semibold text-sm text-blue-700">Type</label>
      <div className="flex items-center gap-2 border rounded-xl px-3 py-2 shadow-sm bg-white">
        <Users className="w-5 h-5 text-purple-600" />
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full outline-none bg-transparent text-sm text-gray-700"
        >
          <option value="Individual">Individual</option>
          <option value="Organization">Organization</option>
        </select>
      </div>
    </div>

    {/* Description Field */}
    <div className="col-span-full">
      <label className="font-semibold text-sm text-blue-700">Description</label>
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

export default CommonFields;
