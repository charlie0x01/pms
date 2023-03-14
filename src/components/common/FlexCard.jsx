import React from "react";

const FlexCard = ({ children }) => {
  return (
    <div
      style={{ gap: "10px" }}
      className="is-align-content-flex-start is-flex p-5 is-flex-grow-1 is-flex-wrap-wrap"
    >
      {children}
    </div>
  );
};

export default FlexCard;
