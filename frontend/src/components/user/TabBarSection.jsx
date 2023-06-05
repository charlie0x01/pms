import React, { useState } from "react";
import TabBar from "../TabBar/Tabbar";
import ContentPanel from "../TabBar/ContentPanel";

const TabBarSection = () => {
  const [activeTab, setActiveTab] = useState("Active Projects");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  return (
    <div className="mt-5">
      <TabBar
        tabs={["Active Projects", "Active Tasks", "Notifications"]}
        defaultTab={activeTab}
        onTabChange={handleTabChange}
      />

      <ContentPanel tab={activeTab}>
        {activeTab === "Active Projects" && (
          <div>
            <h2>Content for Notifications</h2>
            <p>This is the content panel for Notifications.</p>
          </div>
        )}
        {activeTab === "Active Tasks" && (
          <div>
            <h2>Content for Notifications</h2>
            <p>This is the content panel for Notifications.</p>
          </div>
        )}
        {activeTab === "Notifications" && (
          <div>
            <h2>Content for Notifications</h2>
            <p>This is the content panel for Notifications.</p>
          </div>
        )}
      </ContentPanel>
    </div>
  );
};

export default TabBarSection;
