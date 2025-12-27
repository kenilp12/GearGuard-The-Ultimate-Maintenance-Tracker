import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { maintenanceService } from '../services/maintenance.service';
import { assetService } from '../services/asset.service';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [maintenanceRequests, setMaintenanceRequests] = useState([]);
  const [stats, setStats] = useState({
    totalAssets: 0,
    totalWorkOrders: 0,
    openWorkOrders: 0,
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [requests, dashboardStats] = await Promise.all([
        maintenanceService.getRequests(),
        assetService.getDashboardStats(),
      ]);
      setMaintenanceRequests(requests);
      setStats(dashboardStats);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredRequests = maintenanceRequests.filter((request) =>
    request.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.equipment?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">

      {/* ================= NAVIGATION BAR ================= */}
      <nav className="bg-white shadow px-8 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-blue-600 mr-10">
            Maintenance
          </h1>

          <ul className="flex space-x-6 text-gray-600 font-medium">
            <li className="text-blue-600 border-b-2 border-blue-600 pb-1 cursor-pointer">
              Dashboard
            </li>
            <li className="hover:text-blue-600 cursor-pointer">Maintenance Calendar</li>
            <li className="hover:text-blue-600 cursor-pointer">Equipment</li>
            <li className="hover:text-blue-600 cursor-pointer">Reporting</li>
            <li className="hover:text-blue-600 cursor-pointer">Teams</li>
          </ul>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-gray-600">{user?.email}</span>
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* ================= NEW + SEARCH ================= */}
      <div className="relative mt-8 px-8">
        <div className="absolute left-8 top-1/2 -translate-y-1/2 z-10">
          <button className="bg-white border border-gray-300 px-5 py-2 rounded-lg shadow-sm hover:bg-gray-100">
            New
          </button>
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-xl">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 rounded-lg shadow border focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>
      </div>

      {/* ================= THREE BOXES ================= */}
      <div className="mt-10 px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-red-50 border border-red-300 rounded-xl p-6 text-center">
          <h3 className="text-red-700 font-semibold text-lg">Total Assets</h3>
          <p className="text-2xl font-bold text-red-800 mt-2">
            {loading ? '...' : stats.totalAssets}
          </p>
          <p className="text-sm text-red-600">Active Assets</p>
        </div>

        <div className="bg-blue-50 border border-blue-300 rounded-xl p-6 text-center">
          <h3 className="text-blue-700 font-semibold text-lg">Total Work Orders</h3>
          <p className="text-2xl font-bold text-blue-800 mt-2">
            {loading ? '...' : stats.totalWorkOrders}
          </p>
          <p className="text-sm text-blue-600">All Work Orders</p>
        </div>

        <div className="bg-green-50 border border-green-300 rounded-xl p-6 text-center">
          <h3 className="text-green-700 font-semibold text-lg">Open Requests</h3>
          <p className="text-lg font-bold text-green-800 mt-2">
            {loading ? '...' : stats.openWorkOrders} Pending
          </p>
          <p className="text-sm text-red-600">
            {filteredRequests.filter((r) => r.status === 'In Progress').length} In Progress
          </p>
        </div>
      </div>

      {/* ================= TABLE ================= */}
      <div className="mt-10 px-8">
        <div className="bg-white rounded-xl shadow overflow-hidden">

          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-700">
              <tr>
                <th className="px-4 py-3">Subject</th>
                <th className="px-4 py-3">Employee</th>
                <th className="px-4 py-3">Technician</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Stage</th>
                <th className="px-4 py-3">Company</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-400">
                    Loading...
                  </td>
                </tr>
              ) : filteredRequests.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-400">
                    {searchTerm
                      ? 'No maintenance requests found'
                      : 'Click New to add a maintenance request'}
                  </td>
                </tr>
              ) : (
                filteredRequests.map((request) => (
                  <tr key={request._id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-3">{request.subject || 'N/A'}</td>
                    <td className="px-4 py-3">
                      {request.createdBy?.name || 'N/A'}
                    </td>
                    <td className="px-4 py-3">{request.technician || 'N/A'}</td>
                    <td className="px-4 py-3">{request.category || 'N/A'}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          request.status === 'New Request'
                            ? 'bg-blue-100 text-blue-700'
                            : request.status === 'In Progress'
                            ? 'bg-yellow-100 text-yellow-700'
                            : request.status === 'Repaired'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {request.status || 'N/A'}
                      </span>
                    </td>
                    <td className="px-4 py-3">{request.company || 'N/A'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

        </div>
      </div>

    </div>
  );
}


    

   

export default Dashboard