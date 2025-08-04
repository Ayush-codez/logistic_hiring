// src/components/admin/NavigationTabs.jsx
import { Users, Building2 } from "lucide-react";

const NavigationTabs = ({
  view,
  setView,
  individualsCount,
  organizationsCount,
}) => {
  return (
    <div className="flex gap-4 mb-8">
      <button
        onClick={() => setView("individuals")}
        className={`flex items-center gap-3 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
          view === "individuals"
            ? "bg-blue-600 text-white shadow-lg transform scale-105"
            : "bg-white text-gray-600 hover:bg-gray-50 shadow-md hover:shadow-lg"
        }`}
      >
        <Users size={20} />
        Individual Users
        <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-sm font-bold">
          {individualsCount}
        </span>
      </button>

      <button
        onClick={() => setView("organizations")}
        className={`flex items-center gap-3 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
          view === "organizations"
            ? "bg-purple-600 text-white shadow-lg transform scale-105"
            : "bg-white text-gray-600 hover:bg-gray-50 shadow-md hover:shadow-lg"
        }`}
      >
        <Building2 size={20} />
        Organizations
        <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded-full text-sm font-bold">
          {organizationsCount}
        </span>
      </button>
    </div>
  );
};

export default NavigationTabs;
