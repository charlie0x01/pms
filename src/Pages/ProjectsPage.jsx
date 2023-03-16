import React from "react";
import ButtonWithDrawer from "../components/common/ButtonWithDrawer";
import FlexCard from "../components/common/FlexCard";
import ProjectCard from "../components/common/ProjectCard";

// antd
import { Button, Form, Input } from "antd";

const members = [
  "https://joesch.moe/api/v1/random?key=1",
  "https://joesch.moe/api/v1/random?key=1",
  "https://joesch.moe/api/v1/random?key=1",
  "https://joesch.moe/api/v1/random?key=1",
];

const ProjectsPage = () => {
  return (
    <FlexCard>
      <ButtonWithDrawer drawerTitle="Create New Project" buttonStyles={{ width: 300, height: "185px"}} buttonChildren={<p>Create New Project</p>} />
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
