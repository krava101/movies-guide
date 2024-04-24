import { fetchMovies, fetchNowPlayingMovies, fetchPopularMovies, fetchQueryMovies, fetchTopRatedMovies, fetchUpcomingMovies } from "../../redux/movies/operations";
import { changePage, changeFilter, setTotalPages } from "../../redux/filter/slice";
import { selectFilter, selectPage, selectSearch } from "../../redux/filter/selectors";
import { selectIsLoading, selectTotalPages } from "../../redux/movies/selectors";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { clearMovie } from "../../redux/currentMovie/slice";
import { mainFilter } from "../../redux/filter/constants";
import { useEffect } from "react";
import { clearShow } from "../../redux/currentShow/slice";
import { Toaster } from 'react-hot-toast';
import PagePagination from "../../components/PagePagination/PagePagination";
import MoviesList from "../../components/Movie/MovieList/MovieList";
import MainFilter from "../../components/MainFilter/MainFilter";
import css from './MoviesPage.module.css';


export default function MoviesPage() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedPage = useSelector(selectPage);

  const navigate = useNavigate();

  const totalPages = useSelector(selectTotalPages);
  const selectedFilter = useSelector(selectFilter);
  const selectedSearch = useSelector(selectSearch);

  const search = searchParams.get("query") ? searchParams.get("query") : selectedSearch;
  const page = searchParams.get("page") ? searchParams.get("page") : selectedPage;
  const filter = searchParams.get("filter") ? searchParams.get("filter") : selectedFilter;

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
    !search && setSearchParams({ filter: filter, page: page });
    dispatch(clearMovie());
    dispatch(clearShow());
    dispatch(changeFilter(filter));
    dispatch(changePage(page));
    dispatch(setTotalPages(totalPages));
    search ? dispatch(fetchQueryMovies({ search, page })) : filtering(filter);
  }, [dispatch, search, filter, page, setSearchParams, totalPages]);


  
  return (
    <div className={css.moviesPage}>
      <p className={css.watch}>Discovr new movies</p>
      <MainFilter/>
      <div className={css.movieListWrapper}>
        {isLoading && <p className={css.loading}>Loading...</p>}
        <MoviesList />
      </div>
      {totalPages > 1 && <PagePagination />}
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  )
}
