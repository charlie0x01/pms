import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const UserAvatarDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleToggleDropdown = (show) => {
    setIsOpen(show);
  };

  const handleLogout = () => {
    // Handle logout logic
    localStorage.clear();
  };

  return (
    <div className={`dropdown is-right ${isOpen ? "is-active" : ""} mr-3`}>
      <div className="dropdown-trigger">
        <div
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onMouseEnter={() => handleToggleDropdown(true)}
          onMouseLeave={() => handleToggleDropdown(false)}
        >
          <figure class="image is-32x32">
            <img
              class="is-rounded"
              src={
                localStorage.getItem("profile_picture") ||
                "https://bulma.io/images/placeholders/128x128.png"
              }
            />
          </figure>
        </div>
      </div>
      <div
        className="dropdown-menu"
        id="dropdown-menu"
        role="menu"
        onMouseEnter={() => handleToggleDropdown(true)}
        onMouseLeave={() => handleToggleDropdown(false)}
      >
        <div className="dropdown-content">
          <Link className="dropdown-item" to="/user-profile">
            Profile
          </Link>
          <Link className="dropdown-item" to="/user-profile-settings">
            Settings
          </Link>
          <hr className="dropdown-divider" />
          <Link className="dropdown-item" to="/signin" onClick={handleLogout}>
            Logout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserAvatarDropdown;
