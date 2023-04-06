import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../scenes/login";

function LoginRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      {/* <Route path="/invoices" element={<Invoices />} /> */}
    </Routes>
  );
}

export default LoginRoutes;
