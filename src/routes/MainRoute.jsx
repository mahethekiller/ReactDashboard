import React from "react";
import { Route, Routes } from "react-router-dom";
import RequireAuth from "../components/RequireAuth";
import Layout from "../components/Layout";
import Dashboard from "../scenes/dashboard";
import Team from "../scenes/team";
import Calendar from "../scenes/calendar";
// import Team from "../scenes/team";
// import Invoices from "../scenes/invoices";
import Contacts from "../scenes/contacts";
// import Bar from "../scenes/bar";
import Form from "../scenes/form";
import Login from "../scenes/login";
import Employees from "../scenes/employees";
// import Line from "../scenes/line";
// import Pie from "../scenes/pie";
// import FAQ from "../scenes/faq";
// import Geography from "../scenes/geography";

function MainRoute() {
  return (
    <Routes>
      <Route element={<RequireAuth />}>
        <Route path="/" element={<Layout />}>
          {/* Protected Routes */}

          <Route path="/" element={<Dashboard />} />
          <Route path="/team" element={<Team />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/contacts" element={<Contacts />} />
          {/* <Route path="/invoices" element={<Invoices />} /> */}
          <Route path="/form" element={<Form />} />
          {/* <Route path="/bar" element={<Bar />} /> */}
          {/* <Route path="/pie" element={<Pie />} /> */}
          {/* <Route path="/line" element={<Line />} /> */}
          {/* <Route path="/faq" element={<FAQ />} /> */}
          <Route path="/calendar" element={<Calendar />} />
          {/* <Route path="/geography" element={<Geography />} /> */}
        </Route>
      </Route>
      {/* DEFAULT */}
      {/* <Route path="*" element={<Page404 />} /> */}
    </Routes>
  );
}

export default MainRoute;
