


// import React, { useMemo } from "react";
// import { useTable, useSortBy, useGlobalFilter, usePagination } from "react-table";
// import { Input } from "@nextui-org/react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//     faSearch,
//     faSort,
//     faSortUp,
//     faSortDown,
//     faEye,
//     faEdit,
//     faTrash,
//     faCar,
//     faIdCardAlt,
//     faGasPump,
//     faCarSide,
//     faIdCard,
//     faMapMarkedAlt,
//     faMobileAlt,
//     faCogs,
//     faUser,
//     faTools,
//     faAngleDoubleLeft,
//     faAngleLeft,
//     faAngleRight,
//     faAngleDoubleRight,
    
//   } from "@fortawesome/free-solid-svg-icons";
//   import bg from '../../../assets/images/bg17.jpg';
// const VehicleTable = ({ data }) => {
//     const columns = useMemo(() => [
//         {
//           Header: () => (
//             <div className="flex items-center">
//                  <FontAwesomeIcon icon={faCar} className="mr-2" />
//               <span>License Plate No</span>
             
//             </div>
//           ),
//           accessor: "licence_plate_no",
//           icon: faCar,
//         },
//         // {
//         //   Header: () => (
//         //     <div className="flex items-center">
//         //         <FontAwesomeIcon icon={faIdCardAlt} className="mr-2" />
//         //       <span>RC No</span>
              
//         //     </div>
//         //   ),
//         //   accessor: "rc_no",
//         //   icon: faIdCardAlt,
//         // },
//         // {
//         //   Header: () => (
//         //     <div className="flex items-center">
//         //          <FontAwesomeIcon icon={faGasPump} className="mr-2" />
//         //       <span>Fuel Type</span>
             
//         //     </div>
//         //   ),
//         //   accessor: "fuel_type",
//         //   icon: faGasPump,
//         // },
//         // {
//         //   Header: () => (
//         //     <div className="flex items-center">
//         //         <FontAwesomeIcon icon={faCarSide} className="mr-2" />
//         //       <span>Vehicle Type</span>
              
//         //     </div>
//         //   ),
//         //   accessor: "vehicle_type",
//         //   icon: faCarSide,
//         // },
//         {
//           Header: () => (
//             <div className="flex items-center">
//                  <FontAwesomeIcon icon={faIdCard} className="mr-2" />
//               <span>Aadhar Card No</span>
             
//             </div>
//           ),
//           accessor: "aadharcard_number",
//           icon: faIdCard,
//         },
//         {
//           Header: () => (
//             <div className="flex items-center">
//                   <FontAwesomeIcon icon={faMapMarkedAlt} className="mr-2" />
//               <span>Address</span>
            
//             </div>
//           ),
//           accessor: "address",
//           Cell: ({ value }) => (
//             <div className="whitespace-pre-wrap break-all">
//               {`${value.street}, ${value.area}, ${value.city}, ${value.state}, ${value.postal_code}`}
//             </div>
//           ),
//           icon: faMapMarkedAlt,
//         },
//         {
//           Header: () => (
//             <div className="flex items-center">
//                 <FontAwesomeIcon icon={faMobileAlt} className="mr-2" />
//               <span>Mobile No</span>
              
//             </div>
//           ),
//           accessor: "mobile_no",
//           icon: faMobileAlt,
//         },
//         // {
//         //   Header: () => (
//         //     <div className="flex items-center">
//         //          <FontAwesomeIcon icon={faCogs} className="mr-2" />
//         //       <span>Chassis No</span>
             
//         //     </div>
//         //   ),
//         //   accessor: "chesis_no",
//         //   icon: faCogs,
//         // },
//         {
//           Header: () => (
//             <div className="flex items-center">
//                  <FontAwesomeIcon icon={faUser} className="mr-2" />
//               <span>Owner Name</span>
             
//             </div>
//           ),
//           accessor: "owner_name",
//           Cell: ({ value }) => (
//             <div className="whitespace-pre-wrap break-all">{`${value.first_name}\n${value.last_name}`}</div> // New line between first_name and last_name
//           ),
//           icon: faUser,
//         },
//         // {
//         //   Header: () => (
//         //     <div className="flex items-center">
//         //          <FontAwesomeIcon icon={faTools} className="mr-2" />
//         //       <span>Engine No</span>
             
