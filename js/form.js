import {isEscapeKey, hasDuplicates} from './utils.js';
import {setImageScale} from './photo_editor.js';

const uploadPhoto = document.querySelector('#upload-file');
const photoEditing = document.querySelector('.img-upload__overlay');
const closePhotoEditing = document.querySelector('#upload-cancel');
const textDescription = document.querySelector('.text__description');
const DESCRIPTION_MAX_LENGTH = 140;
const hashtagRegExp = /^#[A-Za-zA-Яа-яЁё0-9]{1,19}$/;
const MAX_HASHTAGS_COUNT = 5;
const imageUploadForm = document.querySelector('.img-upload__form');
const DEFAULT_SCALE_VALUE = 100;
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const SCALE_STEP = 25;
const scaleControlValue = document.querySelector('.scale__control--value');
const imageUploadPreview = document.querySelector('.img-upload__preview');

const noneEffectElement = document.querySelector('#effect-none');
const chromeEffectElement = document.querySelector('#effect-chrome');
const sepiaEffectElement = document.querySelector('#effect-sepia');
const marvinEffectElement = document.querySelector('#effect-marvin');
const phobosEffectElement = document.querySelector('#effect-phobos');
const heatEffectElement = document.querySelector('#effect-heat');
const effectLevelValue = document.querySelector('.effect-level__value');
const sliderElement = document.querySelector('.effect-level__slider');
const effectLevelElement = document.querySelector('.effect-level');

const EFFECTS = {
  NONE: 'none',
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat',
};

const EFFECTS_SETTINGS = {
  chrome: {
    min: 0,
    max: 1,
    start: 1,
    step: 0.1,
    transformName: 'grayscale',
    unit: '',
  },
  sepia: {
    min: 0,
    max: 1,
    start: 1,
    step: 0.1,
    transformName: 'sepia',
    unit: '',
  },
  marvin: {
    min: 0,
    max: 100,
    start: 100,
    step: 1,
    transformName: 'invert',
    unit: '%',
  },
  phobos: {
    min: 0,
    max: 3,
    start: 3,
    step: 0.1,
    transformName: 'blur',
    unit: 'px',
  },
  heat: {
    min: 1,
    max: 3,
    start: 3,
    step: 0.1,
    transformName: 'brightness',
    unit: '',
  },
};

let currentCheckedElement = noneEffectElement;

textDescription.setAttribute('maxlength', DESCRIPTION_MAX_LENGTH);

const closePhotoEditor = () => {
  uploadPhoto.value = '';
  photoEditing.classList.add('hidden');
  document.body.classList.remove('modal-open');
  closePhotoEditing.removeEventListener('click', closePhotoEditor);
  document.removeEventListener('keydown', onKeyDown);
  textDescription.removeEventListener('keydown', onTextDescriptionKeyDown);
  imageUploadForm.removeEventListener('submit', onUploadFormSubmit);

  sliderElement.noUiSlider.destroy();

  noneEffectElement.removeEventListener('click', changeEffect);
  chromeEffectElement.removeEventListener('click', changeEffect);
  sepiaEffectElement.removeEventListener('click', changeEffect);
  marvinEffectElement.removeEventListener('click', changeEffect);
  phobosEffectElement.removeEventListener('click', changeEffect);
  heatEffectElement.removeEventListener('click', changeEffect);
};

const openPhotoEditor = () => {
  photoEditing.classList.remove('hidden');
  document.body.classList.add('modal-open');
  closePhotoEditing.addEventListener('click', closePhotoEditor);
  document.addEventListener('keydown', onKeyDown);
  textDescription.addEventListener('keydown', onTextDescriptionKeyDown);
  imageUploadForm.addEventListener('submit', onUploadFormSubmit);

  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 100,
    },
    start: 80,
    step: 1,
    connect: 'lower',
  });
  sliderElement.noUiSlider.on('update', onSliderUpdate);

  noneEffectElement.addEventListener('click', changeEffect);
  chromeEffectElement.addEventListener('click', changeEffect);
  sepiaEffectElement.addEventListener('click', changeEffect);
  marvinEffectElement.addEventListener('click', changeEffect);
  phobosEffectElement.addEventListener('click', changeEffect);
  heatEffectElement.addEventListener('click', changeEffect);

  setImageScale(DEFAULT_SCALE_VALUE);
  noneEffectElement.click();
};

uploadPhoto.addEventListener('change', openPhotoEditor);

function onKeyDown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePhotoEditor();
  }
}

const textHashtags = document.querySelector('.text__hashtags');
textHashtags.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
});

function validateHashtags (hashtagsValue) {
  if (hashtagsValue.length === 0) {
    textHashtags.setCustomValidity('');
    textHashtags.reportValidity();
    return;
  }

  const hashtags = hashtagsValue.trim().split(' ');
  const hasHashtagError = hashtags.some((hashtag) => !hashtagRegExp.test(hashtag));
  if (hashtags.length > MAX_HASHTAGS_COUNT) {
    textHashtags.setCustomValidity(`Не больше ${MAX_HASHTAGS_COUNT} хэштегов`);
  } else if (hasHashtagError) {
    textHashtags.setCustomValidity('Неправильный хэштег');
  } else if (hasDuplicates(hashtags)) {
    textHashtags.setCustomValidity('Дублируется хэштег');
  } else {
    textHashtags.setCustomValidity('');
  }
  textHashtags.reportValidity();
}

function onHashtagsInput () {
  const hashtagsValue = textHashtags.value;
  validateHashtags(hashtagsValue);
}
textHashtags.addEventListener('input', onHashtagsInput);


function onTextDescriptionKeyDown (evt) {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
}

function onUploadFormSubmit (evt) {
  if (!imageUploadForm.checkValidity()) {
    evt.preventDefault();
  }
}

scaleControlSmaller.addEventListener('click', () => {
  const scale = parseInt(scaleControlValue.value, 10);
  setImageScale(scale - SCALE_STEP);
});

scaleControlBigger.addEventListener('click', () => {
  const scale = parseInt(scaleControlValue.value, 10);
  setImageScale(scale + SCALE_STEP);
});

function changeEffect() {
  currentCheckedElement.removeAttribute('checked');
  currentCheckedElement = this;
  currentCheckedElement.setAttribute('checked', '');

  const name = this.value;
  if (name === EFFECTS.NONE) {
    effectLevelElement.classList.add('hidden');
    imageUploadPreview.style.filter = '';
    effectLevelValue.value = '';
    return;
  }

  const {min, max, start, step, transformName, unit = ''} = EFFECTS_SETTINGS[name];

  sliderElement.noUiSlider.updateOptions({
    range: {
      min,
      max,
    },
    start,
    step,
  });
  effectLevelElement.classList.remove('hidden');
  imageUploadPreview.style.filter = `${transformName}(${start}${unit})`;
  effectLevelValue.value = start;
}

function onSliderUpdate(values, handle) {
  const name = currentCheckedElement.value;

  if (name === EFFECTS.NONE) {
    return;
  }

  const value = values[handle];
  const {transformName, unit = ''} = EFFECTS_SETTINGS[name];
  imageUploadPreview.style.filter = `${transformName}(${value}${unit})`;
}
