import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../scenes/login";

function PublicRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      {/* <Route path="/invoices" element={<Invoices />} /> */}
    </Routes>
  );
}

export default PublicRoutes;
