import scss from './LoadingSlider.module.scss';

function LoadingSlider() {
  return (
    <div className={scss.sliderItem}>
      <div className={scss.sliderImg}></div>
      <div className={scss.sliderInfo}></div>
    </div>
  );
}

export default LoadingSlider;
