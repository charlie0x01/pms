import React from "react";
import { Card, Avatar, Progress } from "antd";
import { Navigate, Link } from "react-router-dom";
const { Meta } = Card;

const ProjectCard = ({ createdDate, title, projectProfile, team }) => {
  return (
    <Link to="/card">
      <Card
        hoverable
        onClick={() => {
          <Navigate to="/fromcard" replace={false} />;
        }}
        style={{
          width: 300,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <Meta
            avatar={<Avatar shape="square" size="large" src={projectProfile} />}
            title={title}
            description={createdDate}
          />
          <Progress size="small" percent={30} />
          <Avatar.Group>
            {team &&
              team.map((member, index) => {
                return <Avatar key={index} src={member} />;
              })}
          </Avatar.Group>
        </div>
      </Card>
    </Link>
  );
};

export default ProjectCard;
