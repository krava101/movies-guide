import { Link, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentMovie } from "../../redux/currentMovie/selectors";
import { fetchMovieInfo } from "../../redux/currentMovie/operations";
import { useEffect } from "react";
import MovieDetails from "../../components/MovieDetails/MovieDetails";
import MoviePoster from "../../components/MoviePoster/MoviePoster";
import MovieInfo from "../../components/MovieInfo/MovieInfo";
import css from './MovieDetailsPage.module.css';

export default function MovieDetailsPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const backLink = location.state?.from ?? '/';
  const { movieId } = useParams();
  const movie = useSelector(selectCurrentMovie);

  useEffect(() => {
    movieId && dispatch(fetchMovieInfo(movieId));
  }, [dispatch, movieId]);
    
  return (
    <>
      {movie &&
      <section  className={css.movie}>
        <Link className={css.backLink} to={backLink}>Go back</Link>
        <h1 className={css.title}>{movie.title}</h1>
        <div className={css.movieInfo}>
          <MoviePoster/>
          <MovieInfo/>
        </div>
        <MovieDetails />
      </section>}
    </>
  )
}