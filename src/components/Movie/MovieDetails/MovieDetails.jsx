import { NavLink, Outlet, useLocation } from "react-router-dom";
import { Suspense } from "react";
import clsx from "clsx";
import css from './MovieDetails.module.css';


export default function MovieDetails() {
  const location = useLocation();
  const backLink = location.state?.from ?? '/';
  const navLink = ({isActive}) => {
    return clsx(css.navLink, isActive && css.active)
  }

  return (
    <div className={css.movieSubInfo}>
        <div className={css.movieNav}>
          <NavLink to='cast' state={{from: backLink}} className={navLink}>Cast</NavLink>
          <NavLink to='reviews' state={{ from: backLink }} className={navLink}>Reviews</NavLink>
          <NavLink to='similar' state={{ from: backLink }} className={navLink}>Similar movies</NavLink>
        </div>
          <Suspense fallback={<p>Loading...</p>}>
            <Outlet />
          </Suspense>  
      </div>
  )
}