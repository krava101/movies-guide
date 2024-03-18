import { useSearchParams } from "react-router-dom";
import MovieList from "../../components/MovieList/MovieList";
import css from './MoviesPage.module.css';
import { IoSearch } from "react-icons/io5";
import { useEffect, useState } from "react";
import { fetchQueryMovies } from "../../movies";
import toast, { Toaster } from 'react-hot-toast';
import { DNA } from "react-loader-spinner";

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
    setSearchParams({query: event.currentTarget.elements.query.value})
    event.target.reset();
  }

  return (
    <>
      <form className={css.form} onSubmit={onSubmit}>
        <input
          type="text"
          name="query"
          placeholder="Search movies"
          autoComplete="off"
        />
        <button type="submit"><IoSearch /></button>
      </form>
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
      <MovieList movies={movies} />
      <Toaster position="top-right" reverseOrder={false}/>
    </>
  )
}