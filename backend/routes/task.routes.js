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
  getTaskAttachments,
  deleteTaskAttachment,
  getActiveTasks,
  postComment,
  postReply,
  deleteComment,
  updateComment,
  getComments,
  getReplies,
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
router.get("/get-task-attachments/:taskId", getTaskAttachments);
router.delete("/delete-task-attachment/:taskId", deleteTaskAttachment);

router.get("/get-active-tasks/:userId", getActiveTasks);

router.post("/post-comment/:taskId/:userId", postComment);
router.post("/post-reply/:taskId/:parentId/:userId", postReply);
router.get("/get-comments/:taskId", getComments);
router.delete("/delete-comment/:commentId", deleteComment);
router.patch("/update-comment/:commentId", updateComment);
router.get("/get-replies/:taskId/:commentId", getReplies);

module.exports = router;
