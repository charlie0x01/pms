require("dotenv").config({ path: "../.env" });
const User = require("../models/user.model");
const Project = require("../models/project.model");
const Kanban = require("../models/kanban.model");
const Task = require("../models/task.model");
const fs = require("fs");

const Notification = require("../models/notification.model");

exports.addTask = async (req, res, next) => {
  try {
    const { userId, columnId } = req.params;
    const { taskTitle, dueDate, description, priority } = req.body;

    // check entries
    if (taskTitle === "" || dueDate === "" || priority === "")
      return res.json({
        success: false,
        message: "Required data not provided",
      });

    // check if length of Task Title is less than aur equal to 2
    if (taskTitle.length <= 2)
      return res.status(500).json({
        success: false,
        message: "Task name must contains 3 characters",
      });

    // check if column exist
    const [column, ___] = await Kanban.findByColumnId(columnId);
    if (column.length <= 0) {
      return res.status(404).json({
        success: false,
        message: "Column not found",
      });
    }

    const date = new Date();
    const currentDate = `${
      date.getMonth() + 1
    }/${date.getDate()}/${date.getFullYear()}`;
    // create new task
    const task = new Task(
      taskTitle,
      currentDate,
      dueDate,
      description,
      priority,
      columnId
    );

    await task.save();

    return res.status(201).json({
      success: true,
      message: "Task created successfully!",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error?.message });
  }
};

exports.getTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const [task, _] = await Task.findByTaskId(taskId);
    if (task.length <= 0) {
      return res.json({
        success: true,
        data: [],
      });
    }
    return res.status(200).json({ success: true, data: task[0] });
  } catch (error) {
    return res.status(500).json({ success: false, message: error?.message });
  }
};

exports.getTasks = async (req, res, next) => {
  try {
    const { columnId } = req.params;
    const [tasks, _] = await Task.findByColumnId(columnId);
    if (tasks.length <= 0) return res.json({ success: true, data: [] });

    return res.status(200).json({
      success: true,
      data: tasks,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const { userId, boardId, taskId } = req.params;
    const { taskTitle, dueDate, description, priority } = req.body;

    const [project, ___] = await Kanban.checkProjectOnwer(userId, boardId);
    const [user, _] = await Kanban.checkMemberRole(userId);
    if (project.length > 0 || user.length <= 0) {
      const [task, __] = await Task.findByTaskId(taskId);
      // check, if task exists
      if (task.length <= 0) {
        return res
          .status(404)
          .json({ success: false, message: "Task does not exist" });
      }

      await Task.updateTask(taskTitle, dueDate, description, priority, taskId);

      // notify assignees
      const [updatedBy, ___] = await User.findByUserId(userId);
      console.log("from task update", updatedBy);
      const [assignees, _] = await Task.getAssigneesByTaskId(taskId);
      assignees.map((user, index) =>
        Notification.saveNotification(
          user.user_id,
          `Task '${taskTitle}' updated by ${updatedBy[0].first_name} ${updatedBy[0].last_name}`
        )
      );

      return res.status(201).json({
        success: true,
        message: "Task updated successfully",
      });
    }
    return res.status(404).json({
      success: false,
      message: "Unauthorized Request",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error?.message });
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const { userId, boardId, taskId } = req.params;
    const [project, ___] = await Kanban.checkProjectOnwer(userId, boardId);
    const [user, _] = await Kanban.checkMemberRole(userId);
    if (project.length > 0 || user.length <= 0) {
      const [task, __] = await Task.findByTaskId(taskId);
      // check, if task exists
      if (task.length <= 0) {
        return res
          .status(404)
          .json({ success: false, message: "Task does not exist" });
      }

      // notify assignees
      const [updatedBy, ___] = await User.findByUserId(userId);
      const [assignees, _] = await Task.getAssigneesByTaskId(taskId);
      const [dTask, ____] = await Task.findByTaskId(taskId);

      const [deleted, fields] = await Task.deleteTask(taskId);
      if (deleted.affectedRows == 1) {
        assignees.map((user, index) =>
          Notification.saveNotification(
            user.user_id,
            `Task '${dTask[0].task_title}' deleted by ${updatedBy[0].first_name} ${updatedBy[0].last_name}`
          )
        );
      }

      return res.status(200).json({
        success: true,
        message: "Task deleted successfully",
      });
    }
    return res.status(404).json({
      success: false,
      message: "Unauthorized Request",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error?.message });
  }
};

exports.getAssignees = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const [task, _] = await Task.findByTaskId(taskId);
    if (task.length <= 0) {
      return res
        .status(404)
        .json({ success: false, message: "Task does not exist" });
    }

    const [assignees, __] = await Task.getAssigneesByTaskId(taskId);
    if (assignees.length <= 0) return res.json({ success: true, data: [] });

    return res.status(200).json({
      success: true,
      data: assignees,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error?.message });
  }
};

exports.setAssignees = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { assignees } = req.body;
    await Task.addAssignees(assignees, taskId);
    let user;
    const [task, _] = await Task.findByTaskId(taskId);
    // notify
    await Promise.all(
      assignees.map(async (user, index) => {
        user = await User.findByUserId(user);
        await Notification.saveNotification(
          user[0][0].user_id,
          `New Task for you '${task[0].task_title}'`
        );
      })
    );

    return res.status(200).json({
      success: true,
      message: "Assigned to Select Members",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error?.message });
  }
};

