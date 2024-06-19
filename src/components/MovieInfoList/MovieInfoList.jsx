import scss from './MovieInfoList.module.scss';

export default function MovieInfoList({ children, array }) {
  return (
    <div className={scss.wrapper}>
      {children}
      <span>
        <ul className={scss.list}>
          {array.map((e, i) => (
            <li key={i}>
              {(!e.english_name ? e.name : e.english_name) +
                (array.length == i + 1 ? '' : ',')}{' '}
            </li>
          ))}
        </ul>
      </span>
    </div>
  );
}
