import { Outlet } from "react-router-dom";
import Topbar from "../scenes/global/Topbar";
import Sidebar from "../scenes/global/Sidebar";
import { useState } from "react";

const Layout = () => {
  const [isSidebar, setIsSidebar] = useState(false);
  return (
    <div className="app">
      <Sidebar isSidebar={isSidebar} req />
      <main className="content">
        <Topbar setIsSidebar={setIsSidebar} />
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
