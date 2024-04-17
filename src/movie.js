import axios from "axios";

axios.defaults.headers.common["Authorization"] =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZjJjNmQ2YmM3NGRmN2QyZjIxZmU0ZDQ5ZWIzZWE0OSIsInN1YiI6IjY1ZTRkODY3ZmUwNzdhMDE4NTExN2NjZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5t6b-6xUJc0RhwRo3Vsx-2W4O08UKCaRrIBM4KeFPjM";
axios.defaults.baseURL = "https://api.themoviedb.org/3";

export async function fetchMovieInfo(id) {
  const response = await axios.get(`/movie/${id}`);  
  return response.data;
}

export async function fetchMovieCast(id) {
  const response = await axios.get(`/movie/${id}/credits`);
  return response.data.cast;
}

export async function fetchMovieReviews(id) {
  const response = await axios.get(`/movie/${id}/reviews`);
  return response.data.results;
}



//https://api.themoviedb.org/3/trending/movie/day
//https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&query={query}
//https://api.themoviedb.org/3/movie/{movie_id}
//https://api.themoviedb.org/3/movie/{movie_id}/credits
//https://api.themoviedb.org/3/movie/{movie_id}/reviews