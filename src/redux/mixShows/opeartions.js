import axios from "axios";
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchMixShows = createAsyncThunk('mixShows/fetchMovies', async (search, thunkAPI) => {
    try {
      const response = await axios.get(`/trending/all/${search.trending}?page=${search.page}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
});

export const fetchQueryMix = createAsyncThunk('mixShows/fetchQueryMix', async (query, thunkAPI) => {
  try {
      const response = await axios.get(`/search/multi?include_adult=false&page=${query.page}&query=${query.search}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
})