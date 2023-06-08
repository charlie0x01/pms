import React, { useState } from "react";
import BroadcastModel from "./BroadcastModel";

const Broadcast = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button
        style={{ fontWeight: 500, fontSize: 13 }}
        className="button is-small"
        onClick={() => setIsOpen(true)}
      >
        Broadcast
      </button>
      <BroadcastModel isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default Broadcast;
