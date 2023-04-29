import React from "react";
import Navbar from "../../components/common/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import KanbanBoard from "../Kanban/KanbanBoard";

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
            overflow: "auto"
          }}
        >
          <KanbanBoard />
        </div>
      </div>
    </>
  );
};

export default Layout;
