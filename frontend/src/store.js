// this is a global store for our app
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

// apis
import { authApi } from "./apis/authApi";
import { orgApi } from "./apis/orgApi";
import { projectApi } from "./apis/projectApi";
import { kanbanApi } from "./apis/kanbanApi";
import { taskApi } from "./apis/taskApi";
import { notificationApi } from "./apis/notificationsApi";

// features
import orgReducer from "./features/orgSlice";
import kanbanBoardReducer from "./features/kanbanboardSlice";
import globaStateReducer from "./features/globalSlice";

// let's configure a store
const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [orgApi.reducerPath]: orgApi.reducer,
    [projectApi.reducerPath]: projectApi.reducer,
    [kanbanApi.reducerPath]: kanbanApi.reducer,
    [taskApi.reducerPath]: taskApi.reducer,
    [notificationApi.reducerPath]: notificationApi.reducer,
    org: orgReducer,
    kanbanBoard: kanbanBoardReducer,
    globalState: globaStateReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authApi.middleware,
      orgApi.middleware,
      projectApi.middleware,
      kanbanApi.middleware,
      taskApi.middleware,
      notificationApi.middleware,
    ]),
});

setupListeners(store.dispatch);
// now export the store
export default store;
