// src/components/admin/DashboardHeader.jsx
import { LogOut } from "lucide-react";

const DashboardHeader = ({ admin, onLogout }) => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white p-6 rounded-xl shadow-lg mb-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-blue-100">Welcome back, {admin?.name}!</p>
        </div>
        <button
          onClick={onLogout}
          className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors duration-200"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default DashboardHeader;
