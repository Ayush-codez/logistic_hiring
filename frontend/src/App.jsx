import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import IndividualForm from "./pages/IndividualForm";
import OrganizationForm from "./pages/OrganizationForm";
import HomePage from "./pages/HomePage";
import "./App.css";
import Success from "./pages/Success";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/individual" element={<IndividualForm />} />
      <Route path="/organization" element={<OrganizationForm />} />
      <Route path="/success" element={<Success />} />
    </Routes>
  );
};

export default App;
