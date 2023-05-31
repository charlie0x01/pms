require("dotenv").config({ path: "../.env" });
const User = require("../models/user.model");
const Project = require("../models/project.model");
const Kanban = require("../models/kanban.model");
const Task = require("../models/task.model");
const jwt = require("jsonwebtoken");

exports.addTask = async (req, res, next) => {
  try {
    const { userId, boardId, columnId } = req.params;
    const {
      taskTitle,
      startDate,
      endDate,
      description,
      status,
      priorityTag,
      assignedUserId,
    } = req.body;

    // check entries
    if (
      taskTitle === "" ||
      startDate === "" ||
      endDate === "" ||
      description === "" ||
      status === "" ||
      priorityTag === "" ||
      assignedUserId === ""
    )
      return res.json({
        success: false,
        message: "Required data not provided",
      });

    // find project by board ID
    const [projects, _____] = await Project.findByboardID(boardId);
    if (projects.length <= 0) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }
    console.log(projects);

    // check if assigned user is already a member of project or not
    const [member, ____] = await Project.isAlreadyMember(
      projects[0].project_id,
      assignedUserId
    );
    const [owner, ______] = await Project.findOwnerByID(
      projects[0].project_id,
      assignedUserId
    );
    if (member.length <= 0 && owner.length <= 0) {
      return res.status(404).json({
        success: false,
        message: "User is not a member or owner of this project",
      });
    }
    console.log(member, "Hello", owner);

    // check if length of Task Title is less than aur equal to 2
    if (taskTitle.length <= 2)
      return res.status(500).json({
        success: false,
        message: "Task name must contains 3 characters",
      });

    // check if user is authorized to do this action or not
    const [project, __] = await Kanban.checkProjectOnwer(userId, boardId);
    const [user, _] = await Kanban.checkMemberRole(userId);
    if (project.length <= 0 && user.length <= 0) {
      return res.status(404).json({
        success: false,
        message: "You're not authorized to make changes",
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

    console.log(
      taskTitle,
      startDate,
      endDate,
      description,
      status,
      priorityTag,
      columnId
    );

    // create new task
    const task = new Task(
      taskTitle,
      startDate,
      endDate,
      description,
      status,
      priorityTag,
      columnId
    );

    task.save(assignedUserId);

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
      return res.status(404).json({
        success: false,
        message: "Task not found",
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
    if (tasks.length <= 0)
      return res
        .status(404)
        .json({ success: false, message: "Column not found" });

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
    const { userId, boardId, columnId, taskId } = req.params;
    const { taskTitle, endDate, description, status, priorityTag } = req.body;

    const [project, ___] = await Kanban.checkProjectOnwer(userId, boardId);
    const [user, _] = await Kanban.checkMemberRole(userId);
    if (project.length <= 0 && user.length <= 0) {
      return res.status(404).json({
        success: false,
        message: "You're not authorized to make changes",
      });
    }

    const [task, __] = await Task.findByTaskId(taskId);
    // check, if task exists
    if (task.length <= 0) {
      return res
        .status(404)
        .json({ success: false, message: "Task does not exist" });
    }

    Task.updateTask(
      taskTitle,
      endDate,
      description,
      status,
      priorityTag,
      taskId
    );
    return res.status(201).json({
      success: true,
      message: "Task updated successfully",
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
    if (project.length <= 0 && user.length <= 0) {
      return res.status(404).json({
        success: false,
        message: "You're not authorized to make changes",
      });
    }

    const [task, __] = await Task.findByTaskId(taskId);
    // check, if task exists
    if (task.length <= 0) {
      return res
        .status(404)
        .json({ success: false, message: "Task does not exist" });
    }

    Task.deleteTask(taskId);
    return res.status(201).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error?.message });
  }
};
