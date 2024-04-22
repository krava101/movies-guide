import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUpcoming = createAsyncThunk('mixShows/fetchUpcoming', async (_, thunkAPI) => {
  try {
      const response = await axios.get(`/movie/upcoming`);
      return response.data.results;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
})

//https://api.themoviedb.org/3/movie/upcoming