//         //     </div>
//         //   ),
//         //   accessor: "engine_no",
//         //   icon: faTools,
//         // },
//         {
//           Header: "Actions",
//           accessor: "actions",
//           Cell: ({ row }) => (
//             <div className="flex justify-center space-x-2">
//               <FontAwesomeIcon icon={faEye} className="text-blue-500 cursor-pointer hover:text-blue-700" />
//               <FontAwesomeIcon icon={faEdit} className="text-yellow-500 cursor-pointer hover:text-yellow-700" />
//               <FontAwesomeIcon icon={faTrash} className="text-red-500 cursor-pointer hover:text-red-700" />
//             </div>
//           ),
//         },
//       ], []);

//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     page,
//     prepareRow,
//     state,
//     setGlobalFilter,
//     gotoPage,
//     nextPage,
//     previousPage,
//     canNextPage,
//     canPreviousPage,
//     pageOptions,
//     pageCount,
//     setPageSize,
//   } = useTable(
//     { columns, data, initialState: { pageIndex: 0, pageSize: 10 } },
//     useGlobalFilter,
//     useSortBy,
//     usePagination
//   );

//   const { globalFilter, pageIndex, pageSize } = state;

//   return (
//     <div className="p-4" style={{
//       backgroundImage: `url(${bg})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover'
//   }}>
//       {/* <Input
//         clearable
//         underlined
//         placeholder="Search..."
//         value={globalFilter || ""}
//         onChange={(e) => setGlobalFilter(e.target.value)}
//         className="mb-4"
//         contentLeft={<FontAwesomeIcon icon={faSearch} />}
//       /> */}
//       <div className="overflow-x-auto w-[1400px] ml-10">
//         <table
//           {...getTableProps()}
//           className="min-w-full bg-gradient-to-br from-[#bed8e7] to-[#74a3c0] rounded-lg overflow-hidden border-2 border-gray-300"
//         >
//           <thead className="bg-[#79a8c5] text-white">
//             {headerGroups.map((headerGroup) => (
//               <tr {...headerGroup.getHeaderGroupProps()} className="text-left">
//                 {headerGroup.headers.map((column) => (
//                   <th
//                     {...column.getHeaderProps(column.getSortByToggleProps())}
//                     className="px-6 py-3 text-xs font-medium uppercase tracking-wider border-b-2 border-blue-600"
//                   >
//                     <div className="flex items-center justify-between">
//                       <span>{column.render("Header")}</span>
//                       <span>
//                         {column.isSorted ? (
//                           column.isSortedDesc ? (
//                             <FontAwesomeIcon icon={faSortDown} className="ml-1" />
//                           ) : (
//                             <FontAwesomeIcon icon={faSortUp} className="ml-1" />
//                           )
//                         ) : (
//                           <FontAwesomeIcon icon={faSort} className="ml-1" />
//                         )}
//                       </span>
//                     </div>
//                   </th>
//                 ))}
//               </tr>
//             ))}
//           </thead>
//           <tbody {...getTableBodyProps()} className="divide-y divide-gray-200">
//             {page.map((row, rowIndex) => {
//               prepareRow(row);
//               return (
//                 <tr
//                   {...row.getRowProps()}
//                   className="hover:bg-gray-100 transition-colors duration-200"
//                   style={{
//                     backgroundColor: rowIndex % 2 === 0 ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.7)",
//                   }}
//                 >
//                   {row.cells.map((cell) => (
//                     <td
//                       {...cell.getCellProps()}
//                       className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 border-b-2 border-gray-300"
//                     >
//                       {cell.render("Cell")}
//                     </td>
//                   ))}
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//       {/* Pagination */}
//       <div className="mt-4 flex justify-between items-center ml-96">
//   <div className="flex items-center space-x-4">
//     <span className="text-gray-700">
//       Page <strong>{pageIndex + 1}</strong> of <strong>{pageOptions.length}</strong>
//     </span>
//     <select
//       value={pageSize}
//       onChange={(e) => setPageSize(Number(e.target.value))}
//       className="px-3 py-1 border rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//       style={{ backgroundColor: '#F3F4F6' }} // Light gray background
//     >
//       {[10, 20, 30, 40, 50].map((pageSize) => (
//         <option key={pageSize} value={pageSize}>
//           Show {pageSize}
//         </option>
//       ))}
//     </select>
//   </div>
//   <div className="flex space-x-4 mr-96 pr-56">
//     <button
//       onClick={() => gotoPage(0)}
//       disabled={!canPreviousPage}
//       className={`px-3 py-1 border rounded-md ${
//         !canPreviousPage ? "opacity-50 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"
//       }`}
//     >
//       <FontAwesomeIcon icon={faAngleDoubleLeft} />
//     </button>
//     <button
//       onClick={() => previousPage()}
//       disabled={!canPreviousPage}
//       className={`px-3 py-1 border rounded-md ${
//         !canPreviousPage ? "opacity-50 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"
//       }`}
//     >
//       <FontAwesomeIcon icon={faAngleLeft} />
//     </button>
//     <button
//       onClick={() => nextPage()}
//       disabled={!canNextPage}
//       className={`px-3 py-1 border rounded-md ${
//         !canNextPage ? "opacity-50 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"
//       }`}
//     >
//       <FontAwesomeIcon icon={faAngleRight} />
//     </button>
//     <button
//       onClick={() => gotoPage(pageCount - 1)}
//       disabled={!canNextPage}
//       className={`px-3 py-1 border rounded-md ${
//         !canNextPage ? "opacity-50 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"
//       }`}
//     >
//       <FontAwesomeIcon icon={faAngleDoubleRight} />
//     </button>
//   </div>
// </div>


