import React, { useState } from "react";
import TabBar from "../TabBar/Tabbar";
import ContentPanel from "../TabBar/ContentPanel";
import Modal from "../common/Modal";
import NewOrganization from "./NewOrganization";
import JoinOrganization from "./JoinOrganization";

const AddOrganization = ({ isOpen, setIsOpen }) => {
  const [activeTab, setActiveTab] = useState("Create New Organization");

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
          tabs={["Create New Organization", "Join Organization"]}
          defaultTab={activeTab}
          onTabChange={handleTabChange}
        />

        <ContentPanel tab={activeTab}>
          {activeTab === "Create New Organization" && (
            <NewOrganization setIsOpen={setIsOpen} />
          )}

          {activeTab === "Join Organization" && (
            <JoinOrganization setIsOpen={setIsOpen} />
          )}
        </ContentPanel>
      </div>
    </Modal>
  );
};

export default AddOrganization;
