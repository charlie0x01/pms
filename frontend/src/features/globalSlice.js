import { createSlice } from "@reduxjs/toolkit";

const initState = {
  globalState: {
    forgetPasswordOtp: "",
  },
};

const globalSlice = createSlice({
  name: "globalState",
  initialState: initState,
  reducers: {
    setforgetPasswordOTP: (state, action) => {
      state.globalState.forgetPasswordOtp = action.payload;
    },
  },
});

export default globalSlice.reducer;
export const { setGlobalState } = globalSlice.actions;
