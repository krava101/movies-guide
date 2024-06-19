import { selectMovies } from '../../../redux/movies/selectors';
import { useSelector } from 'react-redux';
import { selectSearch } from '../../../redux/filter/selectors';
import MovieCard from '../MovieCard/MovieCard';
import scss from './MovieList.module.scss';

export default function MovieList() {
  const movies = useSelector(selectMovies);
  const search = useSelector(selectSearch);

  return (
    <>
      {movies.length ? (
        <ul className={scss.moviesList}>
          {movies
            .filter(e => e.poster_path)
            .map(e => (
              <MovieCard key={e.id} movie={e} />
            ))}
        </ul>
      ) : (
        search && (
          <div className={scss.notFound}>
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
