// // import React from "react";
// // import Sidebar from "./components/sidebar";
// // import Dashboard from "./pages/Dashboard";

// // const App = () => {
// //   return (
// //     <div className="flex">
// //       <Sidebar />
// //       <Dashboard />
// //     </div>
// //   );
// // };

// // export default App;

// // import React from "react";
// // import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// // import Sidebar from "./components/sidebar";
// // import Dashboard from "./pages/Dashboard";
// // import SignalAdjustment from "./pages/SignalAdjustment";

// // const App = () => {
// //   return (
// //     <Router>
// //       <div className="flex">
// //         <Sidebar />  {/* Fixed Sidebar */}
// //         <div className="flex-1">
// //           <Routes>
// //             <Route path="/dashboard" element={<Dashboard />} />
// //             <Route path="/signal-adjustment" element={<SignalAdjustment />} />
// //             {/* Add more routes if needed */}
// //           </Routes>
// //         </div>
// //       </div>
// //     </Router>
// //   );
// // };

// // export default App;

// // src/App.jsx
// // import React from 'react';
// // import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// // import Sidebar from './components/sidebar';
// // import Dashboard from './pages/Dashboard';
// // import SignalAdjustment from './pages/SignalAdjustment';

// // function App() {
// //   return (
// //     <Router>
// //       <div className="flex">
// //         {/* Fixed Sidebar */}
// //         <Sidebar />
        
// //         {/* Main content area */}
// //         <div className="flex-1 flex flex-col">
// //           {/* Fixed Dashboard */}
// //           <Dashboard />
          
// //           {/* Dynamic content area */}
// //           <div className="p-8 flex-1 bg-gray-100">
// //             <Routes>
// //               <Route path="/signal-adjustment" element={<SignalAdjustment />} />
// //               {/* Add more routes here as needed */}
// //             </Routes>
// //           </div>
// //         </div>
// //       </div>
// //     </Router>
// //   );
// // }

// // export default App;

// // src/App.jsx
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Sidebar from './components/sidebar';
// import Dashboard from './pages/Dashboard';
// import SignalAdjustment from './pages/SignalAdjustment';
// import ANPRPage from './pages/anpr';
// import EChallanPage from './pages/e-Challan';

// const App = () => {
//   return (
//     <Router>
//       <div className="flex bg-[#dfefff]">
//         {/* Fixed Sidebar */}
//         <Sidebar />

//         {/* Dynamic Content Area */}
//         <div className="flex-1 p-4 bg-[#dfefff] min-h-screen">
//           <Routes>
//             <Route path="/dashboard" element={<Dashboard />} />
//             <Route path="/signal-adjustment" element={<SignalAdjustment />} />
//             <Route path="/ANPR" element={<ANPRPage />} />
//             <Route path="/e-Challan" element={<EChallanPage />} />
//           </Routes>
//         </div>
//       </div>
//     </Router>
//   );
// };

// export default App;





import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/sidebar';
import Dashboard from './pages/Dashboard';
import SignalAdjustment from './pages/SignalAdjustment';
import ANPRPage from './pages/anpr';
import EChallanPage from './pages/e-Challan';
import LoginPage from './pages/Login';
import AddPolicePage from './pages/addPolice';

const isAuthenticated = () => {
  return true; // Set this to true if the user is logged in
};

const App = () => {
  return (
    <Router>
      <div className="flex bg-[#dfefff]">
        {/* Fixed Sidebar */}
        {isAuthenticated() ? <Sidebar /> : null}

        {/* Dynamic Content Area */}
        <div className="flex-1 bg-[#dfefff] min-h-screen">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/dashboard"
              element={isAuthenticated() ? <Dashboard /> : <Navigate to="/login" />}
            />
            <Route
              path="/signal-adjustment"
              element={isAuthenticated() ? <SignalAdjustment /> : <Navigate to="/login" />}
            />
            <Route
              path="/ANPR"
              element={isAuthenticated() ? <ANPRPage /> : <Navigate to="/login" />}
            />
            <Route
              path="/e-Challan"
              element={isAuthenticated() ? <EChallanPage /> : <Navigate to="/login" />}
            />
            <Route
              path="/add-police"
              element={isAuthenticated() ? <AddPolicePage /> : <Navigate to="/login" />}
            />
            {/* Redirect all other routes to login if not authenticated */}
            <Route
              path="*"
              element={<Navigate to={isAuthenticated() ? "/dashboard" : "/login"} />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
