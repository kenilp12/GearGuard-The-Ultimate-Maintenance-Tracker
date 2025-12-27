import React from 'react'

const Dashboard = () => {
  
  return (
    <div className="min-h-screen bg-gray-100">

      {/* ================= NAVIGATION BAR ================= */}
      <nav className="bg-white shadow px-8 py-4 flex items-center">
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
      </nav>

      {/* ================= NEW + SEARCH ================= */}
      <div className="relative mt-8 px-8">
        <div className="absolute left-8 top-1/2 -translate-y-1/2">
          <button className="bg-white border border-gray-300 px-5 py-2 rounded-lg shadow-sm hover:bg-gray-100">
            New
          </button>
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-xl">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-3 rounded-lg shadow border focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>
      </div>

      {/* ================= THREE BOXES ================= */}
      <div className="mt-10 px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-red-50 border border-red-300 rounded-xl p-6 text-center">
          <h3 className="text-red-700 font-semibold text-lg">Critical Equipment</h3>
          <p className="text-2xl font-bold text-red-800 mt-2">5 Units</p>
          <p className="text-sm text-red-600">(Health &lt; 30%)</p>
        </div>

        <div className="bg-blue-50 border border-blue-300 rounded-xl p-6 text-center">
          <h3 className="text-blue-700 font-semibold text-lg">Technician Load</h3>
          <p className="text-2xl font-bold text-blue-800 mt-2">85% Utilized</p>
          <p className="text-sm text-blue-600">(Assign Carefully)</p>
        </div>

        <div className="bg-green-50 border border-green-300 rounded-xl p-6 text-center">
          <h3 className="text-green-700 font-semibold text-lg">Open Requests</h3>
          <p className="text-lg font-bold text-green-800 mt-2">12 Pending</p>
          <p className="text-sm text-red-600">3 Overdue</p>
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
              {/* Example Row */}
              <tr className="border-t hover:bg-gray-50">
                <td className="px-4 py-3">Test Activity</td>
                <td className="px-4 py-3">Mitchell Admin</td>
                <td className="px-4 py-3">Riju</td>
                <td className="px-4 py-3">Computer</td>
                <td className="px-4 py-3">
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                    New Request
                  </span>
                </td>
                <td className="px-4 py-3">My Company</td>
              </tr>

              {/* Empty State */}
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-400">
                  Click <b>New</b> to add a maintenance request
                </td>
              </tr>
            </tbody>
          </table>

        </div>
      </div>

    </div>
  );
}


    

   

export default Dashboard