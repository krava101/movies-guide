import { createSlice } from "@reduxjs/toolkit";
import { fetchMovies, fetchNowPlayingMovies, fetchPopularMovies, fetchQueryMovies, fetchTopRatedMovies, fetchUpcomingMovies } from "./operations";

const handlePending = (state) => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    items: [],
    totalPages: 0,
    isLoading: false,
    error: null
  },
  extraReducers: builder => {
    builder
      .addCase(fetchMovies.pending, handlePending)
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload.results;
        state.totalPages = action.payload.total_pages; 
      })
      .addCase(fetchMovies.rejected, handleRejected)
      .addCase(fetchQueryMovies.pending, handlePending)
      .addCase(fetchQueryMovies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload.results;
        state.totalPages = action.payload.total_pages;
      })
      .addCase(fetchQueryMovies.rejected, handleRejected)
      .addCase(fetchPopularMovies.pending, handlePending)
      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload.results;
        state.totalPages = action.payload.total_pages;
      })
      .addCase(fetchPopularMovies.rejected, handleRejected)
      .addCase(fetchTopRatedMovies.pending, handlePending)
      .addCase(fetchTopRatedMovies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload.results;
        state.totalPages = action.payload.total_pages;
      })
      .addCase(fetchTopRatedMovies.rejected, handleRejected)
      .addCase(fetchNowPlayingMovies.pending, handlePending)
      .addCase(fetchNowPlayingMovies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload.results;
        state.totalPages = action.payload.total_pages;
      })
      .addCase(fetchNowPlayingMovies.rejected, handleRejected)
      .addCase(fetchUpcomingMovies.pending, handlePending)
      .addCase(fetchUpcomingMovies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload.results;
        state.totalPages = action.payload.total_pages;
      })
      .addCase(fetchUpcomingMovies.rejected, handleRejected)
  }
});

export const moviesReducer = moviesSlice.reducer;