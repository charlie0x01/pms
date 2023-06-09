import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserAvatarDropdown from "./AvatarDropdown";
import JoinButton from "./JoinButton";
import Broadcast from "./Broadcast/Broadcast";
import { FaRegBell } from "react-icons/fa";
// image
import logo from "../../assets/logo/logo.png";

import { useGetNotificationsQuery } from "../../apis/notificationsApi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // load notifications
  const { data: notifications } = useGetNotificationsQuery();
  const navigate = useNavigate();
  // toggle sidebar
  const toggelSidebar = () => {
    const sidebar = document.getElementById("sidebar");
    if (sidebar.classList.contains("sidebar-show"))
      sidebar.classList.remove("sidebar-show");
    else sidebar.classList.add("sidebar-show");
  };
  return (
    <>
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
          <a className="navbar-item is-flex" href="/">
            <img className="mr-2" src={logo} width="28" height="28" />
            <p className="subtitle" style={{ fontWeight: "600" }}>
              Taskify
            </p>
          </a>
        </div>
        <div className="is-flex is-align-items-center is-gap-0">
          <JoinButton />
          <Broadcast />
          <span
            className="is-clickable icon is-large is-relative"
            onClick={() => navigate("/user-profile")}
          >
            <FaRegBell />
            {notifications?.data.length > 0 && (
              <span
                style={{
                  backgroundColor: "red",
                  color: "white",
                  borderRadius: "50%",
                  padding: ".5px 5px .5px 5px",
                  fontSize: 12,
                  position: "absolute",
                  top: 1.5,
                  right: 8,
                }}
              >
                {notifications?.data.length}
              </span>
            )}
          </span>
          <UserAvatarDropdown />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
