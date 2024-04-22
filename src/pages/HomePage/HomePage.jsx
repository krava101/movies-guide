import { selectIsMixLoading, selectMixShowsTotalPages } from "../../redux/mixShows/selectors";
import { changePage, changeTrending, setTotalPages } from "../../redux/filter/slice";
import { selectTrending, selectPage, selectSearch } from "../../redux/filter/selectors";
import { fetchMixShows, fetchQueryMix } from "../../redux/mixShows/opeartions";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { fetchUpcoming } from "../../redux/upcoming/operations";
import { clearMovie } from "../../redux/currentMovie/slice";
import { useEffect, useState } from "react"
import { clearShow } from "../../redux/currentShow/slice";
import UpcomingSlider from "../../components/UpcomingSlider/UpcomingSlider";
import PagePagination from "../../components/PagePagination/PagePagination";
import MixShowsList from "../../components/MixShowsList/MixShowsList";
import css from './HomePage.module.css';

export default function HomePage() {
  const dispatch = useDispatch(); 
  const isMixLoading = useSelector(selectIsMixLoading);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isUpcomingExecuted, setIsUpcomingExecuted] = useState(true);

  const selectedPage = useSelector(selectPage);
  const totalPages = useSelector(selectMixShowsTotalPages);
  const selectedTrending = useSelector(selectTrending);
  const selectedSearch = useSelector(selectSearch);

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
    isUpcomingExecuted && dispatch(fetchUpcoming());
    setIsUpcomingExecuted(false);
    search ? dispatch(fetchQueryMix({ search, page })) : dispatch(fetchMixShows({ trending, page }));
  }, [dispatch, search, trending, page, setSearchParams, totalPages, isUpcomingExecuted])

  return (
    <div className={css.homepage}>
      <UpcomingSlider />
      <section className={css.homeContent}>
        <p className={css.watch}>Discover new movies and TV shows</p>
        {isMixLoading && <p className={css.loading}>Loading...</p>}
        <MixShowsList/>
        {totalPages > 1 && <PagePagination />}
      </section>
    </div>
  )
}