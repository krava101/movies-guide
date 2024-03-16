import { NavLink } from "react-router-dom";
import css from './Navigation.module.css';
import clsx from "clsx";

export default function Navigation() {
  const navLink = ({ isActive }) => clsx(css.navLink, isActive && css.active);
  return (
    <nav className={css.nav}>
      <NavLink to="/" className={navLink}>
        Home
      </NavLink>
      <NavLink to="/movies" className={navLink}>
        Movies
      </NavLink>
    </nav>
  )
}