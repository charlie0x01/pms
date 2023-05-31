require("dotenv").config({ path: "../.env" });
const User = require("../models/user.model");
const Organization = require("../models/organization.model");
const Project = require("../models/project.model");
const KanbanColumns = require("../models/kanban.model");
const jwt = require("jsonwebtoken");

exports.addColumn = async (req, res, next) => {
  try {
    const { userId, boardId } = req.params;

    const [user, _] = await KanbanColumns.checkMemberRole(userId);
    // check, if we have any user with admin or team lead role
    if (user.length <= 0) {
      return res
        .status(404)
        .json({ success: false, message: "You cannot add column" });
    }

    // create new column
    const column = new KanbanColumns(boardId);

    column.save();

    return res.status(201).json({
      success: true,
      message: "Column created successfully!",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error?.message });
  }
};

exports.getColumn = async (req, res, next) => {
  try {
    const { columnId } = req.params;
    const [columns, _] = await KanbanColumns.findByColumnId(columnId);
    return res.status(200).json({ success: true, data: columns[0] });
  } catch (error) {
    return res.status(500).json({ success: false, message: error?.message });
  }
};

exports.getColumns = async (req, res, next) => {
  try {
    const { boardId } = req.params;
    const [columns, _] = await KanbanColumns.findByBoardId(boardId);
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
    const { userId, columnId } = req.params;
    const { columnTitle } = req.body;

    const [user, _] = await KanbanColumns.checkMemberRole(userId);
    // check, if we have any user with admin or team lead role
    if (user.length <= 0) {
      return res
        .status(404)
        .json({ success: false, message: "You cannot update column" });
    }

    const [columns, __] = await KanbanColumns.findByColumnId(columnId);
    // check, if column exists
    if (columns.length <= 0) {
      return res
        .status(404)
        .json({ success: false, message: "Column does not exist" });
    }

    KanbanColumns.updateColumn(columnTitle, columnId);
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
    const { userId, columnId } = req.params;

    const [user, _] = await KanbanColumns.checkMemberRole(userId);
    // check, if we have any user with admin or team lead role
    if (user.length <= 0) {
      return res
        .status(404)
        .json({ success: false, message: "You cannot delete column" });
    }

    const [columns, __] = await KanbanColumns.findByColumnId(columnId);
    // check, if column exists
    if (columns.length <= 0) {
      return res
        .status(404)
        .json({ success: false, message: "Column does not exist" });
    }

    KanbanColumns.deleteColumn(columnId);
    return res.status(201).json({
      success: true,
      message: "Column deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error?.message });
  }
};
