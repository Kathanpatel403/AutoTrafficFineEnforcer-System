// // import React from "react";
// // import { FaTachometerAlt, FaSignal, FaCar, FaFileInvoice, FaUsers } from "react-icons/fa";
// // import { Link } from "react-router-dom";

// // const Sidebar = () => {
// //   return (
// //     <div className="h-screen w-64 bg-white text-gray-800 relative rounded-3xl m-5 shadow-xl">
// //       <div className="absolute inset-0 bg-white/50 backdrop-blur-xl rounded-3xl shadow-2xl">
// //         <div className="p-6 text-2xl font-bold bg-blue-100 text-blue-800 rounded-t-3xl">
// //          <center>ATFE</center> 
// //         </div>
// //         <ul className="mt-6 space-y-4 p-5">
// //           <li className="flex items-center bg-gray-100 hover:bg-blue-200 hover:scale-105 transform transition-all duration-300 p-3 rounded-lg text-gray-900">
// //             <FaTachometerAlt className="mr-3" />
// //             <Link to="/dashboard" className="block">Dashboard</Link>
// //           </li>
// //           <li className="flex items-center bg-gray-100 hover:bg-blue-200 hover:scale-105 transform transition-all duration-300 p-3 rounded-lg text-gray-900">
// //             <FaSignal className="mr-3" />
// //             <Link to="/signal-adjustment" className="block">Signal Adjustment</Link>
// //           </li>
// //           <li className="flex items-center bg-gray-100 hover:bg-blue-200 hover:scale-105 transform transition-all duration-300 p-3 rounded-lg text-gray-900">
// //             <FaSignal className="mr-3" />
// //             <Link to="/ANPR " className="block">ANPR</Link>
// //           </li>
// //           <li className="flex items-center bg-gray-100 hover:bg-blue-200 hover:scale-105 transform transition-all duration-300 p-3 rounded-lg text-gray-900">
// //             <FaSignal className="mr-3" />
// //             <Link to="/e-Challan " className="block">e-Challan</Link>
// //           </li>
// //           {/* Add more links here */}
// //         </ul>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Sidebar;


// // import React from "react";
// // import { FaTachometerAlt, FaSignal, FaCar, FaFileInvoice, FaUsers } from "react-icons/fa";
// // import { Link, useLocation } from "react-router-dom";

// // const Sidebar = () => {
// //   const location = useLocation();

// //   // Function to check if the current route matches the link
// //   const isActive = (path) => location.pathname === path;

// //   return (
// //     <div className="h-screen  w-64 bg-white text-gray-800 relative rounded-3xl m-5 shadow-xl">
// //       <div className="absolute inset-0 bg-white/50 backdrop-blur-xl rounded-3xl shadow-2xl">
// //         <div className="p-6 text-2xl font-bold bg-blue-100 text-blue-800 rounded-t-3xl">
// //           <center>ATFE</center>
// //         </div>
// //         <ul className="mt-6 space-y-4 p-5">
// //           <SidebarLink
// //             to="/dashboard"
// //             icon={<FaTachometerAlt />}
// //             text="Dashboard"
// //             isActive={isActive("/dashboard")}
// //           />
// //           <SidebarLink
// //             to="/signal-adjustment"
// //             icon={<FaSignal />}
// //             text="Signal Adjustment"
// //             isActive={isActive("/signal-adjustment")}
// //           />
// //           <SidebarLink
// //             to="/ANPR"
// //             icon={<FaCar />}
// //             text="ANPR"
// //             isActive={isActive("/ANPR")}
// //           />
// //           <SidebarLink
// //             to="/e-Challan"
// //             icon={<FaFileInvoice />}
// //             text="e-Challan"
// //             isActive={isActive("/e-Challan")}
// //           />
// //           {/* Add more links here */}
// //         </ul>
// //       </div>
// //     </div>
// //   );
// // };

