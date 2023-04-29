// this is a global store for our app
import { configureStore } from "@reduxjs/toolkit";

// reducers
import taskReducer from "./services/kanban/taskSlice";
import kanbanReducer from "./services/kanban/kanbanSlice";

// apis
import authApi from "./services/authSlice";

// let's configure a store
const store = configureStore({
  reducer: {
    task: taskReducer,
    kanban: kanbanReducer,
    [authApi.reducerPath]: authApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

// now export the store
export default store;
