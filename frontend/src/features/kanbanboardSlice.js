import { createSlice } from "@reduxjs/toolkit";

const initState = {
  columns: {},
};

const kanbanBoardSlice = createSlice({
  name: "kanbanBoard",
  initialState: initState,
  reducers: {
    setTasks: (state, action) => {
      const { columnId, tasks } = action.payload;
      state.columns = { ...state.columns, [columnId]: tasks };
    },
  },
});

export default kanbanBoardSlice.reducer;
export const { setTasks } = kanbanBoardSlice.actions;
