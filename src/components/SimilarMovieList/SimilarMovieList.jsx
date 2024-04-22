import { useDispatch, useSelector } from "react-redux";
import { fetchSimilarMovies } from "../../redux/movies/operations";
import { selectMovies } from "../../redux/movies/selectors";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import MovieCard from "../Movie/MovieCard/MovieCard";
import css from './SimilarMovieList.module.css';

export default function MovieList() {
  const dispatch = useDispatch();
  const movies = useSelector(selectMovies);
  const { movieId } = useParams();

  useEffect(() => {
    dispatch(fetchSimilarMovies(movieId));
  }, [dispatch, movieId])
  return (
    <ul className={css.moviesList}>
      {movies.filter(e => e.poster_path).map(e => (<MovieCard key={e.id} movie={e} />))}
    </ul>
  )
}