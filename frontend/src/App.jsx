import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import IndividualForm from "./pages/IndividualForm";
import OrganizationForm from "./pages/OrganizationForm";
import HomePage from "./pages/HomePage";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/individual" element={<IndividualForm />} />
        <Route path="/organization" element={<OrganizationForm />} />
      </Routes>
    </Router>
  );
};

export default App;
