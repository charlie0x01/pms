import React from "react";
import CreateNewProject from "../components/CreateNewButton/CreateNewProject";
import FlexCard from "../components/common/FlexCard";
import ProjectCard from "../components/common/ProjectCard";

const members = [
  "https://joesch.moe/api/v1/random?key=1",
  "https://joesch.moe/api/v1/random?key=1",
  "https://joesch.moe/api/v1/random?key=1",
  "https://joesch.moe/api/v1/random?key=1",
];

const ProjectsPage = () => {
  return (
    <FlexCard>
      <CreateNewProject />
      <ProjectCard
        createdDate="10 Mar 2023"
        title="Project Managment System"
        team={members}
        projectProfile="https://joesch.moe/api/v1/random?key=1"
      />
      <ProjectCard
        createdDate="10 Mar 2023"
        title="Project Managment System"
        team={members}
        projectProfile="https://joesch.moe/api/v1/random?key=1"
      />
      <ProjectCard
        createdDate="10 Mar 2023"
        title="Project Managment System"
        team={members}
        projectProfile="https://joesch.moe/api/v1/random?key=1"
      />
      <ProjectCard
        createdDate="10 Mar 2023"
        title="Project Managment System"
        team={members}
        projectProfile="https://joesch.moe/api/v1/random?key=1"
      />
      <ProjectCard
        createdDate="10 Mar 2023"
        title="Project Managment System"
        team={members}
        projectProfile="https://joesch.moe/api/v1/random?key=1"
      />
    </FlexCard>
  );
};
export default ProjectsPage;
