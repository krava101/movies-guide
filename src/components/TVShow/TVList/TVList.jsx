import { selectShows } from '../../../redux/shows/selectors';
import { useSelector } from 'react-redux';
import { selectSearch } from '../../../redux/filter/selectors';
import TVShowCard from '../TVShowCard/TVShowCard';
import scss from './TVList.module.scss';

export default function TvList() {
  const shows = useSelector(selectShows);
  const search = useSelector(selectSearch);

  return (
    <>
      {shows.length ? (
        <ul className={scss.tvList}>
          {shows
            .filter(e => e.poster_path)
            .map(e => (
              <TVShowCard key={e.id} show={e} />
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
