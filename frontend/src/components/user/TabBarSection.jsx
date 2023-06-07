import React, { useState } from "react";
import TabBar from "../TabBar/Tabbar";
import ContentPanel from "../TabBar/ContentPanel";
import ProjectCard from "../Project/ProjectCard";
import TaskCard from "../Task/TaskCard";

// apis
import { useGetActiveProjectsQuery } from "../../apis/projectApi";
import { useGetActiveTasksQuery } from "../../apis/taskApi";
import TaskRow from "./TaskRow";

const TabBarSection = () => {
  const [activeTab, setActiveTab] = useState("Active Projects");

  // load projects
  const { data: projects } = useGetActiveProjectsQuery();

  // active tasks
  const { data: activeTasks } = useGetActiveTasksQuery();

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  return (
    <div className="mt-5">
      <TabBar
        tabs={["Active Projects", "Active Tasks", "Notifications"]}
        defaultTab={activeTab}
        onTabChange={handleTabChange}
      />

      <ContentPanel tab={activeTab}>
        {activeTab === "Active Projects" && (
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
        {activeTab === "Active Tasks" && (
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
        {activeTab === "Notifications" && (
          <div>
            <h2>Content for Notifications</h2>
            <p>This is the content panel for Notifications.</p>
          </div>
        )}
      </ContentPanel>
    </div>
  );
};

export default TabBarSection;
