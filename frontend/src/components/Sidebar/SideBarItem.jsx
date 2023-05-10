import React from "react";
import Avatar from "react-avatar";
import { Link } from "react-router-dom";

const SideBarItem = ({ title, link, src }) => {
  return (
    <Link to={link}>
      <div className="is-flex is-gap-2 is-align-items-center">
        <Avatar
          name={title}
          size="40"
          textSizeRatio={1.90}
          style={{ borderRadius: "12px" }}
          src={src}
        />
        <h1 className="subtitle is-6" style={{ fontWeight: 500 }}>
          {title}
        </h1>
      </div>
    </Link>
  );
};

export default SideBarItem;
