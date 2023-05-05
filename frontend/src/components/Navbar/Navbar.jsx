import React from "react";
import { Link } from "react-router-dom";
import UserAvatarDropdown from "./AvatarDropdown";

const Navbar = () => {
  // toggle sidebar
  const toggelSidebar = () => {
    const sidebar = document.getElementById("sidebar");
    if (sidebar.classList.contains("sidebar-show"))
      sidebar.classList.remove("sidebar-show");
    else sidebar.classList.add("sidebar-show");
  };
  return (
    <nav
      className="px-5 py-2 is-flex is-justify-content-space-between is-algin-items-center"
      style={{
        minHeight: 60,
        boxShadow:
          "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
      }}
    >
      <div style={{ display: "flex" }}>
        <a role="button" onClick={toggelSidebar} className="navbar-burger">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
        <a className="navbar-item" href="/">
          <p className="subtitle" style={{ fontWeight: "600" }}>
            Taskify
          </p>
        </a>
      </div>
      <div style={{ gap: "8px" }} className="is-flex is-align-items-center">
        <UserAvatarDropdown />
      </div>
    </nav>
  );
};

export default Navbar;
