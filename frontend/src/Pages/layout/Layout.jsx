import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="is-flex body-container">
        <Sidebar />
        <div
          style={{
            width: "100%",
            margin: "20px",
            borderRadius: "8px",
            overflow: "auto",
          }}
        >
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
