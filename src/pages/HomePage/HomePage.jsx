import { useEffect, useState } from "react";
import MoviesList from "../../components/MoviesList/MoviesList";
import { fetchMovies } from "../../movies";
import toast, { Toaster } from 'react-hot-toast';
import { DNA } from "react-loader-spinner";
import css from './HomePage.module.css';

const notify = (message) => toast.error(message);


export default function HomePage() {
  const [trendMovies, setTrendMovies] = useState([]);
  const [loaderActive, setLoaderActive] = useState(false);
  
  useEffect(() => {
    setLoaderActive(true)
    async function fetchData() {
      try {
        const data = await fetchMovies();
        setTrendMovies(data);
      } catch (err) {
        notify(err.message + '! Please refresh the page!');
      } finally {
        setLoaderActive(false)
      }
    }
    fetchData()
  },[])
  
  return (
    <>
      <p className={css.top}>Top movies of the <span>day</span></p>
      <DNA
        visible={loaderActive}
        wrapperStyle={{
          display: 'block',
          margin: '0 auto'
        }}
        height="80"
        width="80"
        ariaLabel="dna-loading"
        wrapperClass="dna-wrapper" />
      <MoviesList movies={trendMovies} />
      <Toaster position="top-right" reverseOrder={false} />
    </>
  )
}