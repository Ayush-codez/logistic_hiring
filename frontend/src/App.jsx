// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import IndividualForm from "./pages/IndividualForm";
import OrganizationForm from "./pages/OrganizationForm";
import Success from "./pages/Success";

import LoginPage from "./pages/admin/LoginPage";
import RegisterPage from "./pages/admin/RegisterPage";
import Dashboard from "./pages/admin/Dashboard";
import "./App.css";
import useAdmin from "./context/useAdmin";

const App = () => {
  const { isAuth } = useAdmin();
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/individual" element={<IndividualForm />} />
      <Route path="/organization" element={<OrganizationForm />} />
      <Route path="/success" element={<Success />} />

      {/* Admin Auth */}
      <Route
        path="/admin/login"
        element={!isAuth ? <LoginPage /> : <Dashboard />}
      />
      <Route
        path="/admin/register"
        element={!isAuth ? <RegisterPage /> : <Dashboard />}
      />
      <Route
        path="/admin/dashboard"
        element={isAuth ? <Dashboard /> : <LoginPage />}
      />
    </Routes>
  );
};

export default App;
