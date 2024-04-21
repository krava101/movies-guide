import { selectTrending, selectPage, selectSearch } from "../../redux/filter/selectors";
import { fetchMovies, fetchQueryMovies } from "../../redux/movies/operations";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { selectIsLoading, selectTotalPages } from "../../redux/movies/selectors";
import { clearMovie } from "../../redux/currentMovie/slice";
import { changePage, changeTrending, setTotalPages } from "../../redux/filter/slice";
import { useEffect } from "react";
import { Toaster } from 'react-hot-toast';
import PagePagination from "../../components/PagePagination/PagePagination";
import MoviesList from "../../components/MovieList/MovieList";
import css from './MoviesPage.module.css';
import { clearShow } from "../../redux/currentShow/slice";


export default function HomePage() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedPage = useSelector(selectPage);
  const totalPages = useSelector(selectTotalPages);
  const selectedTrending = useSelector(selectTrending);
  const selectedSearch = useSelector(selectSearch)
  const search = searchParams.get("query") ? searchParams.get("query") : selectedSearch;
  const page = searchParams.get("page") ? searchParams.get("page") : selectedPage;
  const trending = searchParams.get("trending") ? searchParams.get("trending") : selectedTrending;
  
  
  useEffect(() => {
    !search && setSearchParams({ trending: trending, page: page });
    dispatch(clearMovie());
    dispatch(clearShow());
    dispatch(changeTrending(trending));
    dispatch(changePage(page));
    dispatch(setTotalPages(totalPages));
    search ? dispatch(fetchQueryMovies({ search, page })) : dispatch(fetchMovies({ trending, page }));
  }, [dispatch, search, trending, page, setSearchParams, totalPages]);


  
  return (
    <div className={css.moviesPage}>
      {isLoading && <p className={css.loading}>Loading...</p>}
      <MoviesList />
      {totalPages > 1 && <PagePagination />}
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  )
}