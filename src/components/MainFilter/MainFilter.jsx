import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { selectFilter } from "../../redux/filter/selectors";
import { changeFilter } from "../../redux/filter/slice";
import { mainFilter } from "../../redux/filter/constants";
import Filter from "../Filter/Filter";
import css from './MainFilter.module.css';


export default function MainFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const filterRef = useRef()
  const dispatch = useDispatch();
  const selectedFilter = useSelector(selectFilter);
  const filter = searchParams.get('filter') ? searchParams.get('filter') : selectedFilter;

  useEffect(() => {
    Array.from(filterRef.current.children).filter(e => e.dataset.filter === filter ? e.classList.add(css.active) : e.classList.remove(css.active));
  }, [filter])
  
  const handleFilter = (event) => {
    if (event.target !== event.currentTarget) {
      Array.from(event.currentTarget.children).forEach(e => e.classList.remove(css.active));
      const newFilter = event.target.dataset.filter;
      dispatch(changeFilter(newFilter));
      setSearchParams({
        filter: newFilter,
        page: 1,
      });
      event.target.classList.add(css.active);
    }
  }

  return (
    <section className={css.filterWrapper}>
      <div ref={filterRef} className={css.filter} onClick={handleFilter}>
        <button className={css.filterLink} type="button" data-filter={mainFilter.popular}>Popular</button>
        <button className={css.filterLink} type="button" data-filter={mainFilter.rated}>Top Rated</button>
        <button className={css.filterLink} type="button" data-filter={mainFilter.playing}>Now playing</button>
        <button className={css.filterLink} type="button" data-filter={mainFilter.upcoming}>Upcoming</button>
      </div>
      <Filter/>
    </section>
  )
}