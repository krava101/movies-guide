import axios from "axios";
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.headers.common["Authorization"] =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZjJjNmQ2YmM3NGRmN2QyZjIxZmU0ZDQ5ZWIzZWE0OSIsInN1YiI6IjY1ZTRkODY3ZmUwNzdhMDE4NTExN2NjZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5t6b-6xUJc0RhwRo3Vsx-2W4O08UKCaRrIBM4KeFPjM";
axios.defaults.baseURL = "https://api.themoviedb.org/3";

export const fetchShows = createAsyncThunk('shows/fetchShows', async (search, thunkAPI) => {
    try {
      const response = await axios.get(`/trending/tv/${search.trending}?page=${search.page}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
});

export const fetchQueryShows = createAsyncThunk('shows/fetchQueryShows', async (query, thunkAPI) => {
  try {
      const response = await axios.get(`/search/tv?include_adult=false&page=${query.page}&query=${query.search}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
})

// export const fetchSimilarMovies = createAsyncThunk('movies/fetchSimilarMovies', async (id, thunkAPI) => {
//   try {
//       const response = await axios.get(`/movie/${id}/similar`);
//       return response.data;
//     } catch (e) {
//       return thunkAPI.rejectWithValue(e.message);
//     }
// })