import { currentMovieReducer } from "./currentMovie/slice";
import { filterReducer } from "./filter/slice";
import { moviesReducer } from "./movies/slice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    currentMovie: currentMovieReducer,
    filter: filterReducer,
  },
});