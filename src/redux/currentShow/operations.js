import axios from "axios";
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.headers.common["Authorization"] =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZjJjNmQ2YmM3NGRmN2QyZjIxZmU0ZDQ5ZWIzZWE0OSIsInN1YiI6IjY1ZTRkODY3ZmUwNzdhMDE4NTExN2NjZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5t6b-6xUJc0RhwRo3Vsx-2W4O08UKCaRrIBM4KeFPjM";
axios.defaults.baseURL = "https://api.themoviedb.org/3";

export const fetchShowInfo = createAsyncThunk('currentShow/fetchShowInfo', async (id, thunkAPI)=>{
  try {
    const response = await axios.get(`/tv/${id}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
})

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