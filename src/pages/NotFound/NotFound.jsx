import { Link } from 'react-router-dom';
import scss from './NotFound.module.scss';

export default function NotFound() {
  return (
    <div className={scss.wrapper}>
      <p>Page not found</p>
      <Link to={'/'}>Back to the homepage</Link>
    </div>
  );
}
