import React, { useState } from "react";
import JoinModal from "./JoinModal";

const JoinButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        style={{ fontWeight: 500, fontSize: 13 }}
        className="button is-small"
      >
        Join
      </button>
      <JoinModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default JoinButton;
