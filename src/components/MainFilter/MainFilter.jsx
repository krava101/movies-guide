import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';
import { selectFilter } from '../../redux/filter/selectors';
import { changeFilter } from '../../redux/filter/slice';
import { mainFilter } from '../../redux/filter/constants';
import Filter from '../Filter/Filter';
import scss from './MainFilter.module.scss';
import { useSearchParams } from 'react-router-dom';
import clsx from 'clsx';

export default function MainFilter() {
  const [_, setSearchParams] = useSearchParams();
  const filterRef = useRef();
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);

  const popularBtn = clsx(
    scss.filterLink,
    filter === mainFilter.popular ? scss.active : ''
  );

  const ratedBtn = clsx(
    scss.filterLink,
    filter === mainFilter.rated ? scss.active : ''
  );

  const playingBtn = clsx(
    scss.filterLink,
    filter === mainFilter.playing ? scss.active : ''
  );

  const upcomingBtn = clsx(
    scss.filterLink,
    filter === mainFilter.upcoming ? scss.active : ''
  );

  const handleFilter = event => {
    if (event.target !== event.currentTarget) {
      const newFilter = event.target.dataset.filter;
      dispatch(changeFilter(newFilter));
      setSearchParams({
        filter: newFilter,
        page: 1,
      });
    }
  };

  return (
    <section className={scss.filterWrapper}>
      <div ref={filterRef} className={scss.filter} onClick={handleFilter}>
        <button
          className={popularBtn}
          type="button"
          data-filter={mainFilter.popular}
        >
          Popular
        </button>
        <button
          className={ratedBtn}
          type="button"
          data-filter={mainFilter.rated}
        >
          Top Rated
        </button>
        <button
          className={playingBtn}
          type="button"
          data-filter={mainFilter.playing}
        >
          Now playing
        </button>
        <button
          className={upcomingBtn}
          type="button"
          data-filter={mainFilter.upcoming}
        >
          Upcoming
        </button>
      </div>
      <Filter />
    </section>
  );
}
