import { createSlice } from "@reduxjs/toolkit";

const initState = {
  organization: {
    orgId: 0,
    organizationName: "",
    description: "",
    isEdit: false,
  },
  organizations: [],
};

const orgSlice = createSlice({
  name: "org",
  initialState: initState,
  reducers: {
    setOrg: (state, action) => {
      state.organization = action.payload;
    },
    setOrgs: (state, action) => {
      state.organizations = action.payload;
    },
  },
});

export default orgSlice.reducer;
export const { setOrg, setOrgs } = orgSlice.actions;
