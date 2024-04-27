import { Link, useLocation } from "react-router-dom";
import { BsCollectionPlay } from "react-icons/bs";
import css from './TVShowCard.module.css';

export default function TVShowCard({ show }) {
  const location = useLocation();
  return (<>
    <li className={css.showListItem}>
      <Link to={`/show/` + show.id} state={{ from: location }}>
        <span className={css.icon}><BsCollectionPlay/></span>
        <img src={'https://image.tmdb.org/t/p/w400/' + show.poster_path} alt="Show img" /> 
        <div>
          <p>{show.name} </p>
          {show.first_air_date && <p>({show.first_air_date.slice(0, 4)})</p>}
        </div>
      </Link>
    </li>
  </>)
}