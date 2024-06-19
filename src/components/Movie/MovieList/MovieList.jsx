import { selectMovies } from '../../../redux/movies/selectors';
import { useSelector } from 'react-redux';
import MovieCard from '../MovieCard/MovieCard';
import css from './MovieList.module.css';
import { selectSearch } from '../../../redux/filter/selectors';

export default function MovieList() {
  const movies = useSelector(selectMovies);
  const search = useSelector(selectSearch);

  return (
    <>
      {movies.length ? (
        <ul className={css.moviesList}>
          {movies
            .filter(e => e.poster_path)
            .map(e => (
              <MovieCard key={e.id} movie={e} />
            ))}
        </ul>
      ) : (
        search && (
          <div className={css.notFound}>
            <p>Nothing found for request «{search}»</p>
            <p>
              We couldn&apos;t find anything. Are there any grammatical errors
              in the query?
            </p>
          </div>
        )
      )}
    </>
  );
}
