import { createSlice } from "@reduxjs/toolkit";
import { fetchShowInfo } from "./operations";

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
      })
      .addCase(fetchShowInfo.rejected, handleRejected)
  }
});

export const { clearShow } = currentShowSlice.actions;
export const currentShowReducer = currentShowSlice.reducer;