// // // SidebarLink Component for reusability
// // const SidebarLink = ({ to, icon, text, isActive }) => {
// //   return (
// //     <li
// //       className={`flex items-center p-3 rounded-lg text-gray-900 transition-all duration-300 ${
// //         isActive ? "bg-blue-200 shadow-md" : "bg-gray-100 hover:bg-blue-200 hover:scale-105"
// //       }`}
// //     >
// //       <span className="mr-3 text-xl">{icon}</span>
// //       <Link to={to} className="block">{text}</Link>
// //     </li>
// //   );
// // };

// // export default Sidebar;


// import React from "react";
// import { FaTachometerAlt, FaSignal, FaCar, FaFileInvoice } from "react-icons/fa";
// import { Link, useLocation } from "react-router-dom";

// const Sidebar = () => {
//   const location = useLocation();

//   // Function to check if the current route matches the link
//   const isActive = (path) => location.pathname === path;

//   return (
//     <div className="h-screen w-64 bg-white text-black  rounded-lg shadow-md">
//       <div className="flex items-center justify-center p-6 bg-gray-700 rounded-t-lg">
//         <h1 className="text-xl font-semibold">ATFE</h1>
//       </div>
//       <ul className="mt-8 space-y-4 px-4">
//         <SidebarLink
//           to="/dashboard"
//           icon={<FaTachometerAlt />}
//           text="Dashboard"
//           isActive={isActive("/dashboard")}
//         />
//         <SidebarLink
//           to="/signal-adjustment"
//           icon={<FaSignal />}
//           text="Signal Adjustment"
//           isActive={isActive("/signal-adjustment")}
//         />
//         <SidebarLink
//           to="/ANPR"
//           icon={<FaCar />}
//           text="ANPR"
//           isActive={isActive("/ANPR")}
//         />
//         <SidebarLink
//           to="/e-Challan"
//           icon={<FaFileInvoice />}
//           text="e-Challan"
//           isActive={isActive("/e-Challan")}
//         />
//       </ul>
//     </div>
//   );
// };

// // SidebarLink Component for reusability
// const SidebarLink = ({ to, icon, text, isActive }) => {
//   return (
//     <li
//       className={`flex items-center p-3 rounded-lg text-sm font-medium transition-all duration-200 ease-in-out cursor-pointer ${
//         isActive
//           ? "bg-blue-600 text-white"
//           : "bg-gray-700 text-gray-300 hover:bg-blue-500 hover:text-white"
//       }`}
//     >
//       <span className="mr-3 text-lg">{icon}</span>
//       <Link to={to} className="block">{text}</Link>
//     </li>
//   );
// };

// export default Sidebar;



// import React from "react";
// import { FaTachometerAlt, FaSignal, FaCar, FaFileInvoice, FaUsers } from "react-icons/fa";
// import { Link, useLocation } from "react-router-dom";

// const Sidebar = () => {
//   const location = useLocation();

//   return (
//     <div className="fixed h-[720px] mt-1 w-64 bg-[#ddeaff] text-white rounded-3xl shadow-xl">
//       <div className="absolute inset-0 bg-white/50 backdrop-blur-xl rounded-3xl shadow-3xl">
//         <div className="p-6 text-2xl font-bold bg-blue-600 text-white rounded-t-3xl rounded-l-none">
//           <center>ATFE</center>
//         </div>
//         <ul className="mt-6 space-y-4 p-5">
//           <li
//             className={`flex items-center p-3 rounded-lg transition-colors duration-300 ${
//               location.pathname === "/dashboard"
//                 ? "bg-blue-600 text-white"
//                 : "bg-gray-800 hover:bg-blue-600 hover:text-white"
//             }`}
//           >
//             <FaTachometerAlt className="mr-3" />
//             <Link to="/dashboard" className="block w-full">
//               Dashboard
//             </Link>
//           </li>
//           <li
//             className={`flex items-center p-3 rounded-lg transition-colors duration-300 ${
//               location.pathname === "/signal-adjustment"
//                 ? "bg-blue-600 text-white"
//                 : "bg-gray-800 hover:bg-blue-600 hover:text-white"
//             }`}
//           >
//             <FaSignal className="mr-3" />
//             <Link to="/signal-adjustment" className="block w-full">
//               Signal Adjustment
//             </Link>
//           </li>
//           <li
//             className={`flex items-center p-3 rounded-lg transition-colors duration-300 ${
//               location.pathname === "/ANPR"
//                 ? "bg-blue-600 text-white"
//                 : "bg-gray-800 hover:bg-blue-600 hover:text-white"
//             }`}
//           >
//             <FaCar className="mr-3" />
//             <Link to="/ANPR" className="block w-full">
//               ANPR
//             </Link>
//           </li>
//           <li
//             className={`flex items-center p-3 rounded-lg transition-colors duration-300 ${
//               location.pathname === "/e-Challan"
//                 ? "bg-blue-600 text-white"
//                 : "bg-gray-800 hover:bg-blue-600 hover:text-white"
//             }`}
//           >
//             <FaFileInvoice className="mr-3" />
//             <Link to="/e-Challan" className="block w-full">
//               e-Challan
//             </Link>
//           </li>
          