//     </div>
//   );
// };

// export default VehicleTable;




// // import React, { useMemo } from "react";
// // import { useTable, useSortBy, useGlobalFilter, usePagination } from "react-table";
// // import { Input } from "@nextui-org/react";
// // import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// // import {
// //     faSearch,
// //     faSort,
// //     faSortUp,
// //     faSortDown,
// //     faEye,
// //     faEdit,
// //     faTrash,
// //     faCar,
// //     faIdCardAlt,
// //     faGasPump,
// //     faCarSide,
// //     faIdCard,
// //     faMapMarkedAlt,
// //     faMobileAlt,
// //     faCogs,
// //     faUser,
// //     faTools,
// //     faAngleDoubleLeft,
// //     faAngleLeft,
// //     faAngleRight,
// //     faAngleDoubleRight,
    
// //   } from "@fortawesome/free-solid-svg-icons";

// // const VehicleTable = ({ data }) => {
// //     const columns = useMemo(() => [
// //         {
// //           Header: () => (
// //             <div className="flex items-center">
// //                  <FontAwesomeIcon icon={faCar} className="mr-2" />
// //               <span>License Plate No</span>
             
// //             </div>
// //           ),
// //           accessor: "licence_plate_no",
// //           icon: faCar,
// //         },
// //         {
// //           Header: () => (
// //             <div className="flex items-center">
// //                 <FontAwesomeIcon icon={faIdCardAlt} className="mr-2" />
// //               <span>RC No</span>
              
// //             </div>
// //           ),
// //           accessor: "rc_no",
// //           icon: faIdCardAlt,
// //         },
// //         {
// //           Header: () => (
// //             <div className="flex items-center">
// //                  <FontAwesomeIcon icon={faGasPump} className="mr-2" />
// //               <span>Fuel Type</span>
             
// //             </div>
// //           ),
// //           accessor: "fuel_type",
// //           icon: faGasPump,
// //         },
// //         {
// //           Header: () => (
// //             <div className="flex items-center">
// //                 <FontAwesomeIcon icon={faCarSide} className="mr-2" />
// //               <span>Vehicle Type</span>
              
// //             </div>
// //           ),
// //           accessor: "vehicle_type",
// //           icon: faCarSide,
// //         },
// //         {
// //           Header: () => (
// //             <div className="flex items-center">
// //                  <FontAwesomeIcon icon={faIdCard} className="mr-2" />
// //               <span>Aadhar Card No</span>
             
// //             </div>
// //           ),
// //           accessor: "aadharcard_number",
// //           icon: faIdCard,
// //         },
// //         {
// //           Header: () => (
// //             <div className="flex items-center">
// //                   <FontAwesomeIcon icon={faMapMarkedAlt} className="mr-2" />
// //               <span>Address</span>
            
// //             </div>
// //           ),
// //           accessor: "address",
// //           Cell: ({ value }) => (
// //             <div className="whitespace-pre-wrap break-all">
// //               {`${value.street}, ${value.area}, ${value.city}, ${value.state}, ${value.postal_code}`}
// //             </div>
// //           ),
// //           icon: faMapMarkedAlt,
// //         },
// //         {
// //           Header: () => (
// //             <div className="flex items-center">
// //                 <FontAwesomeIcon icon={faMobileAlt} className="mr-2" />
// //               <span>Mobile No</span>
              
