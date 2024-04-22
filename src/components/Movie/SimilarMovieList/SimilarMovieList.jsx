import { useDispatch, useSelector } from "react-redux";
import { fetchSimilarMovies } from "../../../redux/currentMovie/operations";
import { selectSimilar } from "../../../redux/currentMovie/selectors";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import MovieCard from "../MovieCard/MovieCard";
import css from './SimilarMovieList.module.css';

export default function MovieList() {
  const dispatch = useDispatch();
  const movies = useSelector(selectSimilar);
  const { movieId } = useParams();

  useEffect(() => {
    movieId && dispatch(fetchSimilarMovies(movieId));
  }, [dispatch, movieId])
  return (
    <ul className={css.moviesList}>
      {movies.filter(e => e.poster_path).map(e => (<MovieCard key={e.id} movie={e} />))}
    </ul>
  )
}