import axios from "axios";
import { createAsyncThunk } from '@reduxjs/toolkit';

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