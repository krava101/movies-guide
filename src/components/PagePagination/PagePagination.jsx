import { selectPage, selectTotalPages, selectFilter } from '../../redux/filter/selectors';
import { selectIsLoading as  selectIsShowLoading } from '../../redux/shows/selectors'
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useSearchParams } from "react-router-dom";
import { selectIsLoading } from "../../redux/movies/selectors";
import { changePage } from "../../redux/filter/slice";
import css from './PagePagination.module.css';

export default function PagePagination() {
  const dispatch = useDispatch();
  const pagination = useRef();
  const [sum, setSum] = useState(0);
  const [more, setMore] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const isMoviesLoading = useSelector(selectIsLoading);
  const isTVShowsLoading = useSelector(selectIsShowLoading);

  const selectedTotalPages = useSelector(selectTotalPages);
  const totalPages = selectedTotalPages > 501 ? 500 : selectedTotalPages;

  const selectedPage = useSelector(selectPage);
  const selectedFilter = useSelector(selectFilter);
  const page = searchParams.get('page') ? searchParams.get('page') : selectedPage;
  const filter = searchParams.get('filter') ? searchParams.get('filter') : selectedFilter;

  useEffect(() => {
    if (!isMoviesLoading && !isTVShowsLoading) {
      const mainPag = pagination.current.children;
      if (mainPag) {
        const pagList = Array.from(mainPag)
        pagList.forEach(e => e.classList.remove(css.active));
        pagList.forEach(e => e.dataset.page == page && e.classList.add(css.active));
        mainPag[mainPag.length - 1] && mainPag[mainPag.length - 1].textContent < totalPages ?
          setMore(true) : setMore(false);
      }
      page < 9 ? setSum(0) : setSum(Math.floor(+page - 5));
    }
  }, [page, isMoviesLoading, isTVShowsLoading, totalPages, sum]);
  
  const setAllParams = (page) => {
    searchParams.get('query') ?
      setSearchParams({ query: searchParams.get('query'), page: page,} ):
      setSearchParams({ filter: filter, page: page,});
    dispatch(changePage(page));
    window.scrollTo({
      top: 0, 
      behavior: 'smooth',
    })
  }

  const handleMainPag = (event) => {
    if (event.target !== event.currentTarget) {
      setAllParams(event.target.dataset.page);
    }
  }

  const handleNextPage = () => {
    setAllParams(+page+1);
  }

  const handlePrevPage = () => {
    setAllParams(+page-1);
  }

  const toFirstLastPage = event => {
    setAllParams(event.currentTarget.dataset.page);
  }

  return (
    <>{!isMoviesLoading && !isTVShowsLoading &&
      <div className={css.pagination}>
        {page > 1 && <button className={css.pagPrev} onClick={handlePrevPage}><BsChevronLeft /></button>}
        {page > 8 && <>
          <button className={css.pagTotal} data-page='1' onClick={toFirstLastPage}>1</button>
          <p className={css.pagElse}>...</p>
        </>}
        <ul ref={pagination} className={css.pagList} onClick={handleMainPag}>
          {totalPages > 9 ?
            Array.from({ length: 9 }).map((_, i) => (1 + i + sum) <= totalPages ? <button key={1 + i} data-page={1 + i + sum}>{1 + i + sum}</button> : null) :
            Array.from({ length: totalPages }).map((_, i) => <button key={1 + i} data-page={1 + i + sum}>{1 + i + sum}</button>)}
        </ul>
           {totalPages > 9 && more &&<>
              <p className={css.pagElse}>...</p>
              <button className={css.pagTotal} data-page={totalPages} onClick={toFirstLastPage}>{totalPages}</button>
           </>}
        {+page + 1 <= totalPages && <button className={css.pagNext} onClick={handleNextPage}><BsChevronRight /></button>}
      </div >
    }</>
  )
}