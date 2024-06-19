import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUpcoming } from '../../redux/upcoming/operations';
import { fetchMixShows, fetchQueryMix } from '../../redux/mixShows/opeartions';
import {
  selectFilter,
  selectPage,
  selectSearch,
} from '../../redux/filter/selectors';
import {
  selectIsMixLoading,
  selectMixShowsTotalPages,
} from '../../redux/mixShows/selectors';
import UpcomingSlider from '../../components/UpcomingSlider/UpcomingSlider';
import HomeFilter from '../../components/HomeFilter/HomeFilter';
import MixShowsList from '../../components/MixShowsList/MixShowsList';
import PagePagination from '../../components/PagePagination/PagePagination';
import scss from './WelcomePage.module.scss';
import { changeFilter, setTotalPages } from '../../redux/filter/slice';
import { mainFilter } from '../../redux/filter/constants';
import LoadingShows from '../../components/LoadingShows/LoadingShows';
import { useNavigate } from 'react-router-dom';
import { selectUpcoming } from '../../redux/upcoming/selectors';

function WelcomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const upcoming = useSelector(selectUpcoming);
  const filter = useSelector(selectFilter);
  const search = useSelector(selectSearch);
  const page = useSelector(selectPage);
  const totalPages = useSelector(selectMixShowsTotalPages);
  const isMixLoading = useSelector(selectIsMixLoading);

  function filtering(filter) {
    switch (filter) {
      case mainFilter.day:
        dispatch(fetchMixShows({ trending: filter, page }));
        break;
      case mainFilter.week:
        dispatch(fetchMixShows({ trending: filter, page }));
        break;
      case mainFilter.search:
        search
          ? dispatch(fetchQueryMix({ page, search }))
          : dispatch(changeFilter(mainFilter.day));
        break;
      default:
        navigate('/');
        dispatch(changeFilter(mainFilter.day));
    }
  }

  useEffect(() => {
    filtering(filter);
    !upcoming.length && dispatch(fetchUpcoming());
    dispatch(setTotalPages(totalPages));
  }, [dispatch, filter, page, search, totalPages]);

  return (
    <div className={scss.homepage}>
      <UpcomingSlider />
      <section className={scss.homeContent}>
        <div className={scss.homeFilter}>
          <p className={scss.watch}>Discover new movies and TV shows</p>
          <HomeFilter />
        </div>
        {isMixLoading ? <LoadingShows /> : <MixShowsList />}
        {totalPages > 1 && <PagePagination />}
      </section>
    </div>
  );
}

export default WelcomePage;