// //             </div>
// //           ),
// //           accessor: "mobile_no",
// //           icon: faMobileAlt,
// //         },
// //         {
// //           Header: () => (
// //             <div className="flex items-center">
// //                  <FontAwesomeIcon icon={faCogs} className="mr-2" />
// //               <span>Chassis No</span>
             
// //             </div>
// //           ),
// //           accessor: "chesis_no",
// //           icon: faCogs,
// //         },
// //         {
// //           Header: () => (
// //             <div className="flex items-center">
// //                  <FontAwesomeIcon icon={faUser} className="mr-2" />
// //               <span>Owner Name</span>
             
// //             </div>
// //           ),
// //           accessor: "owner_name",
// //           Cell: ({ value }) => (
// //             <div className="whitespace-pre-wrap break-all">{`${value.first_name}\n${value.last_name}`}</div> // New line between first_name and last_name
// //           ),
// //           icon: faUser,
// //         },
// //         {
// //           Header: () => (
// //             <div className="flex items-center">
// //                  <FontAwesomeIcon icon={faTools} className="mr-2" />
// //               <span>Engine No</span>
             
// //             </div>
// //           ),
// //           accessor: "engine_no",
// //           icon: faTools,
// //         },
// //         {
// //           Header: "Actions",
// //           accessor: "actions",
// //           Cell: ({ row }) => (
// //             <div className="flex justify-center space-x-2">
// //               <FontAwesomeIcon icon={faEye} className="text-blue-400 cursor-pointer hover:text-blue-600" />
// //               <FontAwesomeIcon icon={faEdit} className="text-yellow-400 cursor-pointer hover:text-yellow-600" />
// //               <FontAwesomeIcon icon={faTrash} className="text-red-400 cursor-pointer hover:text-red-600" />
// //             </div>
// //           ),
// //         },
// //       ], []);

// //   const {
// //     getTableProps,
// //     getTableBodyProps,
// //     headerGroups,
// //     page,
// //     prepareRow,
// //     state,
// //     setGlobalFilter,
// //     gotoPage,
// //     nextPage,
// //     previousPage,
// //     canNextPage,
// //     canPreviousPage,
// //     pageOptions,
// //     pageCount,
// //     setPageSize,
// //   } = useTable(
// //     { columns, data, initialState: { pageIndex: 0, pageSize: 10 } },
// //     useGlobalFilter,
// //     useSortBy,
// //     usePagination
// //   );

// //   const { globalFilter, pageIndex, pageSize } = state;

