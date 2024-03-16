import css from './MovieInfoList.module.css';

export default function MovieInfoList({children, array}){
  return (
    <div className={css.wrapper}>
      {children} 
      <span>
        <ul className={css.list}>
          {array.map( (e, i) =>
            <li key={i}>{e.name + (array.length == i + 1 ? '' : ',')} </li>
          )}
        </ul>
      </span>
    </div>)
}