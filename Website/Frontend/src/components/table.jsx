// // import React, { useState } from "react";

// // // Define columns
// // const columns = [
// //   { name: "CHALLAN NO", uid: "challanNo" },
// //   { name: "VEHICLE NO", uid: "vehicleNo" },
// //   { name: "DATE ISSUED", uid: "dateIssued" },
// //   { name: "STATUS", uid: "status" },
// //   { name: "ACTIONS", uid: "actions" },
// // ];

// // // Data with `hasElectricityBill` field
// // const eChallanData = [
// //   { id: 1, challanNo: "CH12345", vehicleNo: "GJ05AA1234", dateIssued: "2024-10-20", status: "Paid", hasElectricityBill: true },
// //   { id: 2, challanNo: "CH12346", vehicleNo: "GJ05BB5678", dateIssued: "2024-10-18", status: "Unpaid", hasElectricityBill: false },
// //   { id: 3, challanNo: "CH12347", vehicleNo: "GJ05CC9012", dateIssued: "2024-10-15", status: "Paid", hasElectricityBill: true },
// //   { id: 4, challanNo: "CH12348", vehicleNo: "GJ05DD3456", dateIssued: "2024-10-10", status: "Unpaid", hasElectricityBill: true },
// //   { id: 5, challanNo: "CH12349", vehicleNo: "GJ05EE7890", dateIssued: "2024-10-08", status: "Pending", hasElectricityBill: false },
// //   { id: 6, challanNo: "CH12350", vehicleNo: "GJ05FF4321", dateIssued: "2024-10-05", status: "Paid", hasElectricityBill: true },
// //   { id: 7, challanNo: "CH12351", vehicleNo: "GJ05GG8765", dateIssued: "2024-10-02", status: "Unpaid", hasElectricityBill: false },
// // ];

// // // Component
// // const EChallanTable = () => {
// //   const [view, setView] = useState("Generated"); // Default view
// //   const [integratedChallans, setIntegratedChallans] = useState([]);
// //   const [failedChallans, setFailedChallans] = useState([]);
// //   const [showPopup, setShowPopup] = useState(false);
// //   const [popupMessage, setPopupMessage] = useState("");

// //   const handleIntegrateWithElectricityBill = (challan) => {
// //     // Check if the challan has an electricity bill available
// //     if (challan.hasElectricityBill) {
// //       setIntegratedChallans([...integratedChallans, challan]);
// //       setPopupMessage(`e-Challan ${challan.challanNo} integrated with Electricity Bill successfully!`);
// //     } else {
// //       setFailedChallans([...failedChallans, challan]);
// //       setPopupMessage(`e-Challan ${challan.challanNo} failed to integrate (no electricity bill found).`);
// //     }
// //     setShowPopup(true);
// //     setTimeout(() => setShowPopup(false), 3000);
// //   };

// //   // Filter data based on the selected view
// //   const displayedData = view === "Generated"
// //     ? eChallanData
// //     : view === "Integrated"
// //     ? integratedChallans
// //     : failedChallans;

// //   return (
// //     <div className="overflow-x-auto">
// //       {/* Buttons for switching views */}
// //       <div className="mb-4 flex space-x-2">
// //         <button onClick={() => setView("Generated")} className={`px-4 py-2 rounded ${view === "Generated" ? "bg-blue-600 text-white" : "bg-gray-200"}`}>
// //           Generated e-Challan
// //         </button>
// //         <button onClick={() => setView("Integrated")} className={`px-4 py-2 rounded ${view === "Integrated" ? "bg-blue-600 text-white" : "bg-gray-200"}`}>
// //           Integrated e-Challan
// //         </button>
// //         <button onClick={() => setView("Failed")} className={`px-4 py-2 rounded ${view === "Failed" ? "bg-blue-600 text-white" : "bg-gray-200"}`}>
// //           Failed to Integrate
// //         </button>
// //       </div>

