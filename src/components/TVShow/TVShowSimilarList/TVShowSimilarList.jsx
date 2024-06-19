import { useDispatch, useSelector } from 'react-redux';
import { fetchSimilarShows } from '../../../redux/currentShow/operations';
import { selectSimilar } from '../../../redux/currentShow/selectors';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TVShowCard from '../TVShowCard/TVShowCard';
import scss from './TVShowSimilarList.module.scss';

export default function MovieList() {
  const dispatch = useDispatch();
  const shows = useSelector(selectSimilar);
  const { showId } = useParams();

  useEffect(() => {
    showId && dispatch(fetchSimilarShows(showId));
  }, [dispatch, showId]);
  return (
    <ul className={scss.similarList}>
      {shows
        .filter(e => e.poster_path)
        .map(e => (
          <TVShowCard key={e.id} show={e} />
        ))}
    </ul>
  );
}
