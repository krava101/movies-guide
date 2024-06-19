import scss from './LoadingSlider.module.scss';

function LoadingSlider() {
  const list = Array.from({ length: 7 }, (_, i) => i + 1);
  return (
    <ul className={scss.list}>
      {list.map(e => (
        <li key={e}></li>
      ))}
    </ul>
  );
}

export default LoadingSlider;
