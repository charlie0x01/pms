import React, { useState } from "react";

const TabBar = ({ tabs, defaultTab, onTabChange }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    onTabChange(tab);
  };

  return (
    <div className="tabs is-fullwidth">
      <ul>
        {tabs.map((tab) => (
          <li
            key={tab}
            className={tab === activeTab ? "is-active" : ""}
            onClick={() => handleTabClick(tab)}
          >
            <a>{tab}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TabBar;
