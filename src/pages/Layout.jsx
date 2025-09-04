import React from "react";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

const Layout = () => {
  return (
    <div>
      <main>
       <NavBar/>
        <main>
          <Outlet />
        </main>
        <Footer />
      </main>
    </div>
  );
};

export default Layout;
