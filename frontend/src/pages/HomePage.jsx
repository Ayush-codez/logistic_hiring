import React from "react";
import { useNavigate } from "react-router-dom";
import { User, Building2, Shield } from "lucide-react";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-500 via-blue-400 to-cyan-300 relative overflow-hidden px-4 py-8">
      {/* Decorative Circles */}
      <div className="absolute top-0 left-0 w-48 h-48 sm:w-72 sm:h-72 bg-indigo-300 opacity-30 rounded-full blur-2xl -z-10" />
      <div className="absolute bottom-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-cyan-200 opacity-40 rounded-full blur-2xl -z-10" />

      <div className="bg-white/90 backdrop-blur-lg p-6 sm:p-8 md:p-12 rounded-3xl shadow-2xl flex flex-col gap-6 sm:gap-8 items-center w-full max-w-sm sm:max-w-md md:max-w-lg border border-blue-100">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-500 to-cyan-500 mb-2 text-center">
          Welcome!
        </h1>
        <p className="text-base sm:text-lg text-gray-600 mb-2 sm:mb-4 text-center px-2">
          Choose how you want to register and start your journey.
        </p>
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full">
            <button
              onClick={() => navigate("/individual")}
              className="group w-full sm:w-1/2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white font-bold rounded-xl flex items-center justify-center gap-3 shadow-lg transition-all duration-200 border-2 border-transparent hover:border-indigo-700"
            >
              <span className="bg-white/20 p-2 rounded-full group-hover:bg-white/30 transition">
                <User className="w-5 h-5 sm:w-6 sm:h-6" />
              </span>
              <span className="text-base sm:text-lg">Individual</span>
            </button>
            <button
              onClick={() => navigate("/organization")}
              className="group w-full sm:w-1/2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-green-400 to-cyan-400 hover:from-green-500 hover:to-cyan-500 text-white font-bold rounded-xl flex items-center justify-center gap-3 shadow-lg transition-all duration-200 border-2 border-transparent hover:border-green-600"
            >
              <span className="bg-white/20 p-2 rounded-full group-hover:bg-white/30 transition">
                <Building2 className="w-5 h-5 sm:w-6 sm:h-6" />
              </span>
              <span className="text-base sm:text-lg">Organization</span>
            </button>
          </div>

          {/* admin  */}
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="group w-full px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold rounded-xl flex items-center justify-center gap-3 shadow-lg transition-all duration-200 border-2 border-transparent hover:border-purple-700"
          >
            <span className="bg-white/20 p-2 rounded-full group-hover:bg-white/30 transition">
              <Shield className="w-5 h-5 sm:w-6 sm:h-6" />
            </span>
            <span className="text-base sm:text-lg">Admin</span>
          </button>
        </div>
        <div className="mt-4 sm:mt-6 text-xs sm:text-sm text-gray-400 text-center">
          Powered by{" "}
          <span className="font-semibold text-blue-500">Logistic Hiring</span>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