// //   return (
// //     <div className="bg-black">
// //     <div className="p-4 text-white pt-28">
// //       <Input
// //         clearable
// //         underlined
// //         placeholder="Search..."
// //         value={globalFilter || ""}
// //         onChange={(e) => setGlobalFilter(e.target.value)}
// //         className="mb-4"
// //         contentLeft={<FontAwesomeIcon icon={faSearch} />}
// //       />
// //       <div className="overflow-x-auto">
// //         <table
// //           {...getTableProps()}
// //           className="min-w-full bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg overflow-hidden border-2 border-gray-600"
// //         >
// //           <thead className="bg-gray-800 text-white">
// //             {headerGroups.map((headerGroup) => (
// //               <tr {...headerGroup.getHeaderGroupProps()} className="text-left">
// //                 {headerGroup.headers.map((column) => (
// //                   <th
// //                     {...column.getHeaderProps(column.getSortByToggleProps())}
// //                     className="px-6 py-3 text-xs font-medium uppercase tracking-wider border-b-2 border-gray-700"
// //                   >
// //                     <div className="flex items-center justify-between">
// //                       <span>{column.render("Header")}</span>
// //                       <span>
// //                         {column.isSorted ? (
// //                           column.isSortedDesc ? (
// //                             <FontAwesomeIcon icon={faSortDown} className="ml-1" />
// //                           ) : (
// //                             <FontAwesomeIcon icon={faSortUp} className="ml-1" />
// //                           )
// //                         ) : (
// //                           <FontAwesomeIcon icon={faSort} className="ml-1" />
// //                         )}
// //                       </span>
// //                     </div>
// //                   </th>
// //                 ))}
// //               </tr>
// //             ))}
// //           </thead>
// //           <tbody {...getTableBodyProps()} className="divide-y divide-gray-700">
// //             {page.map((row, rowIndex) => {
// //               prepareRow(row);
// //               return (
// //                 <tr
// //                   {...row.getRowProps()}
// //                   className="hover:bg-gray-800 transition-colors duration-200"
// //                   style={{
// //                     backgroundColor: rowIndex % 2 === 0 ? "rgba(75,85,99,0.7)" : "rgba(55,65,81,0.7)",
// //                   }}
// //                 >
// //                   {row.cells.map((cell) => (
// //                     <td
// //                       {...cell.getCellProps()}
// //                       className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 border-b-2 border-gray-600"
// //                     >
// //                       {cell.render("Cell")}
// //                     </td>
// //                   ))}
// //                 </tr>
// //               );
// //             })}
// //           </tbody>
// //         </table>
// //       </div>
// //       {/* Pagination */}
// //       <div className="mt-4 flex justify-between items-center ml-96">
// //   <div className="flex items-center space-x-4">
// //     <span className="text-gray-300">
// //       Page <strong>{pageIndex + 1}</strong> of <strong>{pageOptions.length}</strong>
// //     </span>
// //     <select
// //       value={pageSize}
// //       onChange={(e) => setPageSize(Number(e.target.value))}
// //       className="px-3 py-1 border rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-gray-300"
// //     >
// //       {[10, 20, 30, 40, 50].map((pageSize) => (
// //         <option key={pageSize} value={pageSize}>
// //           Show {pageSize}
// //         </option>
// //       ))}
// //     </select>
// //   </div>
// //   <div className="flex space-x-4 mr-96 pr-56">
// //     <button
// //       onClick={() => gotoPage(0)}
// //       disabled={!canPreviousPage}
// //       className={`px-3 py-1 border rounded-md shadow-md ${
// //         canPreviousPage
// //           ? "bg-blue-500 text-white hover:bg-blue-700"
// //           : "bg-gray-500 text-gray-300 cursor-not-allowed"
// //       }`}
// //     >
// //       <FontAwesomeIcon icon={faAngleDoubleLeft} />
// //     </button>
// //     <button
// //       onClick={() => previousPage()}
// //       disabled={!canPreviousPage}
// //       className={`px-3 py-1 border rounded-md shadow-md ${
// //         canPreviousPage
// //           ? "bg-blue-500 text-white hover:bg-blue-700"
// //           : "bg-gray-500 text-gray-300 cursor-not-allowed"
// //       }`}
// //     >
// //       <FontAwesomeIcon icon={faAngleLeft} />
// //     </button>
// //     <button
// //       onClick={() => nextPage()}
// //       disabled={!canNextPage}
// //       className={`px-3 py-1 border rounded-md shadow-md ${
// //         canNextPage
// //           ? "bg-blue-500 text-white hover:bg-blue-700"
// //           : "bg-gray-500 text-gray-300 cursor-not-allowed"
// //       }`}
// //     >
// //       <FontAwesomeIcon icon={faAngleRight} />
// //     </button>
// //     <button
// //       onClick={() => gotoPage(pageCount - 1)}
// //       disabled={!canNextPage}
// //       className={`px-3 py-1 border rounded-md shadow-md ${
// //         canNextPage
// //           ? "bg-blue-500 text-white hover:bg-blue-700"
// //           : "bg-gray-500 text-gray-300 cursor-not-allowed"
// //       }`}
// //     >
// //       <FontAwesomeIcon icon={faAngleDoubleRight} />
// //     </button>
// //   </div>
// // </div>
// //     </div>
// //     </div>
// //   );
// // };

// // export default VehicleTable;


















































import React, { useMemo } from "react";
import { useTable, useSortBy, useGlobalFilter, usePagination } from "react-table";
import { Input } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faSort,
  faSortUp,
  faSortDown,
  faEye,
  faEdit,
  faTrash,
  faCar,
  faIdCard,
  faMapMarkedAlt,
  faMobileAlt,
  faUser,
  faAngleDoubleLeft,
  faAngleLeft,
  faAngleRight,
  faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";
import bg from '../../../assets/images/bg17.jpg';

