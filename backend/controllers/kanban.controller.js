require("dotenv").config({ path: "../.env" });
const User = require("../models/user.model");
const Organization = require("../models/organization.model");
const Project = require("../models/project.model");
const Kanban = require("../models/kanban.model");
const jwt = require("jsonwebtoken");

exports.addColumn = async (req, res, next) => {
  try {
    const { userId, boardId } = req.params;

    const [project, __] = await Kanban.checkProjectOnwer(userId, boardId);
    const [user, _] = await Kanban.checkMemberRole(userId);
    if (project.length <= 0 && user.length <= 0) {
      return res.status(404).json({
        success: false,
        message: "You're not authorized to make changes",
      });
    }

    // create new column
    const column = new Kanban(boardId);

    column.save();

    return res.status(201).json({
      success: true,
      message: "New Column Added",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error?.message });
  }
};

exports.getColumn = async (req, res, next) => {
  try {
    const { columnId } = req.params;
    const [columns, _] = await Kanban.findByColumnId(columnId);
    return res.status(200).json({ success: true, data: columns[0] });
  } catch (error) {
    return res.status(500).json({ success: false, message: error?.message });
  }
};

exports.getColumns = async (req, res, next) => {
  try {
    const { boardId } = req.params;
    const [columns, _] = await Kanban.findByBoardId(boardId);
    if (columns.length <= 0)
      return res
        .status(404)
        .json({ success: false, message: "You don't have any columns yet" });

    return res.status(200).json({
      success: true,
      data: columns,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateColumn = async (req, res, next) => {
  try {
    const { userId, boardId, columnId } = req.params;
    const { columnTitle } = req.body;

    const [project, ___] = await Kanban.checkProjectOnwer(userId, boardId);
    const [user, _] = await Kanban.checkMemberRole(userId);
    if (project.length <= 0 && user.length <= 0) {
      return res.status(404).json({
        success: false,
        message: "You're not authorized to make changes",
      });
    }

    Kanban.updateColumn(columnTitle, columnId);
    return res.status(201).json({
      success: true,
      message: "Column title updated successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error?.message });
  }
};

exports.deleteColumn = async (req, res, next) => {
  try {
    const { userId, boardId, columnId } = req.params;

    const [project, ___] = await Kanban.checkProjectOnwer(userId, boardId);
    const [user, _] = await Kanban.checkMemberRole(userId);
    if (project.length <= 0 && user.length <= 0) {
      return res.status(404).json({
        success: false,
        message: "You're not authorized to make changes",
      });
    }

    const [columns, __] = await Kanban.findByColumnId(columnId);
    // check, if column exists
    if (columns.length <= 0) {
      return res
        .status(404)
        .json({ success: false, message: "Column does not exist" });
    }

    Kanban.deleteColumn(columnId);
    return res.status(201).json({
      success: true,
      message: "Column deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error?.message });
  }
};
