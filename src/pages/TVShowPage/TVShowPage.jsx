import LoadingShows from '../../components/LoadingShows/LoadingShows';
import {
  fetchTopRatedShows,
  fetchNowPlayingShows,
  fetchPopularShows,
  fetchQueryShows,
  fetchShows,
  fetchUpcomingShows,
} from '../../redux/shows/operations';
import { changeFilter, setTotalPages } from '../../redux/filter/slice';
import {
  selectFilter,
  selectPage,
  selectSearch,
} from '../../redux/filter/selectors';
import { selectIsLoading, selectTotalPages } from '../../redux/shows/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { mainFilter } from '../../redux/filter/constants';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import PagePagination from '../../components/PagePagination/PagePagination';
import MainFilter from '../../components/MainFilter/MainFilter';
import TVList from '../../components/TVShow/TVList/TVList';
import css from './TVShowPage.module.css';

export default function TVPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);

  const page = useSelector(selectPage);
  const totalPages = useSelector(selectTotalPages);
  const filter = useSelector(selectFilter);
  const search = useSelector(selectSearch);

  function filtering(filter) {
    switch (filter) {
      case mainFilter.day:
        dispatch(fetchShows({ trending: filter, page }));
        break;
      case mainFilter.week:
        dispatch(fetchShows({ trending: filter, page }));
        break;
      case mainFilter.popular:
        dispatch(fetchPopularShows(page));
        break;
      case mainFilter.rated:
        dispatch(fetchTopRatedShows(page));
        break;
      case mainFilter.playing:
        dispatch(fetchNowPlayingShows(page));
        break;
      case mainFilter.upcoming:
        dispatch(fetchUpcomingShows(page));
        break;
      case mainFilter.search:
        search
          ? dispatch(fetchQueryShows({ search, page }))
          : dispatch(changeFilter(mainFilter.day));
        break;
      default:
        navigate('/');
        dispatch(changeFilter(mainFilter.day));
    }
  }

  useEffect(() => {
    filtering(filter);
    dispatch(setTotalPages(totalPages));
  }, [dispatch, search, filter, page, totalPages]);

  return (
    <div className={css.tvPage}>
      <p className={css.watch}>Discover new TV shows</p>
      <MainFilter />
      <div className={css.showListWrapper}>
        {isLoading ? <LoadingShows /> : <TVList />}
      </div>
      {totalPages > 1 && <PagePagination />}
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}
