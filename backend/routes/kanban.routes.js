const express = require("express");

const {
  addColumn,
  getColumns,
  getColumn,
  updateColumn,
  deleteColumn,
} = require("../controllers/kanban.controller");

const router = express.Router();

router.post("/add-column/:userId/:boardId", addColumn);
router.get("/get-columns/:boardId", getColumns);
router.get("/get-column/:columnId", getColumn);
router.patch("/update-column/:userId/:columnId", updateColumn);
router.delete("/delete-column/:userId/:columnId", deleteColumn);

module.exports = router;
