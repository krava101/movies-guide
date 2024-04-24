import { createSlice } from "@reduxjs/toolkit";
import { fetchNowPlayingShows, fetchPopularShows, fetchQueryShows, fetchShows, fetchTopRatedShows, fetchUpcomingShows } from "./operations";

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
      .addCase(fetchPopularShows.pending, handlePending)
      .addCase(fetchPopularShows.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload.results;
        state.totalPages = action.payload.total_pages;
      })
      .addCase(fetchPopularShows.rejected, handleRejected)
      .addCase(fetchNowPlayingShows.pending, handlePending)
      .addCase(fetchNowPlayingShows.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload.results;
        state.totalPages = action.payload.total_pages;
      })
      .addCase(fetchNowPlayingShows.rejected, handleRejected)
      .addCase(fetchTopRatedShows.pending, handlePending)
      .addCase(fetchTopRatedShows.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload.results;
        state.totalPages = action.payload.total_pages;
      })
      .addCase(fetchTopRatedShows.rejected, handleRejected)
      .addCase(fetchUpcomingShows.pending, handlePending)
      .addCase(fetchUpcomingShows.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload.results;
        state.totalPages = action.payload.total_pages;
      })
      .addCase(fetchUpcomingShows.rejected, handleRejected)
  }
});

export const showsReducer = showsSlice.reducer;