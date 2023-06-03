const express = require("express");

const {
  addTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
  getAssignees
} = require("../controllers/task.controller.js");

const router = express.Router();

router.post("/add-task/:userId/:columnId", addTask);
router.get("/get-tasks/:columnId", getTasks);
router.get("/get-task/:taskId", getTask);
router.patch("/update-task/:userId/:boardId/:taskId/:assigneeId", updateTask);
router.delete("/delete-task/:userId/:boardId/:taskId", deleteTask);
router.get("/get-assignees/:taskId", getAssignees);

module.exports = router;
