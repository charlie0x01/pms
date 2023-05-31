import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { IoMdSettings } from "react-icons/io";
import EditProject from "../Project/EditProject";
import { AiOutlineAppstoreAdd } from "react-icons/ai";

// apis
import { useGetProjectQuery } from "../../apis/projectApi";
import LoadingSpinner from "../common/LoadingSpinner";
import KanbanColumn from "./KanbanColumn";

const Board = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [columns, setColumns] = useState([1]);

  //
  const addColumn = () => {
    setColumns([...columns, columns + 1]);
  };

  // get project
  const {
    isLoading: projectLoading,
    error: projectError,
    data: project,
  } = useGetProjectQuery(parseInt(useParams().projectId));

  useEffect(() => {
    if (projectError) messageApi.error(projectError?.data.message);
  }, [projectLoading]);

  return (
    <>
      {projectLoading ? (
        <LoadingSpinner showText={true} />
      ) : (
        <>
          <div className="pt-5 px-3">
            <div className="is-flex is-justify-content-space-between is-align-items-center">
              <div className="is-flex is-align-items-center">
                <h1 className="title is-3">
                  {!projectError && project?.data.project_title}
                </h1>
                <p className="ml-2">Kanban Board</p>
              </div>
              <div className="is-flex is-gap-1 is-align-items-center">
                <button onClick={addColumn} className="button is-primary">
                  <span class="icon is-medium is-clickable">
                    <AiOutlineAppstoreAdd className="icon-2" />
                  </span>
                </button>
                <button
                  onClick={() => setIsOpen(true)}
                  className="button is-primary"
                >
                  <span class="icon is-medium is-clickable">
                    <IoMdSettings className="icon-2" />
                  </span>
                </button>
              </div>
            </div>
            <div className="is-flex is-flex-direction-row is-flex-wrap-nowrap is-gap-3">
              {columns.map((col, index) => {
                return <KanbanColumn />;
              })}
            </div>
          </div>
          <div></div>
          <EditProject isOpen={isOpen} setIsOpen={setIsOpen} data={project} />
        </>
      )}
    </>
  );
};

export default Board;
