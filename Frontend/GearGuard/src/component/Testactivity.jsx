import React, { useState } from "react";

const stages = [
  "Requested",
  "Scheduled",
  "In Progress",
  "Testing",
  "Completed",
];

// Sample equipment data
const equipmentData = [
  {
    equipmentName: "Samsung Monitor 15\"",
    employee: "Tejas Modi",
    department: "Admin",
    serialNumber: "MT/125/22778837",
    technician: "Mitchell Admin",
    equipmentCategory: "Monitors",
    company: "My Company (San Francisco)"
  },
  {
    equipmentName: "Acer Laptop",
    employee: "Bhaumik P",
    department: "Technician",
    serialNumber: "MT/122/11112222",
    technician: "Marc Demo",
    equipmentCategory: "Computers",
    company: "My Company (San Francisco)"
  }
];

const TestActivity = () => {
  const [currentStage, setCurrentStage] = useState(2); // In Progress
  const [status, setStatus] = useState("in-progress");
  const [maintenanceFor, setMaintenanceFor] = useState("Equipment");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* ================= TITLE ================= */}
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Test Activity
      </h1>

      {/* ================= EQUIPMENT SECTION ================= */}
      <div className="bg-white p-6 rounded shadow mb-6">
        {/* Header with New Button, Title, and Search */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              New
            </button>
            <h2 className="text-xl font-semibold text-gray-800">Equipment</h2>
          </div>
          
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md ml-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Q Search"
              className="w-full px-4 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Equipment Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-700 border-b">
              <tr>
                <th className="px-4 py-3 font-semibold">Equipment Name</th>
                <th className="px-4 py-3 font-semibold">Employee</th>
                <th className="px-4 py-3 font-semibold">Department</th>
                <th className="px-4 py-3 font-semibold">Serial Number</th>
                <th className="px-4 py-3 font-semibold">Technician</th>
                <th className="px-4 py-3 font-semibold">Equipment Category</th>
                <th className="px-4 py-3 font-semibold">Company</th>
              </tr>
            </thead>
            <tbody>
              {equipmentData.map((equipment, index) => (
                <tr key={index} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-gray-800">{equipment.equipmentName}</td>
                  <td className="px-4 py-3 text-gray-600">{equipment.employee}</td>
                  <td className="px-4 py-3 text-gray-600">{equipment.department}</td>
                  <td className="px-4 py-3 text-gray-600">{equipment.serialNumber}</td>
                  <td className="px-4 py-3 text-gray-600">{equipment.technician}</td>
                  <td className="px-4 py-3 text-gray-600">{equipment.equipmentCategory}</td>
                  <td className="px-4 py-3 text-gray-600">{equipment.company}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= MAINTENANCE STAGES ================= */}
      <div className="bg-white p-6 rounded shadow mb-6">
        <div className="flex justify-between items-center">

          {stages.map((stage, index) => (
            <div key={stage} className="flex items-center w-full">

              {/* Stage Circle */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center border
                ${
                  index <= currentStage
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-400"
                }`}
              >
                {index + 1}
              </div>

              {/* Stage Label */}
              <span
                className={`ml-2 text-sm font-medium
                ${
                  index <= currentStage
                    ? "text-blue-600"
                    : "text-gray-400"
                }`}
              >
                {stage}
              </span>

              {/* Connecting Line */}
              {index !== stages.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-3
                  ${
                    index < currentStage
                      ? "bg-blue-600"
                      : "bg-gray-300"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ================= FORM ================= */}
      <div className="bg-white p-6 rounded shadow">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Activity Name */}
          <div>
            <label className="text-sm text-gray-600">Activity Name</label>
            <input
              type="text"
              className="w-full mt-1 p-2 border rounded"
              placeholder="Enter activity name"
            />
          </div>

          {/* Maintenance For */}
          <div>
            <label className="text-sm text-gray-600">Maintenance For</label>
            <select
              value={maintenanceFor}
              onChange={(e) => setMaintenanceFor(e.target.value)}
              className="w-full mt-1 p-2 border rounded"
            >
              <option>Equipment</option>
              <option>Work Center</option>
            </select>
          </div>

          {/* Equipment / Work Center */}
          <div>
            <label className="text-sm text-gray-600">
              {maintenanceFor}
            </label>
            <input
              type="text"
              className="w-full mt-1 p-2 border rounded"
              placeholder={`Select ${maintenanceFor}`}
            />
          </div>

          {/* Category */}
          <div>
            <label className="text-sm text-gray-600">Category</label>
            <select className="w-full mt-1 p-2 border rounded">
              <option>Preventive</option>
              <option>Corrective</option>
              <option>Inspection</option>
            </select>
          </div>

          {/* Assigned To */}
          <div>
            <label className="text-sm text-gray-600">Assigned To</label>
            <input
              type="text"
              className="w-full mt-1 p-2 border rounded"
              placeholder="Technician name"
            />
          </div>

          {/* ================= STATUS ================= */}
          <div>
            <label className="text-sm text-gray-600 mb-2 block">Status</label>

            <div className="flex items-center gap-4">

              {/* Blocked */}
              <div
                onClick={() => setStatus("blocked")}
                className={`w-6 h-6 rounded-full border cursor-pointer
                  ${status === "blocked" ? "bg-red-600" : "bg-white"}`}
                title="Blocked"
              />

              {/* In Progress */}
              <div
                onClick={() => setStatus("in-progress")}
                className={`w-6 h-6 rounded-full border cursor-pointer
                  ${status === "in-progress" ? "bg-white" : "bg-gray-200"}`}
                title="In Progress"
              />

              {/* Ready */}
              <div
                onClick={() => setStatus("ready")}
                className={`w-6 h-6 rounded-full border cursor-pointer
                  ${status === "ready" ? "bg-green-600" : "bg-white"}`}
                title="Ready for Next Stage"
              />

              <span className="ml-2 text-sm capitalize text-gray-700">
                {status.replace("-", " ")}
              </span>
            </div>
          </div>

          {/* Request Date */}
          <div>
            <label className="text-sm text-gray-600">Request Date</label>
            <input
              type="date"
              className="w-full mt-1 p-2 border rounded"
            />
          </div>

          {/* Schedule Date */}
          <div>
            <label className="text-sm text-gray-600">Schedule Date</label>
            <input
              type="date"
              className="w-full mt-1 p-2 border rounded"
            />
          </div>
        </div>

        {/* ================= NOTES / INSTRUCTIONS ================= */}
        <div className="mt-6">
          <label className="text-sm text-gray-600">
            Notes / Instructions
          </label>
          <textarea
            rows="5"
            className="w-full mt-1 p-3 border rounded resize-none"
            placeholder="Enter maintenance notes or instructions for the technician..."
          />
        </div>

      </div>

    </div>
  );
};

export default TestActivity;

