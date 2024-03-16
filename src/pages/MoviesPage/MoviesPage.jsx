import { useSearchParams } from "react-router-dom";
import MoviesList from "../../components/MoviesList/MoviesList";
import css from './MoviesPage.module.css';
import { IoSearch } from "react-icons/io5";
import { useEffect, useState } from "react";
import { fetchQueryMovies } from "../../movies";
import toast, { Toaster } from 'react-hot-toast';
import { TailSpin } from "react-loader-spinner";

const notify = (message) => toast.error(message);

export default function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [loaderActive, setLoaderActive] = useState(false);
  const search = searchParams.get("query");

  useEffect(() => {
    search && setLoaderActive(true)
    async function fetchQueryData() {
      try {
        const data = await fetchQueryMovies(search);
        setMovies(data);
      } catch (err) {
        notify(err.message + '! Please refresh the page!');
      } finally {
        setLoaderActive(false)
      }
    }search &&
    search && fetchQueryData();
  }, [search])

  const onSubmit = event => {
    event.preventDefault();
    if (event.currentTarget.elements.query.value === '') {
      return notify('Please enter something!');
    }
    event.target.reset();
  }

  return (
    <>
      <form className={css.form} onSubmit={onSubmit}>
        <TailSpin
          visible={loaderActive}
          height="40"
          width="40"
          color="#4fa94d"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
        />
        <input
          type="text"
          name="query"
          placeholder="Search movies"
          autoComplete="off"
          onChange={(e) => setSearchParams({ query: e.target.value })}
        />
        <button type="submit"><IoSearch /></button>
      </form>
      <MoviesList movies={movies} />
      <Toaster position="top-right" reverseOrder={false}/>
    </>
  )
}