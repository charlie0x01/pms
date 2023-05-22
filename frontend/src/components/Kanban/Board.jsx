import React from "react";
import { useParams } from "react-router-dom";

const Board = () => {
  return (
    <div>
      <h1 className="title">Board</h1>
      <p>{useParams().projectId}</p>
    </div>
  );
};

export default Board;
