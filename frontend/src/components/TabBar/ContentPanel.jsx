import React from "react";

const ContentPanel = ({ tab, children }) => {
  return (
    <div className={`tab-content ${tab === "is-active" ? "is-active" : ""}`}>
      {children}
    </div>
  );
};

export default ContentPanel;
