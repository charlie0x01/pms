import React, { useState } from "react";
import { Link } from "react-router-dom";
import JoinModal from "./JoinModal";

const JoinButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button onClick={() => setIsOpen(true)} className="button">
        Join
      </button>
      <JoinModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default JoinButton;
