// 1. we need createSlice from @redux/toolkit
import { createSlice } from "@reduxjs/toolkit";

// 2. init state for taskSlice
const initState = {
  tasks: {},
  allIds: [],
};

const taskSlice = createSlice({
  name: "task",
  initialState: initState,
  reducers: {
    addTask: (state, action) => {
      state.tasks[action.payload.taskId] = { ...action.payload };
      state.allIds.push(action.payload.taskId);
    },
    deleteTask: (state, action) => {
      // remove task id
      state.allIds.splice(state.allIds.indexOf(action.payload.taskId), 1);
      // delete task
      delete state.tasks[action.payload.taskId];
    },
    editTask: (state, action) => {
      state.tasks[action.payload.taskId] = { ...action.payload };
    },
  },
});

// export the slice and actions
export default taskSlice.reducer;
export const { addTask, deleteTask, editTask } = taskSlice.actions;
