import { NavLink } from "react-router-dom";
import Filter from '../Filter/Filter';
import SearchMovies from '../SearchMovies/SearchMovies'
import css from './Navigation.module.css';
import clsx from "clsx";

export default function Navigation() {
  const navLink = ({ isActive }) => clsx(css.navLink, isActive && css.active);
  return (
    <nav className={css.nav}>
      <NavLink to="/" className={navLink}>
        Movies
      </NavLink>
      <NavLink to="/shows" className={navLink}>
        TV shows
      </NavLink>
      <Filter/>
      <SearchMovies/>
    </nav>
  )
}