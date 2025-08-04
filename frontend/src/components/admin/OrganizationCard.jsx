/* eslint-disable no-unused-vars */
// src/components/admin/OrganizationCard.jsx
import {
  Building2,
  Mail,
  User,
  Download,
  Users,
  Eye,
  ChevronDown,
  ChevronUp,
  Phone,
  FileText,
} from "lucide-react";
import { useState } from "react";

const OrganizationCard = ({ organizations }) => {
  const [expandedOrgs, setExpandedOrgs] = useState(new Set());

  const toggleExpanded = (orgId) => {
    const newExpanded = new Set(expandedOrgs);
    if (newExpanded.has(orgId)) {
      newExpanded.delete(orgId);
    } else {
      newExpanded.add(orgId);
    }
    setExpandedOrgs(newExpanded);
  };

  return (
    <div className="space-y-6">
      {/* Desktop View */}
      <div className="hidden lg:block">
        {organizations.map((org, orgIndex) => (
          <div
            key={org._id}
            className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 mb-6"
          >
            {/* Organization Header */}
            <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
                    <Building2 className="text-white" size={28} />
                  </div>
                  <div>
                    <h3 className="font-bold text-2xl text-white mb-1">
                      {org.name}
                    </h3>
                    <div className="flex items-center gap-2 text-white/90">
                      <Mail size={16} />
                      <span className="font-medium">{org.email}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl">
                    <p className="text-white/90 text-sm font-medium">
                      Total Candidates
                    </p>
                    <p className="text-white text-2xl font-bold">
                      {org.candidates?.length || 0}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Candidates Table */}
            {org.candidates?.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left font-semibold text-gray-700 text-sm uppercase tracking-wider">
                        #
                      </th>
                      <th className="px-6 py-4 text-left font-semibold text-gray-700 text-sm uppercase tracking-wider">
                        Candidate
                      </th>
                      <th className="px-6 py-4 text-left font-semibold text-gray-700 text-sm uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-4 text-center font-semibold text-gray-700 text-sm uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {org.candidates.map((candidate, index) => (
                      <tr
                        key={candidate._id}
                        className="hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 transition-all duration-300 group"
                      >
                        <td className="px-6 py-5">
                          <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-full font-bold text-sm shadow-md">
                            {index + 1}
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full flex items-center justify-center">
                              <User size={18} className="text-white" />
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900 text-base">
                                {candidate.candidateName}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-2 text-gray-600">
                            <Mail size={14} className="text-purple-500" />
                            <span className="text-sm font-medium">
                              {candidate.candidateEmail}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3 justify-center">
                            <button
                              onClick={() =>
                                window.open(candidate.file, "_blank")
                              }
                              className="group/btn bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white p-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                              title="View Resume"
                            >
                              <Eye
                                size={16}
                                className="group-hover/btn:scale-110 transition-transform"
                              />
                            </button>
                            <a
                              href={candidate.file}
                              download
                              target="_blank"
                              rel="noreferrer"
                              className="group/btn flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-4 py-3 rounded-xl transition-all duration-300 text-sm font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                              title="Download Resume"
                            >
                              <Download
                                size={14}
                                className="group-hover/btn:scale-110 transition-transform"
                              />
                              Download
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="mx-auto w-16 h-16 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-4">
                  <Users className="text-gray-400" size={24} />
                </div>
                <p className="text-gray-500 text-base">
                  No candidates found for this organization
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile View */}
      <div className="lg:hidden space-y-6">
        {organizations.map((org, orgIndex) => (
          <div
            key={org._id}
            className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
          >
            {/* Organization Header Mobile */}
            <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
                  <Building2 className="text-white" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-xl text-white mb-1">
                    {org.name}
                  </h3>
                  <div className="flex items-center gap-2 text-white/90">
                    <Mail size={14} />
                    <span className="text-sm font-medium break-all">
                      {org.email}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <p className="text-white/90 text-sm font-medium">
                    Candidates: {org.candidates?.length || 0}
                  </p>
                </div>
                {org.candidates?.length > 0 && (
                  <button
                    onClick={() => toggleExpanded(org._id)}
                    className="bg-white/20 backdrop-blur-sm p-2 rounded-lg hover:bg-white/30 transition-colors"
                  >
                    {expandedOrgs.has(org._id) ? (
                      <ChevronUp className="text-white" size={20} />
                    ) : (
                      <ChevronDown className="text-white" size={20} />
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Mobile Candidates List */}
            {org.candidates?.length > 0 && expandedOrgs.has(org._id) && (
              <div className="divide-y divide-gray-100">
                {org.candidates.map((candidate, index) => (
                  <div
                    key={candidate._id}
                    className="p-6 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-full font-bold text-sm shadow-lg flex items-center justify-center">
                          {index + 1}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 text-base">
                            {candidate.candidateName}
                          </h4>
                        </div>
                      </div>
                    </div>

                    {/* Contact Information Mobile */}
                    <div className="mb-4">
                      <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                        <Mail
                          size={16}
                          className="text-purple-500 flex-shrink-0"
                        />
                        <span className="text-sm font-medium text-gray-700 break-all">
                          {candidate.candidateEmail}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons Mobile */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={() => window.open(candidate.file, "_blank")}
                        className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white py-3 px-4 rounded-xl transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                      >
                        <Eye size={16} />
                        View Resume
                      </button>
                      <a
                        href={candidate.file}
                        download
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white py-3 px-4 rounded-xl transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                      >
                        <Download size={16} />
                        Download Resume
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Empty State for Mobile */}
            {org.candidates?.length === 0 && (
              <div className="text-center py-8 px-6">
                <div className="mx-auto w-16 h-16 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-4">
                  <Users className="text-gray-400" size={24} />
                </div>
                <p className="text-gray-500 text-sm">No candidates found</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Global Empty State */}
      {organizations.length === 0 && (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="text-center py-16 px-6">
            <div className="mx-auto w-24 h-24 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-6">
              <Building2 className="text-gray-400" size={40} />
            </div>
            <h3 className="text-gray-700 text-xl font-semibold mb-2">
              No Organizations Found
            </h3>
            <p className="text-gray-500 text-base max-w-md mx-auto leading-relaxed">
              There are currently no organizations registered in the system. New
              organizations will appear here once they register.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrganizationCard;
