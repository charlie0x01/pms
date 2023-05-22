import React from "react";
import Avatar from "react-avatar";
import { Link } from "react-router-dom";

function ProjectCard({ title, date, id }) {
  return (
    <Link to={`/kanban/${id}`}>
      <div className="box p-2" style={{ width: 300, maxHeight: 150 }}>
        <div className="media">
          <div className="media-left">
            <Avatar maxInitials={1} name={title} size="40" round="10px" textSizeRatio={1.9} />
          </div>
          <div className="media-content">
            <p className="title is-5">{title}</p>
            <p className="subtitle is-7">{`Due Date: ${date}`}</p>
          </div>
        </div>
        <div>
          <div class="avatars">
            <Avatar
              className="avatar"
              name="PMS"
              round
              size="20"
              textSizeRatio={1.9}
            />
            <Avatar
              className="avatar"
              name="PMS"
              round
              size="20"
              textSizeRatio={1.9}
            />
            <Avatar
              className="avatar"
              name="PMS"
              round
              size="20"
              textSizeRatio={1.9}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProjectCard;
