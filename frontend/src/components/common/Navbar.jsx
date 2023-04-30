import React from "react";
import { Link } from "react-router-dom";

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
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">
            <figure class="image is-32x32">
              <img
                class="is-rounded"
                src="https://gravatar.com/avatar/7c342a08c9d97caf7be169a201457a79?s=200&d=robohash&r=x"
                alt="User Avatar"
              />
            </figure>
          </a>

          <div class="navbar-dropdown">
            <Link class="navbar-item" to="/user-profile">
              Profile
            </Link>
            <a class="navbar-item" href="#">
              Settings
            </a>
            <hr class="navbar-divider" />
            <a class="navbar-item" href="#">
              Logout
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
