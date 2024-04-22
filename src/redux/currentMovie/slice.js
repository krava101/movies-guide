import { createSlice } from "@reduxjs/toolkit";
import { fetchMovieCast, fetchMovieInfo, fetchMovieReviews, fetchSimilarMovies } from "./operations";

const handlePending = (state) => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const currentMovieSlice = createSlice({
  name: 'currentMovie',
  initialState: {
    movie: null,
    cast: [],
    reviews: [],
    similar: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    clearMovie(state){
      state.isLoading = false;
      state.error = null;
      state.movie = null;
      state.cast = [];
      state.reviews = [];
      state.similar = [];
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchMovieInfo.pending, handlePending)
      .addCase(fetchMovieInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.movie = action.payload;
        state.cast = [];
        state.reviews = [];
        state.similar = [];
      })
      .addCase(fetchMovieInfo.rejected, handleRejected)
      .addCase(fetchMovieCast.pending, handlePending)
      .addCase(fetchMovieCast.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.cast = action.payload;
      })
      .addCase(fetchMovieCast.rejected, handleRejected)
      .addCase(fetchMovieReviews.pending, handlePending)
      .addCase(fetchMovieReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.reviews = action.payload;
      })
      .addCase(fetchMovieReviews.rejected, handleRejected)
      .addCase(fetchSimilarMovies.pending, handlePending)
      .addCase(fetchSimilarMovies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.similar = action.payload;
      })
      .addCase(fetchSimilarMovies.rejected, handleRejected)
  }
});

export const { clearMovie } = currentMovieSlice.actions;
export const currentMovieReducer = currentMovieSlice.reducer;