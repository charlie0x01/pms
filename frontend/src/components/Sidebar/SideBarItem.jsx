import React, { useState, useEffect } from "react";
import Avatar from "react-avatar";
import { Link } from "react-router-dom";

const SideBarItem = ({ id, title, link, src }) => {
  const [show, setShow] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleDropdown = (show) => {
    setShow(show);
  };
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Link
        to={link}
        className="is-relative"
        style={{ padding: 5 }}
        onMouseEnter={() => handleToggleDropdown(true)}
        onMouseLeave={() => handleToggleDropdown(false)}
      >
        <div>
          <div className="is-flex is-gap-2 is-align-items-center">
            <Avatar
              name={title.replace(" ", "")}
              size="40"
              round="10px"
              textSizeRatio={1.9}
              style={{ borderRadius: "12px" }}
              src={src}
            />
            <h1 className="subtitle is-6 m-0" style={{ fontWeight: 500 }}>
              {title}
            </h1>
          </div>
        </div>
        <div></div>
      </Link>
    </>
  );
};

export default SideBarItem;
