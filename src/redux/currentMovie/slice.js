import { createSlice } from "@reduxjs/toolkit";
import { fetchMovieInfo } from "./operations";

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
    isLoading: false,
    error: null
  },
  reducers: {
    clearMovie(state){
        state.isLoading = false;
        state.error = null;
        state.movie = null;
      }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchMovieInfo.pending, handlePending)
      .addCase(fetchMovieInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.movie = action.payload;
      })
      .addCase(fetchMovieInfo.rejected, handleRejected);
  }
});

export const { clearMovie } = currentMovieSlice.actions;
export const currentMovieReducer = currentMovieSlice.reducer;