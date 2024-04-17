import { useEffect } from "react";
import MoviesList from "../../components/MovieList/MovieList";
import { fetchMovies, fetchQueryMovies } from "../../redux/movies/operations";
import { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoading } from "../../redux/movies/selectors";
import { useSearchParams } from "react-router-dom";
import { clearMovie } from "../../redux/currentMovie/slice";
import { selectTrending, selectPage, selectSearch } from "../../redux/filter/selectors";
import { changePage } from "../../redux/filter/slice";
import css from './HomePage.module.css';
import PagePagination from "../../components/PagePagination/PagePagination";


export default function HomePage() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedPage = useSelector(selectPage);
  const selectedTrending = useSelector(selectTrending);
  const selectedSearch = useSelector(selectSearch)
  const search = searchParams.get("query") ? searchParams.get("query") : selectedSearch;
  const page = searchParams.get("page") ? searchParams.get("page") : selectedPage;
  const trending = searchParams.get("trending") ? searchParams.get("trending") : selectedTrending;
  
  useEffect(() => {
    dispatch(clearMovie());
    dispatch(changePage(page))
    dispatch(fetchMovies({ trending, page }));
    search && dispatch(fetchQueryMovies({ search, page }));
  },[dispatch, search, trending, page, setSearchParams])


  
  return (
    <div className={css.homePage}>
      {isLoading && <p className={css.loading}>Loading...</p>}
      <MoviesList />
      <PagePagination/>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  )
}