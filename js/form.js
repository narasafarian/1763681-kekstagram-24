import {isEscapeKey, hasDuplicates} from './utils.js';
import {setImageScale} from './photo_editor.js';
import {submitImageToServer} from './ajax.js';
import {showSuccessUploadMessage, showErrorUploadMessage} from './alerts.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const uploadPhoto = document.querySelector('#upload-file');
const photoEditing = document.querySelector('.img-upload__overlay');
const closePhotoEditing = document.querySelector('#upload-cancel');
const textDescription = document.querySelector('.text__description');
const hashtagRegExp = /^#[A-Za-zA-Яа-яЁё0-9]{1,19}$/;
const MAX_HASHTAGS_COUNT = 5;
const imageUploadForm = document.querySelector('.img-upload__form');
const DEFAULT_SCALE_VALUE = 100;
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const SCALE_STEP = 25;
const scaleControlValue = document.querySelector('.scale__control--value');
const imageUploadPreview = document.querySelector('.img-upload__preview');
const imagePreview = imageUploadPreview.querySelector('img');
const textHashtags = document.querySelector('.text__hashtags');
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

const closePhotoEditor = () => {
  resetUploadForm();
  textHashtags.removeEventListener('keydown', onTexHashtagKeyDown);
  textHashtags.removeEventListener('input', onHashtagsInput);
  scaleControlSmaller.removeEventListener('click', onScaleControlSmallerClick);
  scaleControlBigger.removeEventListener('click', onScaleControlBiggerClick);

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
  textHashtags.addEventListener('keydown', onTexHashtagKeyDown);
  textHashtags.addEventListener('input', onHashtagsInput);
  scaleControlSmaller.addEventListener('click', onScaleControlSmallerClick);
  scaleControlBigger.addEventListener('click', onScaleControlBiggerClick);

  setImageScale(DEFAULT_SCALE_VALUE);
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

  noneEffectElement.click();
};

function setPreviewImage() {
  const file = uploadPhoto.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    imagePreview.src = URL.createObjectURL(file);
  }
}

function onUploadPhotoChange() {
  setPreviewImage();
  openPhotoEditor();
}

function onKeyDown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePhotoEditor();
  }
}

function validateHashtags(hashtagsValue) {
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

function onHashtagsInput() {
  const hashtagsValue = textHashtags.value;
  validateHashtags(hashtagsValue);
}


function onTextDescriptionKeyDown(evt) {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
}

function resetUploadForm() {
  uploadPhoto.value = '';
  textHashtags.value = '';
  textDescription.value = '';
  setImageScale(DEFAULT_SCALE_VALUE);
  noneEffectElement.click();
}

function onUploadFormSubmit(evt) {
  evt.preventDefault();
  if (!imageUploadForm.checkValidity()) {
    return;
  }

  const formData = new FormData(imageUploadForm);
  submitImageToServer(formData)
    .then(() => {
      closePhotoEditor();
      showSuccessUploadMessage();
    })
    .catch(() => {
      showErrorUploadMessage();
    });
}

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
  effectLevelValue.value = value;
}

function onTexHashtagKeyDown(evt) {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
}

function onScaleControlBiggerClick() {
  const scale = parseInt(scaleControlValue.value, 10);
  setImageScale(scale + SCALE_STEP);
}

function onScaleControlSmallerClick() {
  const scale = parseInt(scaleControlValue.value, 10);
  setImageScale(scale - SCALE_STEP);
}

export {onUploadPhotoChange, uploadPhoto};
