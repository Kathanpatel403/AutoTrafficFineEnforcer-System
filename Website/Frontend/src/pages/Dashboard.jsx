import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

const Dashboard = () => {
  const [timeFrame, setTimeFrame] = useState("year");

  // Example data for the pie chart
  const pieData = [
    { name: "Issued eChallan", value: 400 },
    { name: "Pending eChallan", value: 200 },
    { name: "Integrated with Electricity", value: 100 },
  ];
  const COLORS = ["#0088FE", "#FFBB28", "#FF8042"]; // Color scheme

  // Dummy data to display in cards based on the timeframe
  const stats = {
    year: { issued: "20,000", pending: "5,000", integrated: "1,200" },
    month: { issued: "1,500", pending: "300", integrated: "100" },
    week: { issued: "400", pending: "100", integrated: "20" },
  };

  const currentStats = stats[timeFrame];

  // Example bar chart data
  const barData = [
    { month: "January", issued: 1200, pending: 300, integrated: 100 },
    { month: "February", issued: 1400, pending: 350, integrated: 120 },
    { month: "March", issued: 1600, pending: 400, integrated: 150 },
    { month: "April", issued: 1800, pending: 450, integrated: 170 },
  ];

  return (
    <div className="p-8 flex-1 w-4/5 ml-72">
      {/* Header with Buttons */}
      <div className="flex items-center justify-between mb-8">
        <div className="space-x-4">
          <button
            onClick={() => setTimeFrame("year")}
            className={`px-4 py-2 rounded-full ${timeFrame === "year" ? "bg-blue-500 text-white" : "bg-white text-blue-500"} hover:bg-blue-600`}
          >
            Year
          </button>
          <button
            onClick={() => setTimeFrame("month")}
            className={`px-4 py-2 rounded-full ${timeFrame === "month" ? "bg-blue-500 text-white" : "bg-white text-blue-500"} hover:bg-blue-600`}
          >
            Month
          </button>
          <button
            onClick={() => setTimeFrame("week")}
            className={`px-4 py-2 rounded-full ${timeFrame === "week" ? "bg-blue-500 text-white" : "bg-white text-blue-500"} hover:bg-blue-600`}
          >
            Week
          </button>
        </div>
        <button className="px-6 py-2 rounded-full bg-green-500 text-white hover:bg-green-600">
          Download Report
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Issued eChallan</h2>
          <p className="text-2xl font-bold text-blue-600">{currentStats.issued}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Pending eChallan</h2>
          <p className="text-2xl font-bold text-orange-500">{currentStats.pending}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Integrated with Electricity</h2>
          <p className="text-2xl font-bold text-green-500">{currentStats.integrated}</p>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:scale-105 duration-300" >
        <h2 className="text-xl font-semibold text-gray-800 mb-6">eChallan Analytics</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={pieData} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" dataKey="value" label>
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart */}
      <div className="bg-white p-8 rounded-lg shadow-md mt-8 hover:shadow-lg transition-all transform hover:scale-105 duration-300">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">eChallan Trends</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={barData}>
            <XAxis dataKey="month" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Bar dataKey="issued" fill="#3B82F6" />
            <Bar dataKey="pending" fill="#F59E0B" />
            <Bar dataKey="integrated" fill="#10B981" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
