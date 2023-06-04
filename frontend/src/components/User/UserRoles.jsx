import React from "react";

// apis
import { useGetUserRolesQuery } from "../../apis/authApi";

const UserRoles = ({ callback, selected, memberId }) => {
  // get user roles
  const { data: userRoles } = useGetUserRolesQuery();

  return (
    <div class="field" style={{ margin: 0 }}>
      <div class="select is-small">
        <select
          disabled={
            localStorage.getItem("org_role") == 4 ||
            localStorage.getItem("org_role") == 3
          }
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
