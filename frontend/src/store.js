// this is a global store for our app
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

// apis
import { authApi } from "./apis/authApi";
import { orgApi } from "./apis/orgApi";
import { projectApi } from "./apis/projectApi";

// features
import orgReducer from "./features/orgSlice";

// let's configure a store
const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [orgApi.reducerPath]: orgApi.reducer,
    [projectApi.reducerPath]: projectApi.reducer,
    org: orgReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authApi.middleware,
      orgApi.middleware,
      projectApi.middleware,
    ]),
});

setupListeners(store.dispatch);
// now export the store
export default store;
