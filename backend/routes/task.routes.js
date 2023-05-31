const express = require("express");

const {
  addTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask
} = require("../controllers/task.controller.js");

const router = express.Router();

router.post("/add-task/:userId/:boardId/:columnId", addTask);
router.get("/get-tasks/:columnId", getTasks);
router.get("/get-task/:taskId", getTask);
router.patch("/update-task/:userId/:boardId/:columnId/:taskId", updateTask);
router.delete("/delete-task/:userId/:boardId/:taskId", deleteTask);

module.exports = router;
