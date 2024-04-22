import axios from "axios";
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchShowInfo = createAsyncThunk('currentShow/fetchShowInfo', async (id, thunkAPI)=>{
  try {
    const response = await axios.get(`/tv/${id}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
})

export const fetchShowCast = createAsyncThunk('currentShow/fetchShowCast', async (id, thunkAPI)=>{
  try {
    const response = await axios.get(`/tv/${id}/credits`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
})

export const fetchShowReviews = createAsyncThunk('currentShow/fetchShowReviews', async (id, thunkAPI)=>{
  try {
    const response = await axios.get(`/tv/${id}/reviews`);
      return response.data.results;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
})

export const fetchSimilarShows = createAsyncThunk('currentShow/fetchSimilarShows', async (id, thunkAPI) => {
  try {
      const response = await axios.get(`/tv/${id}/similar`);
      return response.data.results;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
})


// /tv/series_id/season/season_number?language=en-US

// export const fetchShowCast = createAsyncThunk('currentMovie/fetchMovieCast', async (id, thunkAPI)=>{
//   try {
//       const response = await axios.get(`/movie/${id}/credits`);
//       return response.data.cast;
//     } catch (e) {
//       return thunkAPI.rejectWithValue(e.message);
//     }
// })

// export const fetchMovieReviews = createAsyncThunk('currentMovie/fetchMovieReviews', async (id, thunkAPI)=>{
//   try {
//       const response = await axios.get(`/movie/${id}/reviews`);
//       return response.data.results;
//     } catch (e) {
//       return thunkAPI.rejectWithValue(e.message);
//     }
// })