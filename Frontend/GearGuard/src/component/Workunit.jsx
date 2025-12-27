import React from "react";

const Workunit = () => {
  return (
    <div className="bg-gray-100 min-h-screen">

      {/* ================= ABSOLUTE LEFT HEADING ================= */}
      <h1 className="text-2xl font-semibold text-gray-800 mb-4 ml-6 pt-6">
        Work Center
      </h1>

      {/* ================= TABLE CONTAINER ================= */}
      <div className="px-6 pb-6">
        <div className="bg-white rounded shadow overflow-x-auto">

          <table className="w-full border-collapse text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border text-left">Work Center</th>
                <th className="p-3 border text-left">Code</th>
                <th className="p-3 border text-left">Tag</th>
                <th className="p-3 border text-left">
                  Alternative Workcenters
                </th>
                <th className="p-3 border text-right">Cost / Hour</th>
                <th className="p-3 border text-right">Capacity</th>
                <th className="p-3 border text-right">
                  Time Efficiency (%)
                </th>
                <th className="p-3 border text-right">
                  OEE Target (%)
                </th>
              </tr>
            </thead>

            <tbody>
              {/* ================= ROW 1 ================= */}
              <tr className="hover:bg-gray-50">
                <td className="p-3 border">Assembly 1</td>
                <td className="p-3 border">WC-ASM-01</td>
                <td className="p-3 border">Assembly</td>
                <td className="p-3 border">Assembly 2</td>
                <td className="p-3 border text-right">1.00</td>
                <td className="p-3 border text-right">100.00</td>
                <td className="p-3 border text-right">100.00</td>
                <td className="p-3 border text-right">34.59</td>
              </tr>

              {/* ================= ROW 2 ================= */}
              <tr className="hover:bg-gray-50">
                <td className="p-3 border">Drill 1</td>
                <td className="p-3 border">WC-DRL-01</td>
                <td className="p-3 border">Drilling</td>
                <td className="p-3 border">Drill 2</td>
                <td className="p-3 border text-right">1.00</td>
                <td className="p-3 border text-right">100.00</td>
                <td className="p-3 border text-right">100.00</td>
                <td className="p-3 border text-right">90.00</td>
              </tr>
            </tbody>
          </table>

        </div>
      </div>

    </div>
  );
};

export default Workunit;


