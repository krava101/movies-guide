import { useSelector } from "react-redux"
import { selectTotalPages } from "../../redux/movies/selectors";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import css from './PagePagination.module.css';


export default function PagePagination() {
  const totalPages = useSelector(selectTotalPages);

  return (
    <div className={css.pagination}>
      <button className={css.pagPrev}><BsChevronLeft/></button>
      <ul className={css.pagList}>
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>4</button>
        <button>5</button>
        <button>6</button>
        <button>7</button>
        <button>8</button>
        <button>9</button>
        <button>10</button>
      </ul>
      <p className={css.pagElse}>...</p>
      <button className={css.pagTotal}>{totalPages}</button>
      <button className={css.pagNext}><BsChevronRight/></button>
    </div>
  )
}