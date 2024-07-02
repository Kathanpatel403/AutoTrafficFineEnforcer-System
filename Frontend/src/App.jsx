import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './screens/LoginPage';
import SignupPage from './screens/SignupPage';
import AdminHomePage from './screens/AdminHomePage';
import HomePage from './screens/HomePage';
import AddPolicePage from './screens/AddPolicePage';
import DefaultPage from './screens/DefaultPage';
import AdditionalInfoPage from './screens/AdditionalInfopage';
import VehicleDensityCalculationPage from './screens/VehicleDensityCalculationPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<DefaultPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/additional-info" element={<AdditionalInfoPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/admin/home" element={<AdminHomePage />} />
          <Route path="/admin/calculate-density" element={<VehicleDensityCalculationPage />} />
          <Route path="/admin/home" element={<AdminHomePage />} />
          <Route path="/admin/assign-police-role" element={<AddPolicePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;