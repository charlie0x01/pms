import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProjectCard from "../Project/ProjectCard";
import LoadingSpinner from "../common/LoadingSpinner";
import { message } from "antd";
import { IoMdSettings } from "react-icons/io";
import AddProject from "../Project/AddProject";
import EditOrganization from "./EditOrganization";
import { useNavigate } from "react-router-dom";

// apis
import { useGetProjectsQuery } from "../../apis/projectApi";
import { useGetOrganizationQuery } from "../../apis/orgApi";

const ProjectView = () => {
  const [skip, setSkip] = useState(useParams.orgId ? true : false);
  const navigate = useNavigate();
  // edit form
  const [addOrganization, setAddOrganization] = useState(false);
  const [addProject, setAddProject] = useState(false);
  // toast message
  const [messageApi, contextHandler] = message.useMessage();
  // const {isLoading, error, data} = useGetProjectsQuery({ userId: localStorage.getItem("user_id") ,orgId: useParams().orgId});
  const {
    isLoading,
    error,
    data: organization,
  } = useGetOrganizationQuery(useParams().orgId, { skip: skip });

  // set user role for org
  if (localStorage.getItem("user_id") != organization?.data.org_owner) {
    localStorage.setItem("org_role", organization?.data.om_role_id);
  } else localStorage.removeItem("org_role");

  // load projects
  const {
    data: projects,
    error: projectError,
    isLoading: projectLoading,
  } = useGetProjectsQuery(useParams().orgId);

  // handling error for org query
  useEffect(() => {
    if (error) {
      messageApi.error(error?.data.message);
      navigate("/");
    }
  }, [isLoading]);
  useEffect(() => {
    if (projectError) messageApi.error(projectError?.data.message);
  }, [projectLoading]);
  return (
    <>
      {contextHandler}
      {isLoading === true ? (
        <LoadingSpinner />
      ) : (
        <div className="pt-5 px-3">
          <div className="is-flex is-justify-content-space-between is-align-items-center">
            <h1 className="title is-3">{organization?.data.org_name}</h1>
            <div className="is-flex is-gap-1 is-align-items-center">
              {localStorage.getItem("org_role") == 4 ||
              localStorage.getItem("org_role") == 3 ? (
                <></>
              ) : (
                <button
                  className="button is-primary"
                  onClick={() => setAddProject(true)}
                >
                  New Project
                </button>
              )}
              <button
                className="button is-primary"
                onClick={() => setAddOrganization(true)}
              >
                <span class="icon is-medium is-clickable">
                  <IoMdSettings className="icon-2" />
                </span>
              </button>
            </div>
          </div>
          <div className="is-flex is-flex-wrap-wrap p-3 is-gap-2">
            {!projectLoading &&
              projects?.data &&
              projects?.data.map((project, index) => {
                return (
                  <ProjectCard
                    key={index}
                    title={project.project_title}
                    description={project.description}
                    date={project.created_date.slice(0, 10)}
                    id={project.project_id}
                    link={`/kanban/${project.project_id}`}
                  />
                );
              })}
          </div>
        </div>
      )}
      <footer
        class="footer p-4 has-background-info"
        style={{ position: "absolute", bottom: 1, width: "100%" }}
      ></footer>
      <EditOrganization
        data={organization?.data}
        isOpen={addOrganization}
        setIsOpen={setAddOrganization}
      />
      <AddProject setIsOpen={setAddProject} isOpen={addProject} />
    </>
  );
};

export default ProjectView;
