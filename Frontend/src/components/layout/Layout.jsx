import React from "react";
import FlexCard from "../common/FlexCard";
import Navbar from "../common/Navbar";
import Sidebar from "../common/sidebar/Sidebar";

const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="is-flex">
        <Sidebar />
        <FlexCard></FlexCard>
      </div>
    </>
  );
};

export default Layout;
