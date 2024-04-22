import { fetchShowCast, fetchShowInfo, fetchShowReviews, fetchSimilarShows } from "./operations";
import { createSlice } from "@reduxjs/toolkit";

const handlePending = (state) => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const currentShowSlice = createSlice({
  name: 'currentShow',
  initialState: {
    show: null,
    cast: [],
    reviews: [],
    similar: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    clearShow(state){
      state.isLoading = false;
      state.error = null;
      state.show = null;
      state.cast = [];
      state.reviews = [];
      state.similar = [];
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchShowInfo.pending, handlePending)
      .addCase(fetchShowInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.show = action.payload;
        state.cast = [];
        state.reviews = [];
        state.similar = [];
      })
      .addCase(fetchShowInfo.rejected, handleRejected)
      .addCase(fetchShowCast.pending, handlePending)
      .addCase(fetchShowCast.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.cast = [...action.payload.cast, ...action.payload.crew];
      })
      .addCase(fetchShowCast.rejected, handleRejected)
      .addCase(fetchShowReviews.pending, handlePending)
      .addCase(fetchShowReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.reviews = action.payload;
      })
      .addCase(fetchShowReviews.rejected, handleRejected)
      .addCase(fetchSimilarShows.pending, handlePending)
      .addCase(fetchSimilarShows.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.similar = action.payload;
      })
      .addCase(fetchSimilarShows.rejected, handleRejected)
  }
});

export const { clearShow } = currentShowSlice.actions;
export const currentShowReducer = currentShowSlice.reducer;