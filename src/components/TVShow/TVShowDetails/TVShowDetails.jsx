import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Suspense } from 'react';
import clsx from 'clsx';
import scss from './TVShowDetails.module.scss';

export default function TVShowDetails() {
  const location = useLocation();
  const backLink = location.state?.from ?? '/';
  const navLink = ({ isActive }) => {
    return clsx(scss.navLink, isActive && scss.active);
  };

  return (
    <div className={scss.movieSubInfo}>
      <div className={scss.movieNav}>
        <NavLink to="cast" state={{ from: backLink }} className={navLink}>
          Cast
        </NavLink>
        <NavLink to="reviews" state={{ from: backLink }} className={navLink}>
          Reviews
        </NavLink>
        <NavLink to="similar" state={{ from: backLink }} className={navLink}>
          Similar shows
        </NavLink>
      </div>
      <Suspense fallback={<p>Loading...</p>}>
        <Outlet />
      </Suspense>
    </div>
  );
}
