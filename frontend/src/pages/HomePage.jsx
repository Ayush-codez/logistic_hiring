import React from "react";
import { useNavigate } from "react-router-dom";
import { User, Building2 } from "lucide-react";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-500 via-blue-400 to-cyan-300 relative overflow-hidden">
      {/* Decorative Circles */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-indigo-300 opacity-30 rounded-full blur-2xl -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-200 opacity-40 rounded-full blur-2xl -z-10" />

      <div className="bg-white/90 backdrop-blur-lg p-12 rounded-3xl shadow-2xl flex flex-col gap-8 items-center w-full max-w-lg border border-blue-100">
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-500 to-cyan-500 mb-2">
          Welcome!
        </h1>
        <p className="text-lg text-gray-600 mb-4 text-center">
          Choose how you want to register and start your journey.
        </p>
        <div className="flex flex-row gap-6 w-full">
          <button
            onClick={() => navigate("/individual")}
            className="group w-1/2 px-8 py-4 bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white font-bold rounded-xl flex items-center justify-center gap-3 shadow-lg transition-all duration-200 border-2 border-transparent hover:border-indigo-700"
          >
            <span className="bg-white/20 p-2 rounded-full group-hover:bg-white/30 transition">
              <User className="w-6 h-6" />
            </span>
            <span className="text-lg">Individual</span>
          </button>
          <button
            onClick={() => navigate("/organization")}
            className="group w-1/2 px-8 py-4 bg-gradient-to-r from-green-400 to-cyan-400 hover:from-green-500 hover:to-cyan-500 text-white font-bold rounded-xl flex items-center justify-center gap-3 shadow-lg transition-all duration-200 border-2 border-transparent hover:border-green-600"
          >
            <span className="bg-white/20 p-2 rounded-full group-hover:bg-white/30 transition">
              <Building2 className="w-6 h-6" />
            </span>
            <span className="text-lg">Organization</span>
          </button>
        </div>
        <div className="mt-6 text-sm text-gray-400">
          Powered by{" "}
          <span className="font-semibold text-blue-500">Logistic Hiring</span>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
