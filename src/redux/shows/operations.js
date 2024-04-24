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

export const fetchPopularShows = createAsyncThunk('shows/fetchPopularShows', async (page, thunkAPI) => {
    try {
      const response = await axios.get(`/tv/popular?page=${page}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
}); 

export const fetchTopRatedShows = createAsyncThunk('shows/fetchTopRatedShows', async (page, thunkAPI) => {
    try {
      const response = await axios.get(`/tv/top_rated?page=${page}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
});

export const fetchNowPlayingShows = createAsyncThunk('shows/fetchNowPlayingShows', async (page, thunkAPI) => {
    try {
      const response = await axios.get(`/tv/on_the_air?page=${page}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
});

export const fetchUpcomingShows = createAsyncThunk('shows/fetchUpcomingShows', async (page, thunkAPI) => {
    try {
      const response = await axios.get(`/tv/airing_today?page=${page}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
});