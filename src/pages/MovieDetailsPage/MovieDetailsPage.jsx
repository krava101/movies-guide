import { Link, useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentMovie } from '../../redux/currentMovie/selectors';
import { fetchMovieInfo } from '../../redux/currentMovie/operations';
import { useEffect } from 'react';
import MovieDetails from '../../components/Movie/MovieDetails/MovieDetails';
import MoviePoster from '../../components/Movie/MoviePoster/MoviePoster';
import MovieInfo from '../../components/Movie/MovieInfo/MovieInfo';
import scss from './MovieDetailsPage.module.scss';

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
      {movie && (
        <section className={scss.movie}>
          <Link className={scss.backLink} to={backLink}>
            Go back
          </Link>
          <h1>{movie.title}</h1>
          <div className={scss.movieInfo}>
            <MoviePoster />
            <MovieInfo />
          </div>
          <MovieDetails />
        </section>
      )}
    </>
  );
}
