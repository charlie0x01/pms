import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IoMdSettings } from "react-icons/io";
import EditProject from "../Project/EditProject";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import LoadingSpinner from "../common/LoadingSpinner";
import KanbanColumn from "./KanbanColumn";
import { message } from "antd";

// apis
import { useGetProjectQuery } from "../../apis/projectApi";
import { useAddColumnMutation, useGetColumnsQuery } from "../../apis/kanbanApi";

const Board = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messageApi, contextHandler] = message.useMessage();
  const navigate = useNavigate();

  const [
    addColumn,
    { isLoading, isError, isSuccess, error, data: addColumnResponse },
  ] = useAddColumnMutation();

  //
  const handleAddColumn = (boardId) => {
    addColumn(boardId);
  };
  // get project
  const {
    isLoading: projectLoading,
    error: projectError,
    data: project,
  } = useGetProjectQuery(parseInt(useParams().projectId));

  // get columns
  const {
    isLoading: columnLoading,
    error: columnError,
    data: columns,
  } = useGetColumnsQuery(project?.data.board_id);

  console.log(columns);

  useEffect(() => {
    if (projectError) {
      messageApi.error(projectError?.data.message);
      navigate(-1);
    }
  }, [projectLoading]);

  useEffect(() => {
    if (isError) {
      if (Array.isArray(error?.data.error)) {
        error?.data.error.forEach((el) => messageApi.error(el.message));
      } else {
        messageApi.error(error?.data.message);
      }
    }
    if (isSuccess) {
      messageApi.success(addColumnResponse?.message);
    }
  }, [isLoading]);

  return (
    <>
      {contextHandler}
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
                <button
                  onClick={() => handleAddColumn(project?.data.board_id)}
                  className="button is-primary"
                >
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
            <div
              style={{ overflow: "auto" }}
              className="is-flex is-flex-direction-row is-flex-wrap-nowrap is-gap-3"
            >
              {!columnLoading && (
                <>
                  {!columnError &&
                    columns?.data.map((column, index) => {
                      return (
                        <KanbanColumn
                          columnTitle={column.column_title}
                          columnId={column.column_id}
                          boardId={project?.data.board_id}
                        />
                      );
                    })}
                </>
              )}
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
