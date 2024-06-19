import { useSearchParams } from 'react-router-dom';
import { IoSearch } from 'react-icons/io5';
import { mainFilter } from '../../redux/filter/constants';
import toast from 'react-hot-toast';
import scss from './SearchBar.module.scss';

const notify = message => toast.error(message);

export default function SearchBar() {
  const [_, setSearchParams] = useSearchParams();

  const onSubmit = event => {
    event.preventDefault();
    const search = event.currentTarget.elements.query.value;
    if (search === '') {
      return notify('Please enter something!');
    }
    setSearchParams({
      filter: mainFilter.search,
      search: search,
      page: 1,
    });
    event.target.reset();
  };

  return (
    <form className={scss.form} onSubmit={onSubmit}>
      <input
        type="text"
        name="query"
        placeholder="Search movies and series"
        autoComplete="off"
      />
      <button type="submit">
        <IoSearch />
      </button>
    </form>
  );
}
