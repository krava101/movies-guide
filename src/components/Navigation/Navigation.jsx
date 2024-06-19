import { changeFilter } from '../../redux/filter/slice';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import scss from './Navigation.module.scss';
import clsx from 'clsx';

export default function Navigation() {
  const navLink = ({ isActive }) => clsx(scss.navLink, isActive && scss.active);
  const dispatch = useDispatch();

  const handleRefresh = () => {
    dispatch(changeFilter('day'));
  };

  return (
    <nav className={scss.nav}>
      <NavLink to="/welcome" className={navLink} onClick={handleRefresh}>
        Home
      </NavLink>
      <NavLink to="/movies" className={navLink} onClick={handleRefresh}>
        Movies
      </NavLink>
      <NavLink to="/shows" className={navLink} onClick={handleRefresh}>
        TV shows
      </NavLink>
      <SearchBar />
    </nav>
  );
}
