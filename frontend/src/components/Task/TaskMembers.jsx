import React, { useEffect, useState } from "react";
import TabBar from "../TabBar/Tabbar";
import ContentPanel from "../TabBar/ContentPanel";
import SelectMembers from "./SelectMembers";
import { delay } from "../../../utils";
import { message } from "antd";

// apis
import {
  useSetAssigneesMutation,
  useGetAssigneesQuery,
} from "../../apis/taskApi";
import MediaTag from "../common/MediaTag";

const TaskMembers = ({ taskId }) => {
  const [activeTab, setActiveTab] = useState("Assignees");
  const [select, setSelect] = useState(false);
  const [messageApi, contextHandler] = message.useMessage();
  const [_assignees, _setAssignees] = useState([]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleSelectAssignees = (assignees) => {
    if (assignees.length > 0) {
      setAssignees({ assignees: [...assignees], taskId: taskId });
      _setAssignees([...assignees]);
      console.log("Assignees", _assignees);
    }
  };

  // apis
  const [
    setAssignees,
    { isLoading, isError, isSuccess, error, data: setAssigneesResponse },
  ] = useSetAssigneesMutation();

  const { data: taskAssignees } = useGetAssigneesQuery(taskId);

  useEffect(() => {
    async function handleAddTaskErrors() {
      if (isError) {
        if (Array.isArray(error?.data.error)) {
          error?.data.error.forEach((el) => messageApi.error(el.message));
        } else {
          messageApi.error(error?.data.message);
        }
      }
      if (isSuccess) {
        messageApi.success(setAssigneesResponse?.message);
        await delay(1000);
        setSelect(false);
      }
    }

    handleAddTaskErrors();
  }, [isLoading]);

  return (
    <div className="mt-5">
      {contextHandler}
      <TabBar
        tabs={["Assignees"]}
        defaultTab={activeTab}
        onTabChange={handleTabChange}
      />

      <ContentPanel tab={activeTab}>
        {activeTab === "Assignees" && (
          <div>
            <div className="pb-3">
              <button onClick={() => setSelect(true)} className="button">
                Assign Task
              </button>
              <div className="is-flex is-gap-2">
                {taskAssignees &&
                  taskAssignees?.data.map((user, index) => {
                    return (
                      <MediaTag
                        key={index}
                        name={`${user.first_name} ${user.last_name}`}
                        email={user.email}
                      />
                    );
                  })}
              </div>
            </div>
          </div>
        )}
      </ContentPanel>
      <SelectMembers
        isOpen={select}
        setIsOpen={setSelect}
        callback={handleSelectAssignees}
      />
    </div>
  );
};

export default TaskMembers;
