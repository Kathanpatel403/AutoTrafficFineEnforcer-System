// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const EChallanTable = () => {
//   const [currentView, setCurrentView] = useState("generated");
//   const [showPopup, setShowPopup] = useState(false);
//   const [popupMessage, setPopupMessage] = useState("");
//   const [popupColor, setPopupColor] = useState("bg-green-500");
//   const [integratedData, setIntegratedData] = useState([]);
//   const [failedData, setFailedData] = useState([]);
//   const [eChallanData, setEChallanData] = useState([
//     {
//       id: "6724975eec6dfa76276eb718",
//       challanNo: "6724975eec6dfa76276eb718",
//       vehicleNo: "GJ27BS6810",
//       dateIssued: "2024-11-02",
//       status: "Unpaid",
//       hasElectricityBill: true,
//     },
//   ]);

//   // Handle the integration action
//   const handleIntegrateWithElectricityBill = async (challan) => {
//     try {
//       const response = await axios.get(
//         `http://127.0.0.1:8000/mongodb/electricity_bill/integrate/${challan.challanNo}/`
//       );

//       if (response.status === 200) {
//         setIntegratedData((prev) => [...prev, challan]);
//         setEChallanData((prev) => prev.filter((item) => item.id !== challan.id));
//         setPopupMessage(
//           `e-Challan ${challan.challanNo} integrated with Electricity Bill successfully!`
//         );
//         setPopupColor("bg-green-500");
//       } else {
//         throw new Error("Integration failed");
//       }
//     } catch (error) {
//       setFailedData((prev) => [...prev, challan]);
//       setPopupMessage(
//         `Failed to integrate e-Challan ${challan.challanNo} with Electricity Bill!`
//       );
//       setPopupColor("bg-red-500");
//     }
//     setShowPopup(true);

//     // Close the popup after 3 seconds
//     setTimeout(() => setShowPopup(false), 3000);
//   };

//   // Filter data based on the selected view
//   const filteredData = (() => {
//     if (currentView === "integrated") return integratedData;
//     if (currentView === "failed") return failedData;
//     return eChallanData;
//   })();

//   return (
//     <div className="overflow-x-auto w-4/5 ml-80 max-w-screen-lg mx-auto p-4">
//       {/* View Toggle Buttons */}
//       <div className="flex justify-between mb-4 items-center">
//         <div className="flex gap-4">
//           <button
//             onClick={() => setCurrentView("generated")}
//             className={`px-6 py-3 rounded-lg text-sm transition-all duration-300 ${
//               currentView === "generated"
//                 ? "bg-blue-500 text-white"
//                 : "bg-gray-200 text-blue-600 hover:bg-blue-100"
//             }`}
//           >
//             Generated e-Challan
//           </button>
//           <button
//             onClick={() => setCurrentView("integrated")}
//             className={`px-6 py-3 rounded-lg text-sm transition-all duration-300 ${
//               currentView === "integrated"
//                 ? "bg-blue-500 text-white"
//                 : "bg-gray-200 text-blue-600 hover:bg-blue-100"
//             }`}
//           >
//             Integrated e-Challan
//           </button>
//           <button
//             onClick={() => setCurrentView("failed")}
//             className={`px-6 py-3 rounded-lg text-sm transition-all duration-300 ${
//               currentView === "failed"
//                 ? "bg-blue-500 text-white"
//                 : "bg-gray-200 text-blue-600 hover:bg-blue-100"
//             }`}
//           >
//             Failed to Integrate
//           </button>
//         </div>
//       </div>

