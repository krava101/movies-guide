import {
  selectPage,
  selectTotalPages,
  selectFilter,
  selectSearch,
} from '../../redux/filter/selectors';
import { selectIsLoading as selectIsShowLoading } from '../../redux/shows/selectors';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { selectIsLoading } from '../../redux/movies/selectors';
import { changePage } from '../../redux/filter/slice';
import scss from './PagePagination.module.scss';

export default function PagePagination() {
  const dispatch = useDispatch();
  const pagination = useRef();
  const [sum, setSum] = useState(0);
  const [more, setMore] = useState(true);
  const [_, setSearchParams] = useSearchParams();
  const [pagesNum, setPagesNum] = useState(9);

  const isMoviesLoading = useSelector(selectIsLoading);
  const isTVShowsLoading = useSelector(selectIsShowLoading);

  const selectedTotalPages = useSelector(selectTotalPages);
  const totalPages = selectedTotalPages > 501 ? 500 : selectedTotalPages;

  const page = useSelector(selectPage);
  const filter = useSelector(selectFilter);
  const search = useSelector(selectSearch);

  useEffect(() => {
    window.screen.width <= 500 && setPagesNum(5);
    if (!isMoviesLoading && !isTVShowsLoading) {
      const mainPag = pagination.current.children;
      if (mainPag) {
        const pagList = Array.from(mainPag);
        pagList.forEach(e => e.classList.remove(scss.active));
        pagList.forEach(
          e => e.dataset.page == page && e.classList.add(scss.active)
        );
        mainPag[mainPag.length - 1]?.textContent < totalPages
          ? setMore(true)
          : setMore(false);
      }
      const centerPage = pagesNum < 9 ? 3 : 5;
      page < pagesNum ? setSum(0) : setSum(Math.floor(+page - centerPage));
    }
  }, [page, isMoviesLoading, isTVShowsLoading, totalPages, sum, pagesNum]);

  const setAllParams = page => {
    dispatch(changePage(page));
    search
      ? setSearchParams({ filter, search, page })
      : setSearchParams({ filter, page });
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleMainPag = event => {
    if (event.target !== event.currentTarget) {
      setAllParams(event.target.dataset.page);
    }
  };

  const handleNextPage = () => {
    setAllParams(+page + 1);
  };

  const handlePrevPage = () => {
    setAllParams(+page - 1);
  };

  const toFirstLastPage = event => {
    setAllParams(event.currentTarget.dataset.page);
  };

  return (
    <>
      {!isMoviesLoading && !isTVShowsLoading && (
        <div className={scss.pagination}>
          {page > 1 && (
            <button className={scss.pagPrev} onClick={handlePrevPage}>
              <BsChevronLeft />
            </button>
          )}
          {page > pagesNum - 1 && (
            <>
              <button
                className={scss.pagTotal}
                data-page="1"
                onClick={toFirstLastPage}
              >
                1
              </button>
              <p className={scss.pagElse}>...</p>
            </>
          )}
          <ul ref={pagination} className={scss.pagList} onClick={handleMainPag}>
            {totalPages > pagesNum
              ? Array.from({ length: pagesNum }).map((_, i) =>
                  1 + i + sum <= totalPages ? (
                    <button key={1 + i} data-page={1 + i + sum}>
                      {1 + i + sum}
                    </button>
                  ) : null
                )
              : Array.from({ length: totalPages }).map((_, i) => (
                  <button key={1 + i} data-page={1 + i + sum}>
                    {1 + i + sum}
                  </button>
                ))}
          </ul>
          {totalPages > pagesNum && more && (
            <>
              <p className={scss.pagElse}>...</p>
              <button
                className={scss.pagTotal}
                data-page={totalPages}
                onClick={toFirstLastPage}
              >
                {totalPages}
              </button>
            </>
          )}
          {+page + 1 <= totalPages && (
            <button className={scss.pagNext} onClick={handleNextPage}>
              <BsChevronRight />
            </button>
          )}
        </div>
      )}
    </>
  );
}
