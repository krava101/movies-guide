import { useSearchParams } from 'react-router-dom';
import { IoSearch } from "react-icons/io5";
import css from './SearchMovies.module.css';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setSearch } from '../../redux/filter/slice';

const notify = (message) => toast.error(message);

export default function SearchMovies() {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  const onSubmit = event => {
    event.preventDefault();
    const search = event.currentTarget.elements.query.value
    if (search === '') {
      return notify('Please enter something!');
    }
    setSearchParams({
      page: 1,
      query: search,
    })
    dispatch(setSearch(search))
    event.target.reset();
  }

  return (
    <form className={css.form} onSubmit={onSubmit}>
      <input
        type="text"
        name="query"
        placeholder="Search movies"
        autoComplete="off"
      />
      <button type="submit"><IoSearch /></button>
    </form>
  )
}