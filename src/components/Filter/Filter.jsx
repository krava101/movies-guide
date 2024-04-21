import { useDispatch, useSelector } from 'react-redux';
import css from './Filter.module.css';
import { fetchMovies } from '../../redux/movies/operations';
import { useEffect, useRef } from 'react';
import { changeTrending } from '../../redux/filter/slice';
import { selectTrending } from '../../redux/filter/selectors';
import { useSearchParams } from 'react-router-dom';
import { selectCurrentMovie } from '../../redux/currentMovie/selectors';
import { selectCurrentShow } from '../../redux/currentShow/selectors';

export default function Filter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const filterRef = useRef()
  const dispatch = useDispatch();
  const selectedTrending = useSelector(selectTrending);
  const trend = searchParams.get('trending') ? searchParams.get('trending') : selectedTrending;
  const movie = useSelector(selectCurrentMovie);
  const show = useSelector(selectCurrentShow);

  useEffect(() => {
    Array.from(filterRef.current.children).filter(e => e.dataset.filter === trend ? e.classList.add(css.active) : e.classList.remove(css.active))
  }, [trend])

  const handleFilter = (event) => {
    if (event.target !== event.currentTarget) {
      Array.from(event.currentTarget.children).forEach(e => e.classList.remove(css.active))
      const trending = event.target.dataset.filter;
      dispatch(changeTrending(trending))
      dispatch(fetchMovies({ trending: trending, page: 1 }))
      setSearchParams({
        trending: trending,
        page: 1,
      })
      event.target.classList.add(css.active);
    }
  }

  return (
    <>{ !movie && !show &&
      <p className={css.top} ref={filterRef} onClick={handleFilter}>Top of the
        <button className={css.filterLink} data-filter='day'>day</button>
        <button className={css.filterLink} data-filter='week'>week</button>
      </p>}
    </>
    
  )
}