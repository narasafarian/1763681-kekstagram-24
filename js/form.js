import {checkCommentLength, isEscapeKey, hasDuplicates} from './utils.js';


const uploadPhoto = document.querySelector('#upload-file');
const photoEditing = document.querySelector('.img-upload__overlay');
const closePhotoEditing = document.querySelector('#upload-cancel');


const openPhotoEditor = () => {
  photoEditing.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

const closePhotoEditor = () => {
  uploadPhoto.value = '';
  photoEditing.classList.add('hidden');
  document.body.classList.remove('modal-open');
};
closePhotoEditing.addEventListener('click', closePhotoEditor);
uploadPhoto.addEventListener('change', openPhotoEditor);

document.addEventListener('keydown', onKeyDown);

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

const hashtagRegExp = /^#[A-Za-zA-Яа-яЁё0-9]{1,19}$/;
const MAX_HASHTAGS_COUNT = 5;


function validateHashtags () {
  const hashtagsValue = textHashtags.value;
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


textHashtags.addEventListener('input', validateHashtags);

const textDescription = document.querySelector('.text__description');
const DESCRIPTION_MAX_LENGTH = 140;

function validateTextDescription () {
  if (!checkCommentLength(textDescription.value, DESCRIPTION_MAX_LENGTH)) {
    textDescription.setCustomValidity(`Не больше ${DESCRIPTION_MAX_LENGTH} символов`);
  } else {
    textDescription.setCustomValidity('');
  }
  textDescription.reportValidity();
}

textDescription.addEventListener('input', validateTextDescription);


textDescription.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
});

const imageUploadForm = document.querySelector('.img-upload__form');
imageUploadForm.addEventListener('submit', (evt) => {
  if (!imageUploadForm.checkValidity()) {
    evt.preventDefault();
  }
});
