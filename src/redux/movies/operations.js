import axios from "axios";
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.headers.common["Authorization"] =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZjJjNmQ2YmM3NGRmN2QyZjIxZmU0ZDQ5ZWIzZWE0OSIsInN1YiI6IjY1ZTRkODY3ZmUwNzdhMDE4NTExN2NjZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5t6b-6xUJc0RhwRo3Vsx-2W4O08UKCaRrIBM4KeFPjM";
axios.defaults.baseURL = "https://api.themoviedb.org/3";

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async (search, thunkAPI) => {
    try {
      const response = await axios.get(`/trending/movie/${search.trending}?page=${search.page}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
});

export const fetchQueryMovies = createAsyncThunk('movies/fetchQueryMovies', async (query, thunkAPI) => {
  try {
      const response = await axios.get(`/search/movie?include_adult=false&page=${query.page}&query=${query.search}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
})

export const fetchPopularMovies = createAsyncThunk('movies/fetchPopularMovies', async (page, thunkAPI) => {
  try {
      const response = await axios.get(`/movie/popular?page=${page}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
})

export const fetchTopRatedMovies = createAsyncThunk('movies/fetchTopRatedMovies', async (page, thunkAPI) => {
  try {
      const response = await axios.get(`/movie/top_rated?page=${page}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
})

export const fetchNowPlayingMovies = createAsyncThunk('movies/fetchNowPlayingMovies', async (page, thunkAPI) => {
  try {
      const response = await axios.get(`/movie/now_playing?page=${page}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
})

export const fetchUpcomingMovies = createAsyncThunk('movies/fetchUpcomingMovies', async (page, thunkAPI) => {
  try {
      const response = await axios.get(`/movie/upcoming?page=${page}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
})

//https://api.themoviedb.org/3/movie/now_playing
//https://api.themoviedb.org/3/movie/popular
//https://api.themoviedb.org/3/movie/top_rated
//https://api.themoviedb.org/3/movie/upcoming
//https://api.themoviedb.org/3/trending/movie/day
//https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&query={query}
//https://api.themoviedb.org/3/movie/{movie_id}
//https://api.themoviedb.org/3/movie/{movie_id}/credits
//https://api.themoviedb.org/3/movie/{movie_id}/reviews