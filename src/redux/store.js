import { currentMovieReducer } from "./currentMovie/slice";
import { filterReducer } from "./filter/slice";
import { moviesReducer } from "./movies/slice";
import { configureStore } from "@reduxjs/toolkit";
import { showsReducer } from "./shows/slice";
import { currentShowReducer } from "./currentShow/slice";

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    shows: showsReducer,
    currentMovie: currentMovieReducer,
    currentShow: currentShowReducer,
    filter: filterReducer,
  },
});