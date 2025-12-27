import React, { useState } from "react";

const stages = [
  "Requested",
  "Scheduled",
  "In Progress",
  "Testing",
  "Completed",
];

// Sample equipment data for dropdown
const equipmentData = [
  {
    id: 1,
    equipmentName: "Samsung Monitor 15\"",
    serialNumber: "MT/125/22778837",
    displayName: "Samsung Monitor 15\" - MT/125/22778837"
  },
  {
    id: 2,
    equipmentName: "Acer Laptop",
    serialNumber: "MT/122/11112222",
    displayName: "Acer Laptop - MT/122/11112222"
  }
];

const TestActivity = () => {
  const [currentStage, setCurrentStage] = useState(2); // In Progress
  const [status, setStatus] = useState("in-progress");
  const [maintenanceFor, setMaintenanceFor] = useState("Equipment");
  const [selectedEquipment, setSelectedEquipment] = useState("");

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* ================= TITLE ================= */}
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Test Activity
      </h1>

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
            {maintenanceFor === "Equipment" ? (
              <select
                value={selectedEquipment}
                onChange={(e) => setSelectedEquipment(e.target.value)}
                className="w-full mt-1 p-2 border rounded"
              >
                <option value="">Select Equipment</option>
                {equipmentData.map((equipment) => (
                  <option key={equipment.id} value={equipment.id}>
                    {equipment.displayName}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                className="w-full mt-1 p-2 border rounded"
                placeholder={`Select ${maintenanceFor}`}
              />
            )}
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