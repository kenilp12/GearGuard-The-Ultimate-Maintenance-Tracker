import React, { useState } from "react";

const Team = () => {
  const [showModal, setShowModal] = useState(false);

  const [teams, setTeams] = useState([
    {
      teamName: "Internal Maintenance",
      member: "Anas Makari",
      company: "My Company (San Francisco)",
    },
    {
      teamName: "Metrology",
      member: "Marc Demo",
      company: "My Company (San Francisco)",
    },
    {
      teamName: "Subcontractor",
      member: "Maggie Davidson",
      company: "My Company (San Francisco)",
    },
  ]);

  const [formData, setFormData] = useState({
    teamName: "",
    member: "",
    company: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (!formData.teamName || !formData.member || !formData.company) return;

    setTeams([...teams, formData]);
    setFormData({ teamName: "", member: "", company: "" });
    setShowModal(false);
  };

  return (
    <div className="bg-gray-100 min-h-screen">

      {/* ================= HEADER ================= */}
      <div className="flex items-center gap-4 px-6 pt-6">
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-1.5 border rounded bg-white text-sm"
        >
          New
        </button>

        <h1 className="text-xl font-semibold text-gray-800">
          Teams
        </h1>

        
      </div>

      {/* ================= TABLE ================= */}
      <div className="px-6 pb-6 pt-4">
        <div className="bg-white rounded shadow overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border text-left">Team Name</th>
                <th className="p-3 border text-left">Team Members</th>
                <th className="p-3 border text-left">Company</th>
              </tr>
            </thead>

            <tbody>
              {teams.map((team, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="p-3 border">{team.teamName}</td>
                  <td className="p-3 border">{team.member}</td>
                  <td className="p-3 border">{team.company}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= MODAL ================= */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded shadow-lg p-6">

            <h2 className="text-lg font-semibold mb-4">
              Add Team
            </h2>

            {/* Team Name */}
            <div className="mb-3">
              <label className="text-sm text-gray-600">
                Team Name
              </label>
              <input
                type="text"
                name="teamName"
                value={formData.teamName}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded"
                placeholder="Enter team name"
              />
            </div>

            {/* Team Member */}
            <div className="mb-3">
              <label className="text-sm text-gray-600">
                Team Member
              </label>
              <input
                type="text"
                name="member"
                value={formData.member}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded"
                placeholder="Enter team member"
              />
            </div>

            {/* Company */}
            <div className="mb-4">
              <label className="text-sm text-gray-600">
                Company
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded"
                placeholder="Enter company"
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Save
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default Team;
