// FormField.jsx
import React from "react";
import { User, Building, Mail, Phone } from "lucide-react";

const iconMap = {
  name: <User className="w-5 h-5 text-blue-600" />,
  organization: <Building className="w-5 h-5 text-blue-600" />,
  email: <Mail className="w-5 h-5 text-green-600" />,
  phone: <Phone className="w-5 h-5 text-pink-600" />,
};

const FormField = ({
  label,
  name,
  type = "text",
  icon,
  value,
  onChange,
  placeholder,
}) => (
  <div className="flex flex-col gap-1">
    <label className="font-semibold text-sm text-blue-700">{label}</label>
    <div className="flex items-center gap-2 border rounded-xl px-3 py-2 shadow-sm bg-white">
      {iconMap[icon]}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full outline-none bg-transparent text-sm"
      />
    </div>
  </div>
);

export default FormField;