exports.changeTaskColumn = async (req, res) => {
  try {
    const { taskId, columnId } = req.params;
    const [columnChanged, _d] = await Task.changeTaskColumn(taskId, columnId);

    const [assignees, _a] = await Task.getAssigneesByTaskId(taskId);
    const [column, _b] = await Kanban.findByColumnId(columnId);
    const [task, _c] = await Task.findByTaskId(taskId);
    let user;
    // notify
    if (columnChanged.affectedRows == 1) {
      await Promise.all(
        assignees.map(async (assignee, index) => {
          user = await User.findByUserId(assignee.user_id);
          await Notification.saveNotification(
            user[0][0].user_id,
            `${task[0].task_title} Task's status changed to ${column[0].column_title}`
          );
        })
      );
    }
    return res
      .status(200)
      .json({ success: true, message: "Task status changed" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error?.message });
  }
};

exports.getTaskAttachments = async (req, res) => {
  try {
    const [attachments, _] = await Task.getTaskAttachments(req.params.taskId);
    return res.status(200).json({ success: false, data: attachments });
  } catch (error) {
    return res.status(500).json({ success: false, message: error?.message });
  }
};

exports.deleteTaskAttachment = async (req, res) => {
  try {
    const { attachment } = req.body;
    console.log("." + attachment.slice(28));
    if (fs.existsSync("./assets/" + attachment.slice(28))) {
      fs.unlinkSync("./assets/" + attachment.slice(28));
      await Task.deleteTaskAttachment(req.params.taskId, attachment);

      return res.status(200).json({
        success: false,
        message: `Deleted ${attachment.slice(41)}`,
      });
    }
    return res.status(500).json({ success: false, message: "File not found" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error?.message });
  }
};

exports.getActiveTasks = async (req, res) => {
  try {
    console.log(req.params.userId);
    const [tasks, _] = await Task.getActiveTask(req.params.userId);
    console.log(tasks);
    return res.status(200).json({ success: true, data: tasks });
  } catch (error) {
    return res.status(500).json({ success: false, message: error?.message });
  }
};

exports.postComment = async (req, res) => {
  try {
    console.log(req.params);
    console.log(req.body);

    const [commented, __] = await Task.postComment(
      req.params.taskId,
      req.body.comment,
      req.params.userId
    );

    // notify
    const [commentBy, ___] = await User.findByUserId(req.params.userId);
    const [assignees, _] = await Task.getAssigneesByTaskId(req.params.taskId);
    const [task, ____] = await Task.findByTaskId(req.params.taskId);

    if (commented.affectedRows == 1) {
      assignees.map((user, index) =>
        Notification.saveNotification(
          user.user_id,
          `${commentBy[0].first_name} ${commentBy[0].last_name} commented on '${task[0].task_title}'`
        )
      );
    }

    return res.status(200).json({ success: true, message: "posted" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error?.message });
  }
};
exports.postReply = async (req, res) => {
  try {
    //
    let commented;
    const [comment, _d] = await Task.getComment(req.params.parentId);
    if (comment[0].parent_id !== null) {
      commented = await Task.postReply(
        req.params.taskId,
        req.body.comment,
        req.params.userId,
        comment[0].parent_id
      );
    } else {
      commented = await Task.postReply(
        req.params.taskId,
        req.body.comment,
        req.params.userId,
        req.params.parentId
      );
    }

    // notify
    const [commentBy, _b] = await User.findByUserId(req.params.userId);
    const [assignees, _c] = await Task.getAssigneesByTaskId(req.params.taskId);

    if (commented[0].affectedRows == 1) {
      assignees.map((user, index) =>
        Notification.saveNotification(
          user.user_id,
          `${commentBy[0].first_name} ${commentBy[0].last_name} replied on your comment '${comment[0].content}'`
        )
      );
    }

    return res.status(200).json({ success: true, message: "posted" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error?.message });
  }
};

exports.getReplies = async (req, res) => {
  try {
    console.log(req.params);

    const [replies, _] = await Task.getReplies(
      req.params.taskId,
      req.params.commentId
    );
    return res.status(200).json({ success: true, data: replies });
  } catch (error) {
    return res.status(500).json({ success: false, message: error?.message });
  }
};
exports.deleteComment = async (req, res) => {
  try {
    console.log(req.params);

    await Task.deleteComment(req.params.commentId);
    return res.status(200).json({ success: true, message: "Comment Deleted" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error?.message });
  }
};
exports.updateComment = async (req, res) => {
  try {
    console.log(req.params);
    console.log(req.body);

    await Task.updateComment(req.params.commentId, req.body.comment);
    return res.status(200).json({ success: true, message: "updated" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error?.message });
  }
};
exports.getComments = async (req, res) => {
  try {
    console.log(req.params);
    const [comments, _] = await Task.getComments(req.params.taskId);

    return res.status(200).json({ success: true, data: comments });
  } catch (error) {
    return res.status(500).json({ success: false, message: error?.message });
  }
};
