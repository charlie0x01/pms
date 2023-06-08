import React from "react";

// apis
import { useGetUserRolesQuery } from "../../apis/authApi";

const UserRoles = ({ callback, selected, isOwnerOrAdmin }) => {
  // const isOwnerOrAdmin =
  //   localStorage.getItem("org_role") == 2 ||
  //   localStorage.getItem("org_role") == null;
  // const isProjectOwnerOrAdmin =
  //   localStorage.getItem("project_role") == 2 ||
  //   localStorage.getItem("project_role") == null;
  // get user roles
  const { data: userRoles } = useGetUserRolesQuery();

  return (
    <div class="field" style={{ margin: 0 }}>
      <div class="select is-small">
        <select
          disabled={!isOwnerOrAdmin}
          onChange={({ target: { value } }) => callback(value)}
        >
          <option>Select User Role</option>

          {userRoles &&
            userRoles?.data.map((role, index) => {
              return (
                <option
                  selected={selected === role.role_id}
                  value={role.role_id}
                  key={index}
                >
                  {role.role_title}
                </option>
              );
            })}
        </select>
      </div>
    </div>
  );
};

export default UserRoles;
