import { useDispatch, useSelector } from "react-redux"
import { selectTotalPages } from "../../redux/movies/selectors";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import css from './PagePagination.module.css';
import { changePage } from "../../redux/filter/slice";
import { useSearchParams } from "react-router-dom";
import { selectPage, selectTrending } from '../../redux/filter/selectors';
import { useEffect, useRef, useState } from "react";




export default function PagePagination() {
  const [sum, setSum] = useState(0);
  const dispatch = useDispatch();
  const pagination = useRef();
  const [searchParams, setSearchParams] = useSearchParams();
  const totalPages = useSelector(selectTotalPages);
  const selectedTrending = useSelector(selectTrending);
  const selectedPage = useSelector(selectPage);
  const page = searchParams.get('page') ? searchParams.get('page') : selectedPage;

  useEffect(() => {
    if (pagination.current.children) {
      const pagList = Array.from(pagination.current.children)
      pagList.forEach(e => e.classList.remove(css.active));
      pagList.forEach(e => e.dataset.page == page && e.classList.add(css.active))
    }
    page < 10 ? setSum(0) : setSum(Math.floor(page / 10) * 10);
  }, [page])
  
  const setAllParams = (page) => {
  if (searchParams.get('query')) {
    setSearchParams({ page: page, query: searchParams.get('query'),}) 
  } else if(searchParams.get('trending')){
    setSearchParams({ page: page, trending: searchParams.get('trending'),});
  } else {
    setSearchParams({ page: page, trending: selectedTrending,});
  }
  dispatch(changePage(page));
}

  const handleMainPag = (event) => {
    const pagList = Array.from(event.currentTarget.children);
    if (event.target !== event.currentTarget) {
      setAllParams(event.target.dataset.page);
    }
    if (event.target === pagList[pagList.length-1]) {
      pagList.forEach(e => {
        e.textContent = +e.textContent + 10;
        e.dataset.page = +e.dataset.page + 10;
      })
    }
  }

  const handleNextPage = () => {
    setAllParams(+page+1);
  }

  const handlePrevPage = () => {
    setAllParams(+page-1);
  }

  return (
    <div className={css.pagination}>
      {page > 1 && <button className={css.pagPrev} onClick={handlePrevPage}><BsChevronLeft /></button>}
      <ul ref={pagination} className={css.pagList} onClick={handleMainPag}>
        <button data-page={1 + sum}>{1 + sum}</button>
        <button data-page={2 + sum}>{2 + sum}</button>
        <button data-page={3 + sum}>{3 + sum}</button>
        <button data-page={4 + sum}>{4 + sum}</button>
        <button data-page={5 + sum}>{5 + sum}</button>
        <button data-page={6 + sum}>{6 + sum}</button>
        <button data-page={7 + sum}>{7 + sum}</button>
        <button data-page={8 + sum}>{8 + sum}</button>
        <button data-page={9 + sum}>{9 + sum}</button>
        <button data-page={10 + sum}>{10 + sum}</button>
      </ul>
      <p className={css.pagElse}>...</p>
      <button className={css.pagTotal} >{totalPages}</button>
      <button className={css.pagNext} onClick={handleNextPage}><BsChevronRight/></button>
    </div>
  )
}