require("dotenv").config();
const { pool, transaction } = require("../config/database");

class Task {
  constructor(
    task_title,
    created_date,
    due_date,
    description,
    priority,
    task_column_id
  ) {
    this.task_title = task_title;
    this.created_date = created_date;
    this.due_date = due_date;
    this.description = description;
    this.priority = priority;
    this.task_column_id = task_column_id;
  }

  save() {
    let addTask = `insert into tasks(task_title, created_date, due_date, description, priority, task_column_id) values(?, STR_TO_DATE(?, "%m/%d/%Y"), STR_TO_DATE(?, "%Y-%m-%d"), ?, ?, ?); `;
    return pool.execute(addTask, [
      this.task_title,
      this.created_date,
      this.due_date,
      this.description,
      this.priority,
      this.task_column_id,
    ]);
  }

  static async addAssignees(assignees, taskId) {
    let deleteAllAssigneesFirst = `delete from task_assigned where assigned_task_id = ?;`;
    pool.execute(deleteAllAssigneesFirst, [taskId]);
    for (const assignee of assignees) {
      console.log(assignee, taskId);
      await this.saveAssignee(assignee, taskId);
    }
  }

  static saveAssignee(assignee, taskId) {
    let assignTask = `insert into task_assigned(assigned_task_id, assigned_user_id) values(?, ?);`;
    return pool.execute(assignTask, [taskId, assignee]);
  }

  static updateTask(
    taskTitle,
    dueDate,
    description,
    priority,
    taskId,
    assignees
  ) {
    let updateTask = `update tasks set task_title = ?, due_date = ?, description = ?, priority = ? where task_id = ? `;
    return pool.execute(updateTask, [
      taskTitle,
      dueDate,
      description,
      priority,
      taskId,
    ]);
  }

  static deleteTask(taskId) {
    let deleteTask = `delete from tasks where task_id = ? `;
    return pool.execute(deleteTask, [taskId]);
  }

  // Get One Task
  static findByTaskId(taskId) {
    let getTask = `select * from tasks where task_id = ?`;
    return pool.execute(getTask, [taskId]);
  }

  // Get all Tasks of a Column
  static findByColumnId(columnId) {
    let getTasks = `select * from tasks where task_column_id = ?`;
    return pool.execute(getTasks, [columnId]);
  }

  // Get Assignees of a Task
  static getAssigneesByTaskId(taskId) {
    let getAssignees = `select u.user_id, u.first_name, u.last_name, u.last_name, u.profile_picture from users u 
    left join task_assigned ta on u.user_id = ta.assigned_user_id where assigned_task_id = ?;`;
    return pool.execute(getAssignees, [taskId]);
  }

  static changeTaskColumn(taskId, columnId) {
    let changeTaskColumn = `update tasks set task_column_id = ? where task_id = ? ;`;
    return pool.execute(changeTaskColumn, [columnId, taskId]);
  }

  static getTaskAttachments(taskId) {
    let getTaskAtt = `select * from task_attachments where attachment_task_id = ?;`;
    return pool.execute(getTaskAtt, [taskId]);
  }
  static deleteTaskAttachments(taskId, attachments, res) {
    let deleteAll = "delete from task_attachments";
    return pool.execute(deleteAll);
  }
  static addTaskAttachment(taskId, attachment) {
    let addTaskAtt = `insert into task_attachments(attachment_task_id, attachment_path) value(?, ?);`;
    return pool.execute(addTaskAtt, [taskId, attachment]);
  }
  static deleteTaskAttachment(taskId, attachment) {
    let deleteTaskAtt = `delete from task_attachments where attachment_task_id = ? and attachment_path = ?;`;
    return pool.execute(deleteTaskAtt, [taskId, attachment]);
  }

  static getActiveTask(userId) {
    let getActiveTasks = ` select distinct t.* from board_columns bc
    left join tasks t on t.task_column_id = bc.column_id
    left join task_assigned ta on t.task_id = ta.assigned_task_id
    where ta.assigned_user_id = ? and bc.column_title != "Completed";
   `;
    return pool.execute(getActiveTasks, [userId]);
  }
}

module.exports = Task;
