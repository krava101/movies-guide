import { createSlice } from "@reduxjs/toolkit";
import { fetchUpcoming } from "./operations";

const handlePending = (state) => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const upcomingSlice = createSlice({
  name: 'upcoming',
  initialState: {
    items: [],
    isLoading: false,
    error: null
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUpcoming.pending, handlePending)
      .addCase(fetchUpcoming.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(fetchUpcoming.rejected, handleRejected)
  }
})

export const upcomingReducer = upcomingSlice.reducer;