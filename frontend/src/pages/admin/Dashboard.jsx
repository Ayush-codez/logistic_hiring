// src/components/admin/Dashboard.jsx
import React, { useState, useEffect } from "react";
import useAdmin from "../../context/useAdmin";

import { Users, Building2 } from "lucide-react";
import DashboardHeader from "../../components/admin/Dashboard";
import NavigationTabs from "../../components/admin/NavigationTabs";
import IndividualCard from "../../components/admin/IndividualCard";
import OrganizationCard from "../../components/admin/OrganizationCard";

const Dashboard = () => {
  const {
    admin,
    individuals,
    organizations,
    fetchAllUsersAndOrganizations,
    logout,
  } = useAdmin();
  const [view, setView] = useState("individuals");

  useEffect(() => {
    fetchAllUsersAndOrganizations();
  }, [fetchAllUsersAndOrganizations]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <DashboardHeader admin={admin} onLogout={logout} />

        <NavigationTabs
          view={view}
          setView={setView}
          individualsCount={individuals.length}
          organizationsCount={organizations.length}
        />

        {/* Content Container */}
        <div className="mt-6">
          {view === "individuals" ? (
            <div>
              <div className="flex items-center gap-3 mb-6 px-2">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Users className="text-white" size={20} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Individual Users
                  </h2>
                  <p className="text-gray-600 text-sm">
                    Manage and view all individual user registrations
                  </p>
                </div>
              </div>

              <IndividualCard individuals={individuals} />
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-3 mb-6 px-2">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Building2 className="text-white" size={20} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Organizations
                  </h2>
                  <p className="text-gray-600 text-sm">
                    View all registered organizations and their candidates
                  </p>
                </div>
              </div>

              {/* Pass the entire organizations array to the new OrganizationCard */}
              <OrganizationCard organizations={organizations} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
