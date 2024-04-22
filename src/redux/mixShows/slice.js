import { fetchMixShows, fetchQueryMix } from "./opeartions";
import { createSlice } from "@reduxjs/toolkit";

const handlePending = (state) => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const mixShowsSlice = createSlice({
  name: 'mixShows',
  initialState: {
    items: [],
    totalPages: 0,
    isLoading: false,
    error: null
  },
  extraReducers: builder => {
    builder
      .addCase(fetchMixShows.pending, handlePending)
      .addCase(fetchMixShows.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload.results;
        state.totalPages = action.payload.total_pages; 
      })
      .addCase(fetchMixShows.rejected, handleRejected)
      .addCase(fetchQueryMix.pending, handlePending)
      .addCase(fetchQueryMix.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload.results;
        state.totalPages = action.payload.total_pages; 
      })
      .addCase(fetchQueryMix.rejected, handleRejected)
  }
});

export const mixShowsReducer = mixShowsSlice.reducer;