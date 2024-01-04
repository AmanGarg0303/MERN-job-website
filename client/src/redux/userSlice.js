import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: false,
  updateLoading: true,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    logout: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
    },
    updateStart: (state) => {
      state.updateLoading = true;
      state.error = false;
    },
    updateSuccess: (state, action) => {
      state.updateLoading = false;
      state.error = false;
      state.currentUser = action.payload;
    },
    updateFailure: (state) => {
      state.updateLoading = false;
      state.error = true;
    },

    applyToJob: (state, action) => {
      if (!state.currentUser.user.appliedJobs.includes(action.payload)) {
        state.currentUser.user.appliedJobs.push(action.payload);
      }
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  updateStart,
  updateSuccess,
  updateFailure,
  applyToJob,
} = userSlice.actions;

export default userSlice.reducer;
