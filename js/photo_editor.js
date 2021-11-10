const MIN_VALUE = 25;
const MAX_VALUE = 100;

const scaleControlValue = document.querySelector('.scale__control--value');
const imageUploadPreview = document.querySelector('.img-upload__preview');

const setImageScale = (scale) => {
  if (scale > MAX_VALUE) {
    scale = MAX_VALUE;
  } else if (scale < MIN_VALUE) {
    scale = MIN_VALUE;
  }

  scaleControlValue.value = `${scale}%`;
  imageUploadPreview.style.transform = `scale(${scale / 100})`;
};

export {setImageScale};
