import { NavLink } from "react-router-dom";
import Filter from '../Filter/Filter';
import SearchMovies from '../SearchMovies/SearchMovies'
import css from './Navigation.module.css';
import clsx from "clsx";
import { useDispatch } from "react-redux";
import { changeTrending } from "../../redux/filter/slice";

export default function Navigation() {
  const navLink = ({ isActive }) => clsx(css.navLink, isActive && css.active);
  const dispatch = useDispatch();

  const handleRefresh = () => {
    dispatch(changeTrending('day'));
  }
  return (
    <nav className={css.nav}>
      <NavLink to="/" className={navLink} onClick={handleRefresh}>
        Home
      </NavLink>
      <NavLink to="/movies" className={navLink} onClick={handleRefresh}>
        Movies
      </NavLink>
      <NavLink to="/shows" className={navLink} onClick={handleRefresh}>
        TV shows
      </NavLink>
      <Filter/>
      <SearchMovies/>
    </nav>
  )
}