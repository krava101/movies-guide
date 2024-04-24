import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { changeFilter } from '../../redux/filter/slice';
import { selectFilter } from '../../redux/filter/selectors';
import { mainFilter } from '../../redux/filter/constants';
import css from './Filter.module.css';

export default function Filter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const filterRef = useRef()
  const dispatch = useDispatch();
  const selectedFilter = useSelector(selectFilter);
  const filter = searchParams.get('filter') ? searchParams.get('filter') : selectedFilter;
  const search = searchParams.get('query') ? searchParams.get('query') : null;

  useEffect(() => {
    Array.from(filterRef.current.children).filter(e => e.dataset.filter === filter ? e.classList.add(css.active) : e.classList.remove(css.active))
    search && Array.from(filterRef.current.children).forEach(e => e.classList.remove(css.active));
  }, [filter, search])

  const handleFilter = (event) => {
    if (event.target !== event.currentTarget) {
      Array.from(event.currentTarget.children).forEach(e => e.classList.remove(css.active))
      const newFilter = event.target.dataset.filter;
      dispatch(changeFilter(newFilter))
      setSearchParams({
        filter: newFilter,
        page: 1,
      })
      event.target.classList.add(css.active);
    }
  }

  return (
    <p className={css.top} ref={filterRef} onClick={handleFilter}>Top of the
      <button className={css.filterLink} data-filter={mainFilter.day}>day</button>
      <button className={css.filterLink} data-filter={mainFilter.week}>week</button>
    </p>
  )
}