import {isEscapeKey, hasDuplicates} from './utils.js';

const uploadPhoto = document.querySelector('#upload-file');
const photoEditing = document.querySelector('.img-upload__overlay');
const closePhotoEditing = document.querySelector('#upload-cancel');
const textDescription = document.querySelector('.text__description');
const DESCRIPTION_MAX_LENGTH = 140;
const hashtagRegExp = /^#[A-Za-zA-Яа-яЁё0-9]{1,19}$/;
const MAX_HASHTAGS_COUNT = 5;
const imageUploadForm = document.querySelector('.img-upload__form');

textDescription.setAttribute('maxlength', DESCRIPTION_MAX_LENGTH);

const closePhotoEditor = () => {
  uploadPhoto.value = '';
  photoEditing.classList.add('hidden');
  document.body.classList.remove('modal-open');
  closePhotoEditing.removeEventListener('click', closePhotoEditor);
  document.removeEventListener('keydown', onKeyDown);
  textDescription.removeEventListener('keydown', onTextDescriptionKeyDown);
  imageUploadForm.removeEventListener('submit', onUploadFormSubmit);
};

const openPhotoEditor = () => {
  photoEditing.classList.remove('hidden');
  document.body.classList.add('modal-open');
  closePhotoEditing.addEventListener('click', closePhotoEditor);
  document.addEventListener('keydown', onKeyDown);
  textDescription.addEventListener('keydown', onTextDescriptionKeyDown);
  imageUploadForm.addEventListener('submit', onUploadFormSubmit);
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
