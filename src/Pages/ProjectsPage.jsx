import React from "react";
import FlexCard from "../components/common/FlexCard";
import ProjectCard from "../components/common/DetailCard";
import { useState } from "react";

import { Drawer, Button, message } from "antd";

const members = [
  "https://joesch.moe/api/v1/random?key=1",
  "https://joesch.moe/api/v1/random?key=1",
  "https://joesch.moe/api/v1/random?key=1",
  "https://joesch.moe/api/v1/random?key=1",
];

const ProjectsPage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const handleEdit = () => {
    setIsEdit(true);
    setIsDrawerOpen(true);
  };
  return (
    <>
      <FlexCard>
        <Button
          type="dashed"
          style={{ width: 350, height: 185 }}
          onClick={() => setIsDrawerOpen(true)}
        >
          Create New Project
        </Button>
        <ProjectCard
          id={1}
          createdDate="10 Mar 2023"
          title="Project Managment System"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit."
          team={members}
          projectProfile="https://joesch.moe/api/v1/random?key=1"
          onEdit={handleEdit}
        />
        <ProjectCard
          id={2}
          createdDate="10 Mar 2023"
          title="Project Managment System"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit."
          team={members}
          projectProfile="https://joesch.moe/api/v1/random?key=1"
        />
        <ProjectCard
          id={3}
          createdDate="10 Mar 2023"
          title="Project Managment System"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit."
          team={members}
          projectProfile="https://joesch.moe/api/v1/random?key=1"
        />
        <ProjectCard
          id={4}
          createdDate="10 Mar 2023"
          title="Project Managment System"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit."
          team={members}
          projectProfile="https://joesch.moe/api/v1/random?key=1"
        />
        <ProjectCard
          id={5}
          createdDate="10 Mar 2023"
          title="Project Managment System"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit."
          team={members}
          projectProfile="https://joesch.moe/api/v1/random?key=1"
        />
      </FlexCard>
      <Drawer
        width={500}
        title={isEdit ? "Edit Project" : "Create New Project"}
        open={isDrawerOpen}
        closable
        onClose={() => {
          setIsEdit(false);
          setIsDrawerOpen(false);
        }}
      ></Drawer>
    </>
  );
};
export default ProjectsPage;
