import React from "react";
import ProjectsPage from "../../Pages/ProjectsPage";
import FlexCard from "../common/FlexCard";
import Navbar from "../common/Navbar";
import Sidebar from "../common/sidebar/Sidebar";

const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="is-flex body-container">
        <Sidebar />
        <div
          style={{
            width: "100%",
            // backgroundColor: "#CFD2CF",
            margin: "20px",
            borderRadius: "8px",
          }}
        >
          <ProjectsPage />
        </div>
      </div>
    </>
  );
};

export default Layout;
