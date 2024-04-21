import { createSlice } from "@reduxjs/toolkit";
import { fetchMovies, fetchQueryMovies, fetchSimilarMovies, } from "./operations";

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
      .addCase(fetchSimilarMovies.pending, handlePending)
      .addCase(fetchSimilarMovies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload.results;
        state.totalPages = action.payload.total_pages;
      })
      .addCase(fetchSimilarMovies.rejected, handleRejected)
  }
});

export const moviesReducer = moviesSlice.reducer;