import scss from './LoadingShows.module.scss';

function LoadingShows() {
  const list = Array.from({ length: 20 }, (_, i) => i + 1);
  return (
    <ul className={scss.list}>
      {list.map(e => (
        <li key={e}></li>
      ))}
    </ul>
  );
}

export default LoadingShows;
