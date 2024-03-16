import { Link } from 'react-router-dom';
import css from './NotFound.module.css';

export default function NotFound() {
  return (
    <div className={css.wrapper}>
      <p>Page not found</p>
      <Link to={'/'}>Back to the homepage</Link>
    </div>
  )
}