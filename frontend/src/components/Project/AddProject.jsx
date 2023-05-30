import React, { useState } from "react";
import TabBar from "../TabBar/Tabbar";
import ContentPanel from "../TabBar/ContentPanel";
import Modal from "../common/Modal";
import NewProject from "./NewProject";
import JoinProject from "./JoinProject";

const AddProject = ({ isOpen, setIsOpen }) => {
  const [activeTab, setActiveTab] = useState("New Project");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <Modal show={isOpen}>
      <button
        onClick={() => {
          setIsOpen(false);
        }}
        class="modal-close is-large"
        aria-label="close"
      ></button>
      <div className="mt-5">
        <TabBar
          tabs={["New Project", "Join Project"]}
          defaultTab={activeTab}
          onTabChange={handleTabChange}
        />

        <ContentPanel tab={activeTab}>
          {activeTab === "New Project" && <NewProject setIsOpen={setIsOpen} />}

          {activeTab === "Join Project" && (
            <JoinProject setIsOpen={setIsOpen} />
          )}
        </ContentPanel>
      </div>
    </Modal>
  );
};

export default AddProject;
