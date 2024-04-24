import { selectIsMixLoading, selectMixShowsTotalPages } from "../../redux/mixShows/selectors";
import { changePage, changeFilter, setTotalPages } from "../../redux/filter/slice";
import { selectFilter, selectPage, selectSearch } from "../../redux/filter/selectors";
import { fetchMixShows, fetchQueryMix } from "../../redux/mixShows/opeartions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchUpcoming } from "../../redux/upcoming/operations";
import { clearMovie } from "../../redux/currentMovie/slice";
import { useEffect, useState } from "react"
import { clearShow } from "../../redux/currentShow/slice";
import UpcomingSlider from "../../components/UpcomingSlider/UpcomingSlider";
import PagePagination from "../../components/PagePagination/PagePagination";
import MixShowsList from "../../components/MixShowsList/MixShowsList";
import css from './HomePage.module.css';
import { mainFilter } from "../../redux/filter/constants";
import Filter from "../../components/Filter/Filter";

export default function HomePage() {
  const dispatch = useDispatch(); 
  const isMixLoading = useSelector(selectIsMixLoading);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isUpcomingExecuted, setIsUpcomingExecuted] = useState(true);
  const navigate = useNavigate();

  const selectedPage = useSelector(selectPage);
  const totalPages = useSelector(selectMixShowsTotalPages);
  const selectedFilter = useSelector(selectFilter);
  const selectedSearch = useSelector(selectSearch);

  const search = searchParams.get("query") ? searchParams.get("query") : selectedSearch;
  const page = searchParams.get("page") ? searchParams.get("page") : selectedPage;
  const filter = searchParams.get("filter") ? searchParams.get("filter") : selectedFilter;

  function filtering(filter) {
    switch (filter) {
      case mainFilter.day:
        dispatch(fetchMixShows({trending: filter, page }))
        break;
      case mainFilter.week:
      dispatch(fetchMixShows({trending: filter, page }))
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
    isUpcomingExecuted && dispatch(fetchUpcoming());
    setIsUpcomingExecuted(false);
    search ? dispatch(fetchQueryMix({ search, page })) : filtering(filter);
  }, [dispatch, search, filter, page, setSearchParams, totalPages, isUpcomingExecuted]);

  return (
    <div className={css.homepage}>
      <UpcomingSlider />
      <section className={css.homeContent}>
        <div className={css.homeFilter}>
          <p className={css.watch}>Discover new movies and TV shows</p>
          <Filter/>
        </div>
        {isMixLoading && <p className={css.loading}>Loading...</p>}
        <MixShowsList/>
        {totalPages > 1 && <PagePagination />}
      </section>
    </div>
  )
}