// //       {/* Table */}
// //       <table className="min-w-full bg-white border border-gray-300">
// //         <thead className="bg-gray-200">
// //           <tr>
// //             {columns.map((column) => (
// //               <th key={column.uid} className="px-4 py-2 border-b text-left text-sm font-medium text-gray-700 uppercase">
// //                 {column.name}
// //               </th>
// //             ))}
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {displayedData.map((item) => (
// //             <tr key={item.id} className="hover:bg-gray-100">
// //               <td className="px-4 py-2 border-b">{item.challanNo}</td>
// //               <td className="px-4 py-2 border-b">{item.vehicleNo}</td>
// //               <td className="px-4 py-2 border-b">{item.dateIssued}</td>
// //               <td className="px-4 py-2 border-b">{item.status}</td>
// //               <td className="px-4 py-2 border-b">
// //                 {item.status === "Unpaid" && view === "Generated" ? (
// //                   <button onClick={() => handleIntegrateWithElectricityBill(item)} className="text-green-600 hover:underline">
// //                     Integrate with Electricity Bill
// //                   </button>
// //                 ) : (
// //                   <span className="text-gray-500">No Actions</span>
// //                 )}
// //               </td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>

// //       {/* Slide-In Popup Notification */}
// //       {showPopup && (
// //         <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded shadow-lg transition-transform duration-500 ease-in-out">
// //           {popupMessage}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default EChallanTable;





// import React, { useState } from "react";

// // Define columns
// const columns = [
//   { name: "CHALLAN NO", uid: "challanNo" },
//   { name: "VEHICLE NO", uid: "vehicleNo" },
//   { name: "DATE ISSUED", uid: "dateIssued" },
//   { name: "STATUS", uid: "status" },
//   { name: "ACTIONS", uid: "actions" },
// ];

// // Data with `hasElectricityBill` field
// const eChallanData = [
//   { id: 1, challanNo: "CH12345", vehicleNo: "GJ05AA1234", dateIssued: "2024-10-20", status: "Paid", hasElectricityBill: true },
//   { id: 2, challanNo: "CH12346", vehicleNo: "GJ05BB5678", dateIssued: "2024-10-18", status: "Unpaid", hasElectricityBill: false },
//   { id: 3, challanNo: "CH12347", vehicleNo: "GJ05CC9012", dateIssued: "2024-10-15", status: "Paid", hasElectricityBill: true },
//   { id: 4, challanNo: "CH12348", vehicleNo: "GJ05DD3456", dateIssued: "2024-10-10", status: "Unpaid", hasElectricityBill: true },
//   { id: 5, challanNo: "CH12349", vehicleNo: "GJ05EE7890", dateIssued: "2024-10-08", status: "Pending", hasElectricityBill: false },
//   { id: 6, challanNo: "CH12350", vehicleNo: "GJ05FF4321", dateIssued: "2024-10-05", status: "Paid", hasElectricityBill: true },
//   { id: 7, challanNo: "CH12351", vehicleNo: "GJ05GG8765", dateIssued: "2024-10-02", status: "Unpaid", hasElectricityBill: false },
// ];

// // Component
// const EChallanTable = () => {
//   const [view, setView] = useState("Generated"); // Default view
//   const [integratedChallans, setIntegratedChallans] = useState([]);
//   const [failedChallans, setFailedChallans] = useState([]);
//   const [showPopup, setShowPopup] = useState(false);
//   const [popupMessage, setPopupMessage] = useState("");

//   const handleIntegrateWithElectricityBill = (challan) => {
//     if (challan.hasElectricityBill) {
//       setIntegratedChallans([...integratedChallans, challan]);
//       setPopupMessage(`e-Challan ${challan.challanNo} integrated with Electricity Bill successfully!`);
//     } else {
//       setFailedChallans([...failedChallans, challan]);
//       setPopupMessage(`e-Challan ${challan.challanNo} failed to integrate (no electricity bill found).`);
//     }
//     setShowPopup(true);
//     setTimeout(() => setShowPopup(false), 3000);
//   };

//   // Filter data based on the selected view
//   const displayedData = view === "Generated"
//     ? eChallanData
//     : view === "Integrated"
//     ? integratedChallans
//     : failedChallans;

//   return (
//     <div className="overflow-x-auto max-w-screen-lg mx-auto px-4 py-6">
//       {/* Buttons for switching views */}
//       <div className="mb-6 flex space-x-4 justify-center">
//         <button
//           onClick={() => setView("Generated")}
//           className={`px-6 py-3 rounded-lg transition-all duration-300 ${view === "Generated" ? "bg-blue-600 text-white" : "bg-gray-200 text-blue-600"}`}
//         >
//           Generated e-Challan
//         </button>
//         <button
//           onClick={() => setView("Integrated")}
//           className={`px-6 py-3 rounded-lg transition-all duration-300 ${view === "Integrated" ? "bg-blue-600 text-white" : "bg-gray-200 text-blue-600"}`}
//         >
//           Integrated e-Challan
//         </button>
//         <button
//           onClick={() => setView("Failed")}
//           className={`px-6 py-3 rounded-lg transition-all duration-300 ${view === "Failed" ? "bg-blue-600 text-white" : "bg-gray-200 text-blue-600"}`}
//         >
//           Failed to Integrate
//         </button>
//       </div>

//       {/* Table */}
//       <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
//         <thead className="bg-gray-100">
//           <tr>
//             {columns.map((column) => (
//               <th key={column.uid} className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-700 uppercase">
//                 {column.name}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {displayedData.map((item) => (
//             <tr key={item.id} className="hover:bg-gray-50 transition-all duration-300">
//               <td className="px-6 py-3 border-b">{item.challanNo}</td>
//               <td className="px-6 py-3 border-b">{item.vehicleNo}</td>
//               <td className="px-6 py-3 border-b">{item.dateIssued}</td>
//               <td className="px-6 py-3 border-b">
//                 <span className={`px-2 py-1 rounded-lg text-sm font-semibold ${item.status === "Paid" ? "bg-green-100 text-green-600" : item.status === "Unpaid" ? "bg-yellow-100 text-yellow-600" : "bg-gray-100 text-gray-600"}`}>
//                   {item.status}
//                 </span>
//               </td>
//               <td className="px-6 py-3 border-b text-center">
//                 {item.status === "Unpaid" && view === "Generated" ? (
//                   <button
//                     onClick={() => handleIntegrateWithElectricityBill(item)}
//                     className="text-green-600 hover:underline transition-all duration-300"
//                   >
//                     Integrate with Electricity Bill
//                   </button>
//                 ) : (
//                   <span className="text-gray-500">No Actions</span>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Slide-In Popup Notification */}
//       {showPopup && (
//         <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-500 ease-in-out">
//           {popupMessage}
//         </div>
//       )}
//     </div>
//   );
// };

// export default EChallanTable;




import React, { useState } from "react";

// Define columns
const columns = [
  { name: "CHALLAN NO", uid: "challanNo" },
  { name: "VEHICLE NO", uid: "vehicleNo" },
  { name: "DATE ISSUED", uid: "dateIssued" },
  { name: "STATUS", uid: "status" },
  { name: "ACTIONS", uid: "actions" },
];

// Data with `hasElectricityBill` field
const eChallanData = [
  { id: 1, challanNo: "CH12345", vehicleNo: "GJ05AA1234", dateIssued: "2024-10-20", status: "Paid", hasElectricityBill: true },
  { id: 2, challanNo: "CH12346", vehicleNo: "GJ05BB5678", dateIssued: "2024-10-18", status: "Unpaid", hasElectricityBill: false },
  { id: 3, challanNo: "CH12347", vehicleNo: "GJ05CC9012", dateIssued: "2024-10-15", status: "Paid", hasElectricityBill: true },
  { id: 4, challanNo: "CH12348", vehicleNo: "GJ05DD3456", dateIssued: "2024-10-10", status: "Unpaid", hasElectricityBill: true },
  { id: 5, challanNo: "CH12349", vehicleNo: "GJ05EE7890", dateIssued: "2024-10-08", status: "Pending", hasElectricityBill: false },
  { id: 6, challanNo: "CH12350", vehicleNo: "GJ05FF4321", dateIssued: "2024-10-05", status: "Paid", hasElectricityBill: true },
  { id: 7, challanNo: "CH12351", vehicleNo: "GJ05GG8765", dateIssued: "2024-10-02", status: "Unpaid", hasElectricityBill: false },
];

const ITEMS_PER_PAGE = 3; // Number of rows to show per page

// Component
const EChallanTable = () => {
  const [view, setView] = useState("Generated"); // Default view
  const [integratedChallans, setIntegratedChallans] = useState([]);
  const [failedChallans, setFailedChallans] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);

  const handleIntegrateWithElectricityBill = (challan) => {
    if (challan.hasElectricityBill) {
      setIntegratedChallans([...integratedChallans, challan]);
      setPopupMessage(`e-Challan ${challan.challanNo} integrated with Electricity Bill successfully!`);
    } else {
      setFailedChallans([...failedChallans, challan]);
      setPopupMessage(`e-Challan ${challan.challanNo} failed to integrate (no electricity bill found).`);
    }
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
  };

  // Filter data based on the selected view
  const displayedData = view === "Generated"
    ? eChallanData
    : view === "Integrated"
    ? integratedChallans
    : failedChallans;

  // Pagination logic
  const totalPages = Math.ceil(displayedData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentData = displayedData.slice(startIndex, endIndex);

  return (
    <div className="overflow-x-auto max-w-screen-lg mx-auto px-4 py-6">
      {/* Buttons for switching views */}
      <div className="mb-6 flex space-x-4 justify-center">
        <button
          onClick={() => setView("Generated")}
          className={`px-6 py-3 rounded-lg transition-all duration-300 ${view === "Generated" ? "bg-blue-600 text-white" : "bg-gray-200 text-blue-600"}`}
        >
          Generated e-Challan
        </button>
        <button
          onClick={() => setView("Integrated")}
          className={`px-6 py-3 rounded-lg transition-all duration-300 ${view === "Integrated" ? "bg-blue-600 text-white" : "bg-gray-200 text-blue-600"}`}
        >
          Integrated e-Challan
        </button>
        <button
          onClick={() => setView("Failed")}
          className={`px-6 py-3 rounded-lg transition-all duration-300 ${view === "Failed" ? "bg-blue-600 text-white" : "bg-gray-200 text-blue-600"}`}
        >
          Failed to Integrate
        </button>
      </div>

      {/* Table */}
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((column) => (
              <th key={column.uid} className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-700 uppercase">
                {column.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentData.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50 transition-all duration-300">
              <td className="px-6 py-3 border-b">{item.challanNo}</td>
              <td className="px-6 py-3 border-b">{item.vehicleNo}</td>
              <td className="px-6 py-3 border-b">{item.dateIssued}</td>
              <td className="px-6 py-3 border-b">
                <span className={`px-2 py-1 rounded-lg text-sm font-semibold ${item.status === "Paid" ? "bg-green-100 text-green-600" : item.status === "Unpaid" ? "bg-yellow-100 text-yellow-600" : "bg-gray-100 text-gray-600"}`}>
                  {item.status}
                </span>
              </td>
              <td className="px-6 py-3 border-b text-center">
                {item.status === "Unpaid" && view === "Generated" ? (
                  <button
                    onClick={() => handleIntegrateWithElectricityBill(item)}
                    className="text-green-600 hover:underline transition-all duration-300"
                  >
                    Integrate with Electricity Bill
                  </button>
                ) : (
                  <span className="text-gray-500">No Actions</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination controls */}
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 text-gray-600 rounded-lg disabled:opacity-50"
        >
          Previous
        </button>
        <span className="self-center text-lg">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 text-gray-600 rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Slide-In Popup Notification */}
      {showPopup && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-500 ease-in-out">
          {popupMessage}
        </div>
      )}
    </div>
  );
};

export default EChallanTable;
