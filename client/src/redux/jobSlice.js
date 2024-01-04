import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentJob: null,
  loading: false,
  error: false,
};

export const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.currentJob = action.payload;
    },
    fetchFailure: (state) => {
      state.loading = false;
      state.error = true;
    },

    appliedByUser: (state, action) => {
      if (!state.currentJob.appliedBy.includes(action.payload)) {
        state.currentJob.appliedBy.push(action.payload);
      }
    },

    acceptUserToJob: (state, action) => {
      if (!state.currentJob.acceptedUsers.includes(action.payload)) {
        state.currentJob.acceptedUsers.push(action.payload);
      }
    },

    rejectUserToJob: (state, action) => {
      if (!state.currentJob.rejectedUsers.includes(action.payload)) {
        state.currentJob.rejectedUsers.push(action.payload);
      }
    },
  },
});

export const {
  fetchStart,
  fetchSuccess,
  fetchFailure,
  appliedByUser,
  acceptUserToJob,
  rejectUserToJob,
} = jobSlice.actions;

export default jobSlice.reducer;
