// import { Menu } from "antd";
import React, { useEffect, useState } from "react";
import { GrAdd } from "react-icons/gr";

import "./Sidebar.css";
import SideBarItem from "./SideBarItem";
import NewOrganization from "../Organization/NewOrganization";
import NewProject from "../project/NewProject";
import { useGetOrganizationsQuery } from "../../apis/orgApi";
import LoadingSpinner from "../common/LoadingSpinner";

const Sidebar = () => {
  // new organization
  const [newOrganization, setNewOrganization] = useState(false);
  const [newProject, setNewProject] = useState(false);

  const { data, error, isLoading } = useGetOrganizationsQuery(
    parseInt(localStorage.getItem("user_id"))
  );

  return (
    <>
      <aside
        id="sidebar"
        className="menu sidebar pt-3 px-1 is-flex is-flex-direction-column is-gap-3"
      >
        <aside className="menu">
          <div className="menu-label ml-2 is-flex is-align-items-center is-justify-content-space-between">
            Organizations
            <div onClick={() => setNewOrganization(true)}>
              <span className="icon is-medium is-clickable">
                <GrAdd />
              </span>
            </div>
          </div>
          {isLoading === true ? (
            <LoadingSpinner />
          ) : (
            <ul className="menu-list">
              {data.data.length > 0 &&
                data.data.map((org, index) => {
                  return (
                    <li key={index}>
                      <SideBarItem title={org.org_name} />
                    </li>
                  );
                })}
            </ul>
          )}
        </aside>
        <aside className="menu">
          <div className="menu-label ml-2 is-flex is-align-items-center is-justify-content-space-between">
            Projects
            <div onClick={() => setNewProject(true)}>
              <span className="icon is-clickable">
                <GrAdd />
              </span>
            </div>
          </div>
          <ul className="menu-list">
            <SideBarItem title="change color" />
            <SideBarItem title="FYP" />
          </ul>
        </aside>
      </aside>
      <NewOrganization
        isOpen={newOrganization}
        setIsOpen={setNewOrganization}
      />
      <NewProject isOpen={newProject} setIsOpen={setNewProject} />
    </>
  );
};

export default Sidebar;
