import { changePage, changeTrending, setTotalPages } from "../../redux/filter/slice";
import { selectTrending, selectPage, selectSearch } from "../../redux/filter/selectors";
import { selectIsLoading, selectTotalPages } from "../../redux/shows/selectors";
import { fetchQueryShows, fetchShows } from "../../redux/shows/operations";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { clearMovie } from "../../redux/currentMovie/slice";
import { clearShow } from "../../redux/currentShow/slice";
import { useEffect } from "react";
import { Toaster } from 'react-hot-toast';
import PagePagination from "../../components/PagePagination/PagePagination";
import TVList from "../../components/TVShow/TVList/TVList";
import css from './TVShowPage.module.css';

export default function TVPage() {
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
    dispatch(clearMovie());
    dispatch(clearShow());
    !search && setSearchParams({ trending: trending, page: page });
    dispatch(changeTrending(trending));
    dispatch(changePage(page));
    dispatch(setTotalPages(totalPages));
    search ? dispatch(fetchQueryShows({search, page})) : dispatch(fetchShows({ trending, page }));
  },[dispatch, search, trending, page, setSearchParams, totalPages])

  return (
    <div className={css.tvPage}>
      <p className={css.watch}>Discovr new TV shows</p>
      {isLoading && <p className={css.loading}>Loading...</p>}
      <TVList />
      {totalPages > 1 && <PagePagination/>}
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  )
}