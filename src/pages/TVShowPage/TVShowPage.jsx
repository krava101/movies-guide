import { fetchTopRatedShows, fetchNowPlayingShows, fetchPopularShows, fetchQueryShows, fetchShows, fetchUpcomingShows } from "../../redux/shows/operations";
import { changePage, changeFilter, setTotalPages } from "../../redux/filter/slice";
import { selectFilter, selectPage, selectSearch } from "../../redux/filter/selectors";
import { selectIsLoading, selectTotalPages } from "../../redux/shows/selectors";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { clearMovie } from "../../redux/currentMovie/slice";
import { mainFilter } from "../../redux/filter/constants";
import { clearShow } from "../../redux/currentShow/slice";
import { useEffect } from "react";
import { Toaster } from 'react-hot-toast';
import PagePagination from "../../components/PagePagination/PagePagination";
import MainFilter from "../../components/MainFilter/MainFilter";
import TVList from "../../components/TVShow/TVList/TVList";
import css from './TVShowPage.module.css';

export default function TVPage() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const selectedPage = useSelector(selectPage);
  const totalPages = useSelector(selectTotalPages);
  const selectedFilter = useSelector(selectFilter);
  const selectedSearch = useSelector(selectSearch)

  const search = searchParams.get("query") ? searchParams.get("query") : selectedSearch;
  const page = searchParams.get("page") ? searchParams.get("page") : selectedPage;
  const filter = searchParams.get("filter") ? searchParams.get("filter") : selectedFilter;

  function filtering(filter) {
    switch (filter) {
      case mainFilter.day:
        dispatch(fetchShows({ trending: filter, page }));
        break;
      case mainFilter.week:
        dispatch(fetchShows({ trending: filter, page }));
        break;
      case mainFilter.popular:
          dispatch(fetchPopularShows( page ));
        break;
      case mainFilter.rated:
          dispatch(fetchTopRatedShows( page ));
        break;
      case mainFilter.playing:
          dispatch(fetchNowPlayingShows( page ));
        break;
      case mainFilter.upcoming:
          dispatch(fetchUpcomingShows( page ));
          break;
      default:
        navigate('/');
        dispatch(changeFilter(mainFilter.day));
    }
  }
  
  useEffect(() => {
    dispatch(clearMovie());
    dispatch(clearShow());
    !search && setSearchParams({ filter: filter, page: page });
    dispatch(changeFilter(filter));
    dispatch(changePage(page));
    dispatch(setTotalPages(totalPages));
    search ? dispatch(fetchQueryShows({ search, page })) : filtering(filter);
  },[dispatch, search, filter, page, setSearchParams, totalPages])

  return (
    <div className={css.tvPage}>
      <p className={css.watch}>Discovr new TV shows</p>
      <MainFilter />
      <div className={css.showListWrapper}>
        {isLoading && <p className={css.loading}>Loading...</p>}
        <TVList />
      </div>
      {totalPages > 1 && <PagePagination/>}
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  )
}