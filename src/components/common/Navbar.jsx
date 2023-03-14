import React from "react";

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
      className="px-5"
      style={{
        minHeight: "60px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
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
      <div>
        <button className="button">hello</button>
      </div>
    </nav>
  );
};

export default Navbar;
