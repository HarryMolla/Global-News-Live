import React from "react";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

const Layout = () => {
  return (
    <div className="bg-blue-50/40  min-h-screen flex flex-col  ">
       <NavBar/>
        <main>
          <Outlet />
        </main>
        <Footer />
    </div>
  );
};

export default Layout;
