const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const imageUploadPreview = document.querySelector('.img-upload__preview');

const SCALE_STEP = 25;
const DEFAULT_VALUE = 100;
const MIN_VALUE = 25;
const MAX_VALUE = 100;

function setImageScale (scale) {
  if (scale > MAX_VALUE) {
    scale = MAX_VALUE;
  } else if (scale < MIN_VALUE) {
    scale = MIN_VALUE;
  }

  scaleControlValue.value = `${scale}%`;
  imageUploadPreview.style.transform = `scale(${scale / 100})`;
}
setImageScale(DEFAULT_VALUE);

scaleControlSmaller.addEventListener('click', () => {
  const scale = parseInt(scaleControlValue.value, 10);
  setImageScale(scale - SCALE_STEP);
});

scaleControlBigger.addEventListener('click', () => {
  const scale = parseInt(scaleControlValue.value, 10);
  setImageScale(scale + SCALE_STEP);
});
