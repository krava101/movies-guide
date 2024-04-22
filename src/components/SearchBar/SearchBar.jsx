import { useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSearch } from '../../redux/filter/slice';
import { IoSearch } from "react-icons/io5";
import toast from 'react-hot-toast';
import css from './SearchBar.module.css';

const notify = (message) => toast.error(message);

export default function SearchBar() {
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
        placeholder="Search movies and series"
        autoComplete="off"
      />
      <button type="submit"><IoSearch /></button>
    </form>
  )
}