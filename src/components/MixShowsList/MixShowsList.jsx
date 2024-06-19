import { selectMixShows } from '../../redux/mixShows/selectors';
import { useSelector } from 'react-redux';
import MovieCard from '../Movie/MovieCard/MovieCard';
import TVShowCard from '../TVShow/TVShowCard/TVShowCard';
import css from './MixShowsList.module.css';
import { selectSearch } from '../../redux/filter/selectors';

export default function MixShowsList() {
  const mix = useSelector(selectMixShows);
  const search = useSelector(selectSearch);

  return (
    <>
      {mix.length ? (
        <ul className={css.mixList}>
          {mix
            .filter(e => e.poster_path)
            .map(e => {
              if (e.media_type === 'movie') {
                return <MovieCard key={e.id} movie={e} />;
              } else if (e.media_type === 'tv') {
                return <TVShowCard key={e.id} show={e} />;
              }
            })}
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