const VehicleTable = ({ data }) => {
  const columns = useMemo(
    () => [
      {
        Header: () => (
          <div className="flex items-center">
            <FontAwesomeIcon icon={faCar} className="mr-2" />
            <span>License Plate No</span>
          </div>
        ),
        accessor: "licence_plate_no",
      },
      {
        Header: () => (
          <div className="flex items-center">
            <FontAwesomeIcon icon={faIdCard} className="mr-2" />
            <span>Aadhar Card No</span>
          </div>
        ),
        accessor: "aadharcard_number",
      },
      {
        Header: () => (
          <div className="flex items-center">
            <FontAwesomeIcon icon={faMapMarkedAlt} className="mr-2" />
            <span>Address</span>
          </div>
        ),
        accessor: "address",
        Cell: ({ value }) => (
          <div className="whitespace-pre-wrap break-all">
            {`${value.street}, ${value.area}, ${value.city}, ${value.state}, ${value.postal_code}`}
          </div>
        ),
      },
      {
        Header: () => (
          <div className="flex items-center">
            <FontAwesomeIcon icon={faMobileAlt} className="mr-2" />
            <span>Mobile No</span>
          </div>
        ),
        accessor: "mobile_no",
      },
      {
        Header: () => (
          <div className="flex items-center">
            <FontAwesomeIcon icon={faUser} className="mr-2" />
            <span>Owner Name</span>
          </div>
        ),
        accessor: "owner_name",
        Cell: ({ value }) => (
          <div className="whitespace-pre-wrap break-all">{`${value.first_name}\n${value.last_name}`}</div>
        ),
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => (
          <div className="flex justify-center space-x-2">
            <FontAwesomeIcon icon={faEye} className="text-blue-500 cursor-pointer hover:text-blue-700" />
            <FontAwesomeIcon icon={faEdit} className="text-yellow-500 cursor-pointer hover:text-yellow-700" />
            <FontAwesomeIcon icon={faTrash} className="text-red-500 cursor-pointer hover:text-red-700" />
          </div>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state,
    setGlobalFilter,
    gotoPage,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    pageCount,
    setPageSize,
  } = useTable(
    { columns, data, initialState: { pageIndex: 0, pageSize: 10 } },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { globalFilter, pageIndex, pageSize } = state;

  return (
    <div className="p-4">
      
      <div className="overflow-x-auto w-[1400px] ml-10">
        <h1 className="text-center">Table</h1>
        <table
          {...getTableProps()}
          className="min-w-full bg-gradient-to-br from-[#bed8e7] to-[#74a3c0] rounded-lg overflow-hidden border-2 border-gray-300 shadow-lg"
        >
          <thead className="bg-[#79a8c5] text-white">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()} className="text-left">
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="px-6 py-3 text-xs font-medium uppercase tracking-wider border-b-2 border-blue-600"
                  >
                    <div className="flex items-center justify-between">
                      <span>{column.render("Header")}</span>
                      <span>
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <FontAwesomeIcon icon={faSortDown} className="ml-1" />
                          ) : (
                            <FontAwesomeIcon icon={faSortUp} className="ml-1" />
                          )
                        ) : (
                          <FontAwesomeIcon icon={faSort} className="ml-1" />
                        )}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className="divide-y divide-gray-200">
            {page.map((row, rowIndex) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  className="hover:bg-gray-100 transition-colors duration-200"
                  style={{
                    backgroundColor: rowIndex % 2 === 0 ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.7)",
                  }}
                >
                  {row.cells.map((cell) => (
                    <td
                      {...cell.getCellProps()}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 border-b-2 border-gray-300"
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="mt-4 flex justify-between items-center ml-96">
        <div className="flex items-center space-x-4">
          <span className="text-gray-700">
            Page <strong>{pageIndex + 1}</strong> of <strong>{pageOptions.length}</strong>
          </span>
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="px-3 py-1 border rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{ backgroundColor: '#F3F4F6' }} // Light gray background
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
        <div className="flex space-x-4 mr-96 pr-56">
          <button
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
            className={`px-3 py-1 border rounded-md ${
              !canPreviousPage ? "opacity-50 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            <FontAwesomeIcon icon={faAngleDoubleLeft} />
          </button>
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className={`px-3 py-1 border rounded-md ${
              !canPreviousPage ? "opacity-50 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            <FontAwesomeIcon icon={faAngleLeft} />
          </button>
          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className={`px-3 py-1 border rounded-md ${
              !canNextPage ? "opacity-50 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            <FontAwesomeIcon icon={faAngleRight} />
          </button>
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
            className={`px-3 py-1 border rounded-md ${
              !canNextPage ? "opacity-50 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            <FontAwesomeIcon icon={faAngleDoubleRight} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VehicleTable;
