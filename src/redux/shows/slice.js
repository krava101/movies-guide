import { createSlice } from "@reduxjs/toolkit";
import { fetchQueryShows, fetchShows } from "./operations";

const handlePending = (state) => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const showsSlice = createSlice({
  name: 'shows',
  initialState: {
    items: [],
    totalPages: 0,
    isLoading: false,
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchShows.pending, handlePending)
      .addCase(fetchShows.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload.results;
        state.totalPages = action.payload.total_pages; 
      })
      .addCase(fetchShows.rejected, handleRejected)
      .addCase(fetchQueryShows.pending, handlePending)
      .addCase(fetchQueryShows.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload.results;
        state.totalPages = action.payload.total_pages;
      })
      .addCase(fetchQueryShows.rejected, handleRejected)
  }
});

export const showsReducer = showsSlice.reducer;