//           <li
//             className={`flex items-center p-3 rounded-lg transition-colors duration-300 ${
//               location.pathname === "/add-police"
//                 ? "bg-blue-600 text-white"
//                 : "bg-gray-800 hover:bg-blue-600 hover:text-white"
//             }`}
//           >
//             <FaUsers className="mr-3" />
//             <Link to="/add-police" className="block w-full">
//               Add Police
//             </Link>
//           </li>

          
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

// src/components/sidebar.jsx

import React from "react";
import { FaTachometerAlt, FaSignal, FaCar, FaFileInvoice, FaUsers } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="fixed h-[720px] mt-1 w-64 bg-[#ddeaff] text-white rounded-3xl shadow-xl">
      <div className="absolute inset-0 bg-white/50 backdrop-blur-xl rounded-3xl shadow-3xl">
        <div className="p-6 text-2xl font-bold bg-blue-600 text-white rounded-t-3xl rounded-l-none">
          <center>ATFE</center>
        </div>
        <ul className="mt-6 space-y-4 p-5">
          <li className={`flex items-center p-3 rounded-lg transition-colors duration-300 ${location.pathname === "/dashboard" ? "bg-blue-600 text-white" : "bg-gray-800 hover:bg-blue-600 hover:text-white"}`}>
            <FaTachometerAlt className="mr-3" />
            <Link to="/dashboard" className="block w-full">Dashboard</Link>
          </li>
          <li className={`flex items-center p-3 rounded-lg transition-colors duration-300 ${location.pathname === "/signal-adjustment" ? "bg-blue-600 text-white" : "bg-gray-800 hover:bg-blue-600 hover:text-white"}`}>
            <FaSignal className="mr-3" />
            <Link to="/signal-adjustment" className="block w-full">Signal Adjustment</Link>
          </li>
          <li className={`flex items-center p-3 rounded-lg transition-colors duration-300 ${location.pathname === "/ANPR" ? "bg-blue-600 text-white" : "bg-gray-800 hover:bg-blue-600 hover:text-white"}`}>
            <FaCar className="mr-3" />
            <Link to="/ANPR" className="block w-full">ANPR</Link>
          </li>
          <li className={`flex items-center p-3 rounded-lg transition-colors duration-300 ${location.pathname === "/e-Challan" ? "bg-blue-600 text-white" : "bg-gray-800 hover:bg-blue-600 hover:text-white"}`}>
            <FaFileInvoice className="mr-3" />
            <Link to="/e-Challan" className="block w-full">e-Challan</Link>
          </li>
          <li className={`flex items-center p-3 rounded-lg transition-colors duration-300 ${location.pathname === "/add-police" ? "bg-blue-600 text-white" : "bg-gray-800 hover:bg-blue-600 hover:text-white"}`}>
            <FaUsers className="mr-3" />
            <Link to="/add-police" className="block w-full">Add Police</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
