import React from "react";
import { useNavigate } from "react-router-dom";
import { User, Building2 } from "lucide-react";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 p-6">
      <div className="bg-white p-10 rounded-2xl shadow-xl flex flex-col gap-6 items-center w-full max-w-md">
        <h1 className="text-2xl font-bold text-blue-700">
          Select Registration Type
        </h1>
        <button
          onClick={() => navigate("/individual")}
          className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg flex items-center justify-center gap-2 shadow"
        >
          <User className="w-5 h-5" /> Register as Individual
        </button>
        <button
          onClick={() => navigate("/organization")}
          className="w-full px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg flex items-center justify-center gap-2 shadow"
        >
          <Building2 className="w-5 h-5" /> Register as Organization
        </button>
      </div>
    </div>
  );
};

export default HomePage;
