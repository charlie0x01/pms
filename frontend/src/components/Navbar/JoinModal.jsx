import React from "react";
import Modal from "../common/Modal";
import TabSection from "./TabSection";

const JoinModal = ({ isOpen, setIsOpen }) => {
  return (
    <Modal show={isOpen}>
      <div className="is-relative">
        <button
          onClick={() => {
            setIsOpen(false);
          }}
          class="modal-close is-large"
          aria-label="close"
        ></button>
      </div>
      <TabSection setIsOpen={setIsOpen} />
    </Modal>
  );
};

export default JoinModal;
