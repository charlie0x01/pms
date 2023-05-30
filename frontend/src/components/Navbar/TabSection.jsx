import React, { useState } from "react";
import TabBar from "../TabBar/Tabbar";
import ContentPanel from "../TabBar/ContentPanel";
import { message } from "antd";
import JoinOrganization from "../Organization/JoinOrganization";
import JoinProject from "../Project/JoinProject";

// apis

const TabSection = ({ setIsOpen }) => {
  const [activeTab, setActiveTab] = useState("Join Organization");
  const [messageApi, contextHandler] = message.useMessage();

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  return (
    <div className="mt-5">
      {contextHandler}
      <TabBar
        tabs={["Join Organization", "Join Project"]}
        defaultTab={activeTab}
        onTabChange={handleTabChange}
      />

      <ContentPanel tab={activeTab}>
        {activeTab === "Join Organization" && (
          <JoinOrganization setIsOpen={setIsOpen} />
        )}
        {activeTab === "Join Project" && <JoinProject setIsOpen={setIsOpen} />}
      </ContentPanel>
    </div>
  );
};

export default TabSection;