//       {/* Data Table */}
//       <table className="min-w-full bg-white border border-gray-300 shadow-lg rounded-lg overflow-hidden">
//         <thead className="bg-blue-500 text-white">
//           <tr>
//             <th className="px-6 py-3 border-b text-left text-sm font-medium uppercase">
//               CHALLAN NO
//             </th>
//             <th className="px-6 py-3 border-b text-left text-sm font-medium uppercase">
//               VEHICLE NO
//             </th>
//             <th className="px-6 py-3 border-b text-left text-sm font-medium uppercase">
//               DATE ISSUED
//             </th>
//             <th className="px-6 py-3 border-b text-left text-sm font-medium uppercase">
//               STATUS
//             </th>
//             <th className="px-6 py-3 border-b text-left text-sm font-medium uppercase">
//               Action
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredData.map((row) => (
//             <tr
//               key={row.id}
//               className="hover:bg-gray-100 transition-all duration-300"
//             >
//               <td className="px-6 py-3 border-b">{row.challanNo}</td>
//               <td className="px-6 py-3 border-b">{row.vehicleNo}</td>
//               <td className="px-6 py-3 border-b">{row.dateIssued}</td>
//               <td className="px-6 py-3 border-b">{row.status}</td>
//               <td className="px-6 py-3 border-b">
//                 {row.status === "Unpaid" ? (
//                   <button
//                     onClick={() => handleIntegrateWithElectricityBill(row)}
//                     className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition duration-300"
//                   >
//                     Integrate
//                   </button>
//                 ) : (
//                   <span className="text-gray-400">No Action</span>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Popup Notification */}
//       {showPopup && (
//         <div
//           className={`fixed bottom-5 right-5 p-4 ${popupColor} text-white rounded-md shadow-lg transform transition-all duration-300`}
//         >
//           {popupMessage}
//         </div>
//       )}
//     </div>
//   );
// };

// export default EChallanTable;



// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const EChallanTable = () => {
//   const [currentView, setCurrentView] = useState("generated");
//   const [showPopup, setShowPopup] = useState(false);
//   const [popupMessage, setPopupMessage] = useState("");
//   const [popupColor, setPopupColor] = useState("bg-green-500");
//   const [integratedData, setIntegratedData] = useState([]);
//   const [failedData, setFailedData] = useState([]);
//   const [eChallanData, setEChallanData] = useState([
//     {
//       id: "6724975eec6dfa76276eb718",
//       challanNo: "6724975eec6dfa76276eb718",
//       vehicleNo: "GJ27BS6810",
//       dateIssued: "2024-11-02",
//       status: "Unpaid",
//       hasElectricityBill: true,
//     },
//   ]);

//   const handleIntegrateWithElectricityBill = async (challan) => {
//     try {
//       const response = await axios.get(
//         `http://127.0.0.1:8000/mongodb/electricity_bill/integrate/${challan.challanNo}/`
//       );

//       if (response.status === 200) {
//         setIntegratedData((prev) => [...prev, challan]);
//         setEChallanData((prev) => prev.filter((item) => item.id !== challan.id));
//         setPopupMessage(
//           `e-Challan ${challan.challanNo} integrated with Electricity Bill successfully!`
//         );
//         setPopupColor("bg-green-500");
//       } else {
//         throw new Error("Integration failed");
//       }
//     } catch (error) {
//       setFailedData((prev) => [...prev, challan]);
//       setPopupMessage(
//         `Failed to integrate e-Challan ${challan.challanNo} with Electricity Bill!`
//       );
//       setPopupColor("bg-red-500");
//     }
//     setShowPopup(true);

//     setTimeout(() => setShowPopup(false), 3000);
//   };

//   const filteredData = (() => {
//     if (currentView === "integrated") return integratedData;
//     if (currentView === "failed") return failedData;
//     return eChallanData;
//   })();

//   return (
//     <div className="overflow-x-auto w-4/5 ml-80 max-w-screen-lg mx-auto p-4">
//       {/* View Toggle Buttons */}
//       <div className="flex justify-between mb-4 items-center">
//         <div className="flex gap-4">
//           <button
//             onClick={() => setCurrentView("generated")}
//             className={`px-6 py-3 rounded-lg text-sm transition-all duration-300 ${
//               currentView === "generated"
//                 ? "bg-blue-500 text-white"
//                 : "bg-gray-200 text-blue-600 hover:bg-blue-100"
//             }`}
//           >
//             Generated e-Challan
//           </button>
//           <button
//             onClick={() => setCurrentView("integrated")}
//             className={`px-6 py-3 rounded-lg text-sm transition-all duration-300 ${
//               currentView === "integrated"
//                 ? "bg-blue-500 text-white"
//                 : "bg-gray-200 text-blue-600 hover:bg-blue-100"
//             }`}
//           >
//             Integrated e-Challan
//           </button>
//           <button
//             onClick={() => setCurrentView("failed")}
//             className={`px-6 py-3 rounded-lg text-sm transition-all duration-300 ${
//               currentView === "failed"
//                 ? "bg-blue-500 text-white"
//                 : "bg-gray-200 text-blue-600 hover:bg-blue-100"
//             }`}
//           >
//             Failed to Integrate
//           </button>
//         </div>
//       </div>

//       {/* Data Table */}
//       <table className="min-w-full bg-white border border-gray-300 shadow-lg rounded-lg overflow-hidden">
//         <thead className="bg-blue-500 text-white">
//           <tr>
//             <th className="px-6 py-3 border-b text-left text-sm font-medium uppercase">
//               CHALLAN NO
//             </th>
//             <th className="px-6 py-3 border-b text-left text-sm font-medium uppercase">
//               VEHICLE NO
//             </th>
//             <th className="px-6 py-3 border-b text-left text-sm font-medium uppercase">
//               DATE ISSUED
//             </th>
//             <th className="px-6 py-3 border-b text-left text-sm font-medium uppercase">
//               STATUS
//             </th>
//             {/* Conditionally render Action column header */}
//             {currentView === "generated" && (
//               <th className="px-6 py-3 border-b text-left text-sm font-medium uppercase">
//                 Action
//               </th>
//             )}
//           </tr>
//         </thead>
//         <tbody>
//           {filteredData.map((row) => (
//             <tr
//               key={row.id}
//               className="hover:bg-gray-100 transition-all duration-300"
//             >
//               <td className="px-6 py-3 border-b">{row.challanNo}</td>
//               <td className="px-6 py-3 border-b">{row.vehicleNo}</td>
//               <td className="px-6 py-3 border-b">{row.dateIssued}</td>
//               <td className="px-6 py-3 border-b">{row.status}</td>
//               {/* Conditionally render Action button only for "generated" view */}
//               {currentView === "generated" && (
//                 <td className="px-6 py-3 border-b">
//                   {row.status === "Unpaid" ? (
//                     <button
//                       onClick={() => handleIntegrateWithElectricityBill(row)}
//                       className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition duration-300"
//                     >
//                       Integrate
//                     </button>
//                   ) : (
//                     <span className="text-gray-400">No Action</span>
//                   )}
//                 </td>
//               )}
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Popup Notification */}
//       {showPopup && (
//         <div
//           className={`fixed bottom-5 right-5 p-4 ${popupColor} text-white rounded-md shadow-lg transform transition-all duration-300`}
//         >
//           {popupMessage}
//         </div>
//       )}
//     </div>
//   );
// };

// export default EChallanTable;










import React, { useState, useEffect } from "react";
import axios from "axios";

const EChallanTable = () => {
  const [currentView, setCurrentView] = useState("generated");
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupColor, setPopupColor] = useState("bg-green-500");
  const [integratedData, setIntegratedData] = useState([]);
  const [failedData, setFailedData] = useState([]);
  const [eChallanData, setEChallanData] = useState([
    {
      id: "6724975eec6dfa76276eb718",
      challanNo: "6724975eec6dfa76276eb718",
      vehicleNo: "GJ27BS6810",
      dateIssued: "2024-11-02",
      status: "Unpaid",
      hasElectricityBill: true,
    },
  ]);

  const handleIntegrateWithElectricityBill = async (challan) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/mongodb/electricity_bill/integrate/${challan.challanNo}/`
      );

      if (response.status === 200) {
        // Update the challan status to "Integrated"
        const updatedChallan = { ...challan, status: "Integrated" };

        // Move the updated challan to the integratedData array
        setIntegratedData((prev) => [...prev, updatedChallan]);

        // Remove the challan from eChallanData
        setEChallanData((prev) => prev.filter((item) => item.id !== challan.id));

        setPopupMessage(
          `e-Challan ${challan.challanNo} integrated with Electricity Bill successfully!`
        );
        setPopupColor("bg-green-500");
      } else {
        throw new Error("Integration failed");
      }
    } catch (error) {
      setFailedData((prev) => [...prev, challan]);
      setPopupMessage(
        `Failed to integrate e-Challan ${challan.challanNo} with Electricity Bill!`
      );
      setPopupColor("bg-red-500");
    }
    setShowPopup(true);

    setTimeout(() => setShowPopup(false), 3000);
  };

  const filteredData = (() => {
    if (currentView === "integrated") return integratedData;
    if (currentView === "failed") return failedData;
    return eChallanData;
  })();

  return (
    <div className="overflow-x-auto w-4/5 ml-80 max-w-screen-lg mx-auto p-4">
      {/* View Toggle Buttons */}
      <div className="flex justify-between mb-4 items-center">
        <div className="flex gap-4">
          <button
            onClick={() => setCurrentView("generated")}
            className={`px-6 py-3 rounded-lg text-sm transition-all duration-300 ${
              currentView === "generated"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-blue-600 hover:bg-blue-100"
            }`}
          >
            Generated e-Challan
          </button>
          <button
            onClick={() => setCurrentView("integrated")}
            className={`px-6 py-3 rounded-lg text-sm transition-all duration-300 ${
              currentView === "integrated"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-blue-600 hover:bg-blue-100"
            }`}
          >
            Integrated e-Challan
          </button>
          <button
            onClick={() => setCurrentView("failed")}
            className={`px-6 py-3 rounded-lg text-sm transition-all duration-300 ${
              currentView === "failed"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-blue-600 hover:bg-blue-100"
            }`}
          >
            Failed to Integrate
          </button>
        </div>
      </div>

      {/* Data Table */}
      <table className="min-w-full bg-white border border-gray-300 shadow-lg rounded-lg overflow-hidden">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="px-6 py-3 border-b text-left text-sm font-medium uppercase">
              CHALLAN NO
            </th>
            <th className="px-6 py-3 border-b text-left text-sm font-medium uppercase">
              VEHICLE NO
            </th>
            <th className="px-6 py-3 border-b text-left text-sm font-medium uppercase">
              DATE ISSUED
            </th>
            <th className="px-6 py-3 border-b text-left text-sm font-medium uppercase">
              STATUS
            </th>
            {/* Conditionally render Action column header */}
            {currentView === "generated" && (
              <th className="px-6 py-3 border-b text-left text-sm font-medium uppercase">
                Action
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row) => (
            <tr
              key={row.id}
              className="hover:bg-gray-100 transition-all duration-300"
            >
              <td className="px-6 py-3 border-b">{row.challanNo}</td>
              <td className="px-6 py-3 border-b">{row.vehicleNo}</td>
              <td className="px-6 py-3 border-b">{row.dateIssued}</td>
              <td className="px-6 py-3 border-b">{row.status}</td>
              {/* Conditionally render Action button only for "generated" view */}
              {currentView === "generated" && (
                <td className="px-6 py-3 border-b">
                  {row.status === "Unpaid" ? (
                    <button
                      onClick={() => handleIntegrateWithElectricityBill(row)}
                      className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition duration-300"
                    >
                      Integrate
                    </button>
                  ) : (
                    <span className="text-gray-400">No Action</span>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Popup Notification */}
      {showPopup && (
        <div
          className={`fixed bottom-5 right-5 p-4 ${popupColor} text-white rounded-md shadow-lg transform transition-all duration-300`}
        >
          {popupMessage}
        </div>
      )}
    </div>
  );
};

export default EChallanTable;
