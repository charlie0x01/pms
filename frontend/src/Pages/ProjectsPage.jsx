import React, { useState } from "react";
import DrawerPage from "../components/common/DrawerPage";
import ProjectCard from "../components/common/DetailCard";

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
    setIsDrawerOpen(true);
    setIsEdit(true);
  };
  return (
    <DrawerPage
      onClose={() => {
        setIsEdit(false);
        setIsDrawerOpen(false);
      }}
      isOpen={isDrawerOpen}
      setIsOpen={setIsDrawerOpen}
      drawerTitle={isEdit ? "Edit Project" : "Create New Project"}
      buttonStyle={
        {width: 250, height: 185}
      }
      buttonType="dashed"
      buttonChildren={
        <p>Create New Project</p>
      }
    >
      <ProjectCard
        id={1}
        createdDate="10 Mar 2023"
        title="Project Managment System"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit."
        team={members}
        projectProfile="https://joesch.moe/api/v1/random?key=1"
        onEdit={handleEdit}
      />
    </DrawerPage>
  );
};

export default ProjectsPage;
