// 1. we need createSlice from @redux/toolkit
import { createSlice } from "@reduxjs/toolkit";

// 2. init state for kanbanSlice
const initState = {
  columns: {},
  allIds: [],
};

const kanbanSlice = createSlice({
  name: "kanban",
  initialState: initState,
  reducers: {
    addColumn: (state, action) => {
      state.columns[action.payload.columnId] = { ...action.payload };
      state.allIds.push(action.payload.columnId);
    },
    deleteColumn: (state, action) => {
      const index = state.allIds.indexOf(action.payload);
      state.allIds.splice(index, 1);
      delete state.columns[action.payload];
    },
    changeTitle: (state, action) => {
      state.columns[action.payload.columnId].columnTitle =
        action.payload.columnTitle;
      // state.columns[action.payload.columnId].columnTitle = {
      //   ...state.columns[action.payload.columnId],
      //   columnTitle: action.payload.columnTitle,
      // };
    },
  },
});

// export the slice and actions
export default kanbanSlice.reducer;
export const { addColumn, deleteColumn, changeTitle } = kanbanSlice.actions;
