import { Button, Modal, message } from "antd";
import { useState } from "react";
import { BiPlus } from "react-icons/bi";

const CreateNewProject = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    messageApi.info("Project Created!!");
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
    {contextHolder}
      <Button
        size="large"
        style={{ width: "300px", minHeight: "185px" }}
        type="dashed"
        icon
        onClick={showModal}
      >
        <div className="is-flex is-flex-direction-column is-align-items-center">
          <BiPlus style={{ fontSize: "25px" }} />
          Create New Project
        </div>
      </Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p className="title">Create New Project</p>
      </Modal>
    </>
  );
};
export default CreateNewProject;
