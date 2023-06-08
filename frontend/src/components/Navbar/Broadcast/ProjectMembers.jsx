import React, { useState } from "react";
import SelectableTable from "./SelectableTable";

// apis
import {
  useGetActiveProjectsQuery,
  useGetMembersQuery,
} from "../../../apis/projectApi";

const ProjectMembers = (callBack) => {
  const [projectId, setProjectId] = useState(null);
  // active project
  const { data: projects } = useGetActiveProjectsQuery();

  // get members
  const { data: projectMembers } = useGetMembersQuery(projectId, {
    skip: !projectId,
  });

  const handleSelect = (value) => {
    if (value !== "--Select Project--") {
      setProjectId(value);
    }
  };

  return (
    <div>
      <div className="select mb-3">
        <select onChange={(e) => handleSelect(e.target.value)}>
          <option>--Select Project--</option>
          {projects && (
            <>
              {projects?.data.map((project, index) => (
                <option value={project.project_id}>
                  {project.project_title}
                </option>
              ))}
            </>
          )}
        </select>
      </div>
      <SelectableTable callback={callBack} members={projectMembers} />
    </div>
  );
};

export default ProjectMembers;
