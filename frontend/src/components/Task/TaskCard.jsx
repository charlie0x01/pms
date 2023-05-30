import React from "react";
import Avatar from "react-avatar";

const TaskCard = ({ createdDate, dueDate, title, }) => {
  return (
    <div className="box p-3" style={{ maxWidth: 300 }}>
      <div className="is-flex is-flex-direction-column is-gap-1">
        <div className="is-flex is-justify-content-space-between">
          <div className="is-flex is-flex-wrap-wrap is-gap-1">
            <span class="tag is-danger is-light">Priority Tags</span>
          </div>
          <button className="delete"></button>
        </div>
        <div>
          <h1 className="title is-size-6 mb-0 ellipsis">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum
            dolor sit amet consectetur adipisicing elit.
          </h1>
        </div>
        <div className="is-flex is-flex-wrap-wrap is-gap-1">
          <span class="tag is-light">tags will go here</span>
        </div>
        <div className="is-flex is-justify-content-space-between is-align-items-center">
          <div class="avatars">
            <Avatar
              className="avatar"
              name="PMS"
              round
              size="22"
              textSizeRatio={1.9}
            />
            <Avatar
              className="avatar"
              name="PMS"
              round
              size="22"
              textSizeRatio={1.9}
            />
            <Avatar
              className="avatar"
              name="PMS"
              round
              size="22"
              textSizeRatio={1.9}
            />
            <Avatar
              className="avatar"
              name="PMS"
              round
              size="22"
              textSizeRatio={1.9}
            />
          </div>
          <p className="is-size-7 has-text-weight-semibold">May 29 - June 5, 2023</p>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
