import React, { useState } from "react";
import TabBar from "../TabBar/Tabbar";
import ContentPanel from "../TabBar/ContentPanel";

const TabBarSection = () => {
  const [activeTab, setActiveTab] = useState("Tab 1");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  return (
    <div className="mt-5">
      <TabBar
        tabs={["Active Projects", "Notifications", "Activies"]}
        defaultTab={activeTab}
        onTabChange={handleTabChange}
      />

      <ContentPanel tab={activeTab}>
        {activeTab === "Active Projects" && (
          <div>
            <h2>Content for Active Projects</h2>
            <p>This is the content panel for Active Projects.</p>
          </div>
        )}

        {activeTab === "Notifications" && (
          <div>
            <h2>Content for Notifications</h2>
            <p>This is the content panel for Notifications.</p>
          </div>
        )}

        {activeTab === "Activies" && (
          <div>
            <h2>Content for Activies</h2>
            <p>This is the content panel for Activies.</p>
          </div>
        )}
      </ContentPanel>
    </div>
  );
};

export default TabBarSection;
