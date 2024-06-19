import { changeFilter } from '../../redux/filter/slice';
import { mainFilter } from '../../redux/filter/constants';
import { useDispatch, useSelector } from 'react-redux';
import scss from './HomeFilter.module.scss';
import clsx from 'clsx';
import { selectFilter } from '../../redux/filter/selectors';
import { useSearchParams } from 'react-router-dom';

export default function HomeFilter() {
  const [_, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);
  const filterDay = clsx(scss.filterLink, filter === 'day' ? scss.active : '');
  const filterWeek = clsx(
    scss.filterLink,
    filter === 'week' ? scss.active : ''
  );

  const handleFilter = event => {
    if (event.target !== event.currentTarget) {
      const newFilter = event.target.dataset.filter;
      dispatch(changeFilter(newFilter));
      setSearchParams({ filter: newFilter, page: 1 });
    }
  };

  return (
    <p className={scss.top} onClick={handleFilter}>
      Top of the
      <button className={filterDay} data-filter={mainFilter.day}>
        day
      </button>
      <button className={filterWeek} data-filter={mainFilter.week}>
        week
      </button>
    </p>
  );
}
