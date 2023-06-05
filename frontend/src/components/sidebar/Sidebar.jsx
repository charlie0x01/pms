// import { Menu } from "antd";
import React, { useEffect, useState } from "react";
import { GrAdd } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

import SideBarItem from "./SideBarItem";
import AddOrganization from "../Organization/AddOrganization";
import NewProject from "../Project/NewProject";
import LoadingSpinner from "../common/LoadingSpinner";
import { message } from "antd";
import AddProject from "../Project/AddProject";
// import UpdateOrganization from "../Organization/EditOrganization";
// apis
// import { useGetProjectsQuery } from "../../apis/projectApi";
import { useGetOrganizationsQuery } from "../../apis/orgApi";
// global state
import { useDispatch } from "react-redux";
import { setOrg, setOrgs } from "../../features/orgSlice";

const Sidebar = () => {
  const navigate = useNavigate();
  const [messageApi, contextHandler] = message.useMessage();
  const dispatch = useDispatch();
  //
  const {
    data: organizations,
    error: orgError,
    isLoading: orgLoading,
  } = useGetOrganizationsQuery(parseInt(localStorage.getItem("user_id")));

  // new organization
  const [addOrg, setAddOrg] = useState(false);
  const [newProject, setNewProject] = useState(false);

  //
  const [editOrg, setEditOrg] = useState(false);

  if (!orgLoading && organizations) {
    dispatch(setOrgs([...organizations?.data]));
    // navigate(`/organization/${organizations?.data[0].org_id}`);
  }
  useEffect(() => {
    if (orgError) {
      if (orgError?.data.message == "no-organizatioins-for-this-user")
        messageApi.info("Create New or Join Existing Organization");
      else messageApi.error(orgError?.data.message);
    }
  }, [orgError]);

  return (
    <>
      {contextHandler}
      <aside id="sidebar" className="sidebar">
        <div className="pt-3 px-1 is-flex is-flex-direction-column is-gap-3">
          <aside className="menu">
            <div className="menu-label ml-2 is-flex is-align-items-center is-justify-content-space-between">
              Organizations
              <div onClick={() => setAddOrg(true)}>
                <span className="icon is-medium is-clickable">
                  <GrAdd />
                </span>
              </div>
            </div>
            {!orgError && (
              <div>
                {orgLoading === true ? (
                  <LoadingSpinner />
                ) : (
                  <ul className="menu-list">
                    {organizations?.data.length > 0 &&
                      organizations?.data.map((org, index) => {
                        // if (org.member === null) {
                        return (
                          <li key={index}>
                            <SideBarItem
                              id={org.org_id}
                              title={org.org_name}
                              link={`/organization/${org.org_id}`}
                            />
                          </li>
                        );
                        // }
                      })}
                  </ul>
                )}
              </div>
            )}
          </aside>
        </div>
      </aside>
      <AddOrganization isOpen={addOrg} setIsOpen={setAddOrg} />
      <AddProject isOpen={newProject} setIsOpen={setNewProject} />
    </>
  );
};

export default Sidebar;
