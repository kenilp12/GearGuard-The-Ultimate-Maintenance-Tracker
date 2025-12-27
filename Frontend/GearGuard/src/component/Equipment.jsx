import React, { useState } from "react";

// Sample equipment data with IDs
const initialEquipmentData = [
  {
    id: 1,
    equipmentName: "Samsung Monitor 15\"",
    employee: "Tejas Modi",
    department: "Admin",
    serialNumber: "MT/125/22778837",
    technician: "Mitchell Admin",
    equipmentCategory: "Monitors",
    company: "My Company (San Francisco)"
  },
  {
    id: 2,
    equipmentName: "Acer Laptop",
    employee: "Bhaumik P",
    department: "Technician",
    serialNumber: "MT/122/11112222",
    technician: "Marc Demo",
    equipmentCategory: "Computers",
    company: "My Company (San Francisco)"
  }
];

const Equipment = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [equipmentList, setEquipmentList] = useState(initialEquipmentData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEquipment, setEditingEquipment] = useState(null);
  const [formData, setFormData] = useState({
    equipmentName: "",
    employee: "",
    department: "",
    serialNumber: "",
    technician: "",
    equipmentCategory: "",
    company: ""
  });

  // Filter equipment based on search query
  const filteredEquipment = equipmentList.filter((equipment) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      equipment.equipmentName.toLowerCase().includes(searchLower) ||
      equipment.employee.toLowerCase().includes(searchLower) ||
      equipment.department.toLowerCase().includes(searchLower) ||
      equipment.serialNumber.toLowerCase().includes(searchLower) ||
      equipment.technician.toLowerCase().includes(searchLower) ||
      equipment.equipmentCategory.toLowerCase().includes(searchLower) ||
      equipment.company.toLowerCase().includes(searchLower)
    );
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Open modal for creating new equipment
  const handleNewEquipment = () => {
    setEditingEquipment(null);
    setFormData({
      equipmentName: "",
      employee: "",
      department: "",
      serialNumber: "",
      technician: "",
      equipmentCategory: "",
      company: ""
    });
    setIsModalOpen(true);
  };

  // Open modal for editing equipment
  const handleEditEquipment = (equipment) => {
    setEditingEquipment(equipment);
    setFormData({
      equipmentName: equipment.equipmentName,
      employee: equipment.employee,
      department: equipment.department,
      serialNumber: equipment.serialNumber,
      technician: equipment.technician,
      equipmentCategory: equipment.equipmentCategory,
      company: equipment.company
    });
    setIsModalOpen(true);
  };

  // Handle save (create or update)
  const handleSaveEquipment = () => {
    if (!formData.equipmentName || !formData.serialNumber) {
      alert("Please fill in required fields (Equipment Name and Serial Number)");
      return;
    }

    if (editingEquipment) {
      // Update existing equipment
      setEquipmentList(prev => 
        prev.map(item => 
          item.id === editingEquipment.id 
            ? { ...editingEquipment, ...formData }
            : item
        )
      );
    } else {
      // Create new equipment
      const newEquipment = {
        id: Date.now(), // Simple ID generation
        ...formData
      };
      setEquipmentList(prev => [...prev, newEquipment]);
    }

    // Close modal and reset form
    setIsModalOpen(false);
    setEditingEquipment(null);
    setFormData({
      equipmentName: "",
      employee: "",
      department: "",
      serialNumber: "",
      technician: "",
      equipmentCategory: "",
      company: ""
    });
  };

  // Handle delete equipment
  const handleDeleteEquipment = (id) => {
    if (window.confirm("Are you sure you want to delete this equipment?")) {
      setEquipmentList(prev => prev.filter(item => item.id !== id));
    }
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingEquipment(null);
    setFormData({
      equipmentName: "",
      employee: "",
      department: "",
      serialNumber: "",
      technician: "",
      equipmentCategory: "",
      company: ""
    });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* ================= EQUIPMENT SECTION ================= */}
      <div className="bg-white p-6 rounded shadow">
        {/* Header with New Button, Title, and Search */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={handleNewEquipment}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
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
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
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
                <th className="px-4 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEquipment.length > 0 ? (
                filteredEquipment.map((equipment) => (
                  <tr key={equipment.id} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-gray-800 font-medium">{equipment.equipmentName}</td>
                    <td className="px-4 py-3 text-gray-600">{equipment.employee}</td>
                    <td className="px-4 py-3 text-gray-600">{equipment.department}</td>
                    <td className="px-4 py-3 text-gray-600">{equipment.serialNumber}</td>
                    <td className="px-4 py-3 text-gray-600">{equipment.technician}</td>
                    <td className="px-4 py-3 text-gray-600">{equipment.equipmentCategory}</td>
                    <td className="px-4 py-3 text-gray-600">{equipment.company}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEditEquipment(equipment)}
                          className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                          title="Edit"
                        >
                          Edit
                        </button>
                        <span className="text-gray-300">|</span>
                        <button
                          onClick={() => handleDeleteEquipment(equipment.id)}
                          className="text-red-600 hover:text-red-800 font-medium text-sm"
                          title="Delete"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="px-4 py-8 text-center text-gray-400">
                    No equipment found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= MODAL FOR CREATE/EDIT ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-xl font-semibold text-gray-800">
                {editingEquipment ? "Edit Equipment" : "Add New Equipment"}
              </h3>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Equipment Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Equipment Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="equipmentName"
                    value={formData.equipmentName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter equipment name"
                    required
                  />
                </div>

                {/* Employee */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Employee
                  </label>
                  <input
                    type="text"
                    name="employee"
                    value={formData.employee}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter employee name"
                  />
                </div>

                {/* Department */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Department
                  </label>
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter department"
                  />
                </div>

                {/* Serial Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Serial Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="serialNumber"
                    value={formData.serialNumber}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter serial number"
                    required
                  />
                </div>

                {/* Technician */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Technician
                  </label>
                  <input
                    type="text"
                    name="technician"
                    value={formData.technician}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter technician name"
                  />
                </div>

                {/* Equipment Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Equipment Category
                  </label>
                  <select
                    name="equipmentCategory"
                    value={formData.equipmentCategory}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="">Select category</option>
                    <option value="Monitors">Monitors</option>
                    <option value="Computers">Computers</option>
                    <option value="Printers">Printers</option>
                    <option value="Network Equipment">Network Equipment</option>
                    <option value="Servers">Servers</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Company */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter company name"
                  />
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEquipment}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {editingEquipment ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Equipment;