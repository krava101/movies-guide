import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { changeFilter } from '../../redux/filter/slice';
import { selectFilter, selectSearch } from '../../redux/filter/selectors';
import { mainFilter } from '../../redux/filter/constants';
import css from './Filter.module.scss';
import clsx from 'clsx';

function Filter() {
  const [_, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);
  const search = useSelector(selectSearch);

  function switchActive(date) {
    if (!search) {
      return filter === date ? css.active : '';
    }
  }

  const filterDay = clsx(css.filterLink, switchActive(mainFilter.day));

  const filterWeek = clsx(css.filterLink, switchActive(mainFilter.week));

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
    <p className={css.top} onClick={handleFilter}>
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

export default Filter;
