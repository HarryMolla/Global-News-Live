import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

const Layout = () => {
  return (
    <div
      className="bg-blue-50/60 dark:bg-blue-900/5 min-h-screen flex flex-col  "
    >
      <NavBar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
