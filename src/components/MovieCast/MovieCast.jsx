import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { fetchMovieCast } from "../../movies";
import css from './MovieCast.module.css';
import { DNA } from "react-loader-spinner";

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loaderActive, setLoaderActive] = useState(false);

  useEffect(() => {
    setLoaderActive(true);
    async function fetchData() {
      try {
        const data = await fetchMovieCast(movieId);
        setCast(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoaderActive(false);
      }
    }
    fetchData();
  }, [movieId])

  const getNameInitials = name => name.split(' ').map(e => e[0]).join('');

  return (
    <>
      <DNA
        visible={loaderActive}
        height="80"
        width="80"
        ariaLabel="dna-loading"
        wrapperClass="dna-wrapper"
      />
      <ul className={css.castList}>
        {cast.map(e => 
          <li key={e.id}>
            {e.profile_path ?
              <img src={'https://image.tmdb.org/t/p/w200/' + e.profile_path} alt="Actor's photo" /> :
              <span>{getNameInitials(e.name)}</span>
            }
            <p>{e.name}</p>
          </li>
          )}
      </ul>
    </>
  )
}