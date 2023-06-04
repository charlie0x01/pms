require("dotenv").config({ path: "../.env" });
const User = require("../models/user.model");
const Project = require("../models/project.model");
const Kanban = require("../models/kanban.model");
const Task = require("../models/task.model");

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

    // check if user is authorized to do this action or not
    const [user, _] = await Kanban.checkMemberRole(userId);
    if (user.length > 0) {
      return res.status(404).json({
        success: false,
        message: "Unauthorized Request",
      });
    }

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

      await Task.deleteTask(taskId);
      return res.status(201).json({
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
    await Task.changeTaskColumn(taskId, columnId);
    return res
      .status(200)
      .json({ success: true, message: "Task status changed" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error?.message });
  }
};
