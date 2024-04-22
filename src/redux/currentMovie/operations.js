import axios from "axios";
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchMovieInfo = createAsyncThunk('currentMovie/fetchMovieInfo', async (id, thunkAPI)=>{
  try {
      const response = await axios.get(`/movie/${id}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
})

export const fetchMovieCast = createAsyncThunk('currentMovie/fetchMovieCast', async (id, thunkAPI)=>{
  try {
      const response = await axios.get(`/movie/${id}/credits`);
      return response.data.cast;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
})

export const fetchMovieReviews = createAsyncThunk('currentMovie/fetchMovieReviews', async (id, thunkAPI)=>{
  try {
      const response = await axios.get(`/movie/${id}/reviews`);
      return response.data.results;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
})

export const fetchSimilarMovies = createAsyncThunk('currentMovie/fetchSimilarMovies', async (id, thunkAPI) => {
  try {
      const response = await axios.get(`/movie/${id}/similar`);
      return response.data.results;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
})