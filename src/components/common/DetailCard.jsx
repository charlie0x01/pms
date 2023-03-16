import React from "react";
import { Card, Avatar, Button } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
const { Meta } = Card;

const ProjectCard = ({
  description,
  createdDate,
  title,
  projectProfile,
  team,
  id,
  tags,
  onEdit
}) => {
  return (
    <Link to={`/card${id}`}>
      <Card
        id={id}
        hoverable
        style={{
          width: 350,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <Meta
            avatar={<Avatar shape="square" size="large" src={projectProfile} />}
            title={title}
            description={description}
          />
          <div>{tags}</div>
          <div className="is-flex is-justify-content-space-between is-align-items-center">
            <div>
              <Button type="text" onClick={onEdit}>
                <EditOutlined style={{ fontSize: "16px"}} />
              </Button>
            </div>
            <Avatar.Group>
              {team &&
                team.map((member, index) => {
                  return <Avatar key={index} src={member} />;
                })}
            </Avatar.Group>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default ProjectCard;
