// src/components/admin/IndividualCard.jsx
import {
  User,
  Mail,
  Download,
  Users,
  Eye,
  Phone,
  FileText,
  Code,
} from "lucide-react";

const IndividualCard = ({ individuals }) => {
  // Function to render skill tags
  const renderSkillTags = (skills, isMobile = false) => {
    if (!skills || skills.length === 0) {
      return (
        <span
          className={`text-gray-400 italic ${isMobile ? "text-sm" : "text-xs"}`}
        >
          No skills available
        </span>
      );
    }

    const maxVisibleSkills = isMobile ? 6 : 4;
    const visibleSkills = skills.slice(0, maxVisibleSkills);
    const remainingCount = skills.length - maxVisibleSkills;

    return (
      <div className={`flex flex-wrap gap-1.5 ${isMobile ? "gap-2" : ""}`}>
        {visibleSkills.map((skill, index) => (
          <span
            key={index}
            className={`inline-flex items-center px-2.5 py-1 rounded-full font-medium bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-200 hover:from-blue-100 hover:to-indigo-100 transition-colors duration-200 ${
              isMobile ? "text-xs px-3 py-1.5" : "text-xs"
            }`}
          >
            {skill}
          </span>
        ))}
        {remainingCount > 0 && (
          <span
            className={`inline-flex items-center px-2.5 py-1 rounded-full font-medium bg-gradient-to-r from-gray-50 to-gray-100 text-gray-600 border border-gray-200 ${
              isMobile ? "text-xs px-3 py-1.5" : "text-xs"
            }`}
            title={`${remainingCount} more skills: ${skills
              .slice(maxVisibleSkills)
              .join(", ")}`}
          >
            +{remainingCount} more
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 text-white">
            <tr>
              <th className="px-6 py-5 text-left font-semibold text-sm uppercase tracking-wider">
                #
              </th>
              <th className="px-6 py-5 text-left font-semibold text-sm uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-5 text-left font-semibold text-sm uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-5 text-left font-semibold text-sm uppercase tracking-wider min-w-[250px]">
                Skills
              </th>
              <th className="px-6 py-5 text-center font-semibold text-sm uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {individuals.map((user, index) => (
              <tr
                key={user._id}
                className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 group"
              >
                <td className="px-6 py-5">
                  <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full font-bold text-sm shadow-lg">
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
                        {user.name || "N/A"}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Mail size={14} className="text-blue-500" />
                      <span className="text-sm font-medium">
                        {user.email || "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Phone size={14} className="text-green-500" />
                      <span className="text-sm font-medium">
                        {user.phone || "N/A"}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="max-w-sm">{renderSkillTags(user.skills)}</div>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3 justify-center">
                    <button
                      onClick={() => window.open(user.resumeUrl, "_blank")}
                      className="group/btn bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white p-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                      title="View Resume"
                    >
                      <Eye
                        size={16}
                        className="group-hover/btn:scale-110 transition-transform"
                      />
                    </button>
                    <a
                      href={user.resumeUrl}
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

      {/* Mobile Card View */}
      <div className="lg:hidden">
        <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 px-6 py-5">
          <h3 className="text-white font-semibold text-lg flex items-center gap-2">
            <Users size={20} />
            Individual Users ({individuals.length})
          </h3>
        </div>
        <div className="divide-y divide-gray-100">
          {individuals.map((user, index) => (
            <div
              key={user._id}
              className="p-6 hover:bg-gray-50 transition-colors duration-200"
            >
              {/* User Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full font-bold text-sm shadow-lg flex items-center justify-center">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-lg">
                      {user.name || "N/A"}
                    </h4>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <Mail size={16} className="text-blue-500 flex-shrink-0" />
                  <span className="text-sm font-medium text-gray-700 break-all">
                    {user.email || "N/A"}
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <Phone size={16} className="text-green-500 flex-shrink-0" />
                  <span className="text-sm font-medium text-gray-700">
                    {user.phone || "N/A"}
                  </span>
                </div>
              </div>

              {/* Skills Section */}
              <div className="mb-4">
                <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                  <Code
                    size={16}
                    className="text-blue-500 flex-shrink-0 mt-1"
                  />
                  <div className="flex-1">
                    <h5 className="text-sm font-semibold text-blue-700 mb-2">
                      Skills
                    </h5>
                    {renderSkillTags(user.skills, true)}
                  </div>
                </div>
              </div>

              {/* Description */}
              {user.description && (
                <div className="mb-4">
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <FileText
                      size={16}
                      className="text-gray-500 flex-shrink-0 mt-0.5"
                    />
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {user.description}
                    </p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => window.open(user.resumeUrl, "_blank")}
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 px-4 rounded-xl transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <Eye size={16} />
                  View Resume
                </button>
                <a
                  href={user.resumeUrl}
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
      </div>

      {/* Empty State */}
      {individuals.length === 0 && (
        <div className="text-center py-16 px-6">
          <div className="mx-auto w-24 h-24 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-6">
            <Users className="text-gray-400" size={40} />
          </div>
          <h3 className="text-gray-700 text-xl font-semibold mb-2">
            No Individual Users
          </h3>
          <p className="text-gray-500 text-base max-w-md mx-auto leading-relaxed">
            There are currently no individual users registered in the system.
            New users will appear here once they sign up.
          </p>
        </div>
      )}
    </div>
  );
};

export default IndividualCard;
