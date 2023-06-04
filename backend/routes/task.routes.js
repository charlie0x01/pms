const express = require("express");

const {
  addTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
  getAssignees,
  setAssignees,
  changeTaskColumn,
} = require("../controllers/task.controller.js");

const router = express.Router();

router.post("/add-task/:userId/:columnId", addTask);
router.get("/get-tasks/:columnId", getTasks);
router.get("/get-task/:taskId", getTask);
router.patch("/update-task/:userId/:boardId/:taskId", updateTask);
router.delete("/delete-task/:userId/:boardId/:taskId", deleteTask);
router.get("/get-assignees/:taskId", getAssignees);
router.post("/set-assignees/:taskId", setAssignees);

// change task column
router.patch("/change-task-column/:taskId/:columnId", changeTaskColumn);

module.exports = router;
