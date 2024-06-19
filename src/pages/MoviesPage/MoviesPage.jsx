import {
  fetchMovies,
  fetchNowPlayingMovies,
  fetchPopularMovies,
  fetchQueryMovies,
  fetchTopRatedMovies,
  fetchUpcomingMovies,
} from '../../redux/movies/operations';
import { changeFilter, setTotalPages } from '../../redux/filter/slice';
import {
  selectFilter,
  selectPage,
  selectSearch,
} from '../../redux/filter/selectors';
import {
  selectIsLoading,
  selectTotalPages,
} from '../../redux/movies/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { mainFilter } from '../../redux/filter/constants';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import PagePagination from '../../components/PagePagination/PagePagination';
import MoviesList from '../../components/Movie/MovieList/MovieList';
import MainFilter from '../../components/MainFilter/MainFilter';
import LoadingShows from '../../components/LoadingShows/LoadingShows';
import scss from './MoviesPage.module.scss';

export default function MoviesPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);

  const totalPages = useSelector(selectTotalPages);
  const page = useSelector(selectPage);
  const filter = useSelector(selectFilter);
  const search = useSelector(selectSearch);

  function filtering(filter) {
    switch (filter) {
      case mainFilter.day:
        dispatch(fetchMovies({ trending: filter, page }));
        break;
      case mainFilter.week:
        dispatch(fetchMovies({ trending: filter, page }));
        break;
      case mainFilter.popular:
        dispatch(fetchPopularMovies(page));
        break;
      case mainFilter.rated:
        dispatch(fetchTopRatedMovies(page));
        break;
      case mainFilter.playing:
        dispatch(fetchNowPlayingMovies(page));
        break;
      case mainFilter.upcoming:
        dispatch(fetchUpcomingMovies(page));
        break;
      case mainFilter.search:
        search
          ? dispatch(fetchQueryMovies({ search, page }))
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
    <div className={scss.moviesPage}>
      <p className={scss.watch}>Discover new movies</p>
      <MainFilter />
      <div className={scss.movieListWrapper}>
        {isLoading ? <LoadingShows /> : <MoviesList />}
      </div>
      {totalPages > 1 && <PagePagination />}
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}
