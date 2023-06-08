import React, { useState, useEffect } from "react";
import TabBar from "../TabBar/Tabbar";
import ContentPanel from "../TabBar/ContentPanel";
import ProjectCard from "../Project/ProjectCard";
import { message } from "antd";

// apis
import { useGetActiveProjectsQuery } from "../../apis/projectApi";
import { useGetActiveTasksQuery } from "../../apis/taskApi";
import {
  useGetNotificationsQuery,
  useDeleteNotificationMutation,
  useDeleteNotificationsMutation,
} from "../../apis/notificationsApi";
import TaskRow from "./TaskRow";

const TabBarSection = () => {
  const [activeTab, setActiveTab] = useState("Active Projects");
  const [messageApi, contextHandler] = message.useMessage();

  // load projects
  const { data: projects } = useGetActiveProjectsQuery();

  // active tasks
  const { data: activeTasks } = useGetActiveTasksQuery();

  // load notifications
  const { data: notifications } = useGetNotificationsQuery();

  const [
    deleteNotification,
    { isLoading, isError, isSuccess, error, data: deleteResponse },
  ] = useDeleteNotificationMutation();
  const [
    deleteNotifications,
    {
      isLoading: deleteLoading,
      isError: deleteError,
      isSuccess: deleteSuccess,
      error: delete_error,
      data: deleteAllResponse,
    },
  ] = useDeleteNotificationsMutation();

  const handleDeleteNotification = (id) => {
    deleteNotification(id);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    if (isError) {
      if (Array.isArray(error?.data.error)) {
        error?.data.error.forEach((el) => messageApi.error(el.message));
      } else {
        messageApi.error(error?.data.message);
      }
    }
    if (isSuccess) {
      messageApi.success(deleteResponse?.message);
    }
  }, [isLoading]);
  useEffect(() => {
    if (deleteError) {
      if (Array.isArray(delete_error?.data.error)) {
        delete_error?.data.error.forEach((el) => messageApi.error(el.message));
      } else {
        messageApi.error(delete_error?.data.message);
      }
    }
    if (deleteSuccess) {
      messageApi.success(deleteAllResponse?.message);
    }
  }, [deleteLoading]);
  return (
    <>
      {contextHandler}
      <div className="mt-5">
        <TabBar
          tabs={[
            `Active Projects ${projects ? projects?.data.length : 0}`,
            `Active Tasks ${activeTasks ? activeTasks?.data.length : 0}`,
            `Notifications ${notifications ? notifications?.data.length : 0}`,
          ]}
          defaultTab={activeTab}
          onTabChange={handleTabChange}
        />

        <ContentPanel tab={activeTab}>
          {activeTab ===
            `Active Projects ${projects ? projects?.data.length : 0}` && (
            <div className="is-flex is-flex-wrap-wrap p-3 is-gap-2">
              {projects && (
                <>
                  {projects?.data.map((project, index) => {
                    return (
                      <ProjectCard
                        key={index}
                        title={project.project_title}
                        description={project.description}
                        date={project.created_date.slice(0, 10)}
                        id={project.project_id}
                        link={`/kanban/${project.project_id}`}
                      />
                    );
                  })}
                </>
              )}
            </div>
          )}
          {activeTab ===
            `Active Tasks ${activeTasks ? activeTasks?.data.length : 0}` && (
            <table class="table is-fullwidth">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Due Date</th>
                  <th>Priority</th>
                  <th>Assignees</th>
                </tr>
              </thead>
              <tbody>
                {activeTasks && (
                  <>
                    {activeTasks?.data.map((task, index) => {
                      return (
                        <TaskRow
                          key={index}
                          taskId={task.task_id}
                          title={task.task_title}
                          dueDate={task.due_date}
                          priority={task.priority}
                        />
                      );
                    })}
                  </>
                )}
              </tbody>
            </table>
          )}
          {activeTab ===
            `Notifications ${
              notifications ? notifications?.data.length : 0
            }` && (
            <div>
              <button
                onClick={() => deleteNotifications()}
                className="button is-small mb-3"
              >
                Clear All
              </button>
              <div className="is-flex is-flex-direction-column">
                {notifications?.data.length > 0 && (
                  <>
                    {notifications?.data.map((notification, index) => (
                      <article key={index} class="message">
                        <button
                          onClick={() =>
                            handleDeleteNotification(
                              notification.notification_id
                            )
                          }
                          className="delete is-pulled-right"
                          style={{ marginRight: 5, marginTop: 5 }}
                        ></button>
                        <div class="message-body">{notification.message}</div>
                      </article>
                    ))}
                  </>
                )}
              </div>
            </div>
          )}
        </ContentPanel>
      </div>
    </>
  );
};

export default TabBarSection;
