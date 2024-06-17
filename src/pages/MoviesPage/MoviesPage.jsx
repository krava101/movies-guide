import {
  fetchMovies,
  fetchNowPlayingMovies,
  fetchPopularMovies,
  fetchQueryMovies,
  fetchTopRatedMovies,
  fetchUpcomingMovies,
} from '../../redux/movies/operations';
import {
  changePage,
  changeFilter,
  setTotalPages,
  setSearch,
} from '../../redux/filter/slice';
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
import { useNavigate, useSearchParams } from 'react-router-dom';
import { clearMovie } from '../../redux/currentMovie/slice';
import { mainFilter } from '../../redux/filter/constants';
import { useEffect } from 'react';
import { clearShow } from '../../redux/currentShow/slice';
import { Toaster } from 'react-hot-toast';
import PagePagination from '../../components/PagePagination/PagePagination';
import MoviesList from '../../components/Movie/MovieList/MovieList';
import MainFilter from '../../components/MainFilter/MainFilter';
import css from './MoviesPage.module.css';

export default function MoviesPage() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const totalPages = useSelector(selectTotalPages);
  const page = useSelector(selectPage);
  const filter = useSelector(selectFilter);
  const search = useSelector(selectSearch);

  const urlSearch = searchParams.get('query');
  const urlPage = searchParams.get('page');
  const urlFilter = searchParams.get('filter');

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
      default:
        navigate('/');
        dispatch(changeFilter(mainFilter.day));
    }
  }

  useEffect(() => {
    dispatch(clearMovie());
    dispatch(clearShow());
    urlFilter && dispatch(changeFilter(urlFilter));
    urlSearch && dispatch(setSearch(urlSearch));
    urlPage && dispatch(changePage(urlPage));
    search ? dispatch(fetchQueryMovies({ search, page })) : filtering(filter);
  }, [dispatch, search, filter, page, urlSearch, urlFilter, urlPage]);

  return (
    <div className={css.moviesPage}>
      <p className={css.watch}>Discover new movies</p>
      <MainFilter />
      <div className={css.movieListWrapper}>
        {isLoading && <p className={css.loading}>Loading...</p>}
        <MoviesList />
      </div>
      {totalPages > 1 && <PagePagination />}
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}
