import { Suspense, useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation, useParams } from "react-router-dom";
import { fetchMovieInfo} from "../../movies";
import css from './MovieDetailsPage.module.css'
import MovieInfoList from "../../components/MovieInfoList/MovieInfoList";
import clsx from "clsx";
import { DNA } from "react-loader-spinner";
import toast, { Toaster } from 'react-hot-toast';

const notify = (message) => toast.error(message);

export default function MovieDetailsPage() {

  const navLink = ({isActive}) => {
    return clsx(css.navLink, isActive && css.active)
  }
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const backLink = location.state?.from ?? '/';

  useEffect(() => {
    async function fetchSingleMovieData() {
      try {
        const data = await fetchMovieInfo(movieId);
        setMovie(data)
      } catch (err) {
        notify(err.message + '! Please refresh the page!');
      }
    }
    fetchSingleMovieData();
  }, [movieId])
    
  return (
    <>
      {movie&&<div className={css.wrapper}>
        <Link className={css.backLink} to={backLink}>Go back</Link>
      <h1>{movie.title}</h1>
      <div>
        <div className={css.moviePoster}>
          {movie.poster_path ? <img src={'https://image.tmdb.org/t/p/w400/' + movie.poster_path} alt="Movie img" /> : <span className={css.customPoster}>{movie.original_title}</span>}
          {movie.homepage && <a href={movie.homepage}>Visit homepage</a>}
        </div >
        <div className={css.movieInfo}> 
          <p>Raiting: <span>{movie.vote_average}</span></p>
          <MovieInfoList array={movie.genres}>Genres:</MovieInfoList>
          {movie.tagline && <p>Tagline: <span>{movie.tagline}</span></p>}
          <p>Release: <span>{movie.release_date}</span></p>
          <MovieInfoList array={movie.production_countries}>Countries: </MovieInfoList>
          <MovieInfoList array={movie.spoken_languages}>Spoken languages: </MovieInfoList>
          <p>Budget: <span>{movie.budget ? '$'+ movie.budget : 'No data'}</span></p>
          <p>Revenue: <span>{movie.revenue ? '$'+movie.revenue : 'No data'}</span></p>
          <p>Time: <span>{movie.runtime} min.</span></p>
          <p className={css.overview}>Overview: <span>{movie.overview}</span></p>
        </div>
      </div>
      <div className={css.movieSubInfo}>
        <div className={css.movieNav}>
          <NavLink to='cast' state={{from: backLink}} className={navLink}>Cast</NavLink>
          <NavLink to='reviews' state={{ from: backLink }} className={navLink}>Reviews</NavLink>
        </div>
          <Suspense fallback={<DNA
            visible={true}
            height="80"
            width="80"
            ariaLabel="dna-loading"
            wrapperClass="dna-wrapper" />}
          >
            <Outlet />
          </Suspense>  
      </div>
      <Toaster position="top-right" reverseOrder={false}/>
    </div>}
    </>
  )
}