import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './screens/LoginPage';
import SignupPage from './screens/SignupPage';
import AdminHomePage from './screens/AdminHomePage';
import HomePage from './screens/HomePage';
import AddPolicePage from './screens/AddPolicePage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/admin/home" element={<AdminHomePage />} />
          <Route path="/admin/assign-police-role" element={<AddPolicePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;