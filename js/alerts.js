import {isEscapeKey} from './utils.js';

const successTemplate = document.querySelector('#success').content;
const successTemplateSection = successTemplate.querySelector('section');
const errorTemplate = document.querySelector('#error').content;
const errorTemplateSection = errorTemplate.querySelector('section');
const errorFirstDownloadTemplate = document.querySelector('#error-first-download-images').content;
const errorFirstDownloadTemplateSection = errorFirstDownloadTemplate.querySelector('section');

const showErrorUploadMessage = () => {
  const errorElement = errorTemplateSection.cloneNode(true);
  const button = errorElement.querySelector('button');
  const errorInner = errorElement.querySelector('.error__inner');

  document.addEventListener('keydown', onKeyDown);
  button.addEventListener('click', onClickButton);
  document.addEventListener('click', onOutsideClick);

  document.body.appendChild(errorElement);

  function onKeyDown(evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      errorElement.remove();
      document.addEventListener('keydown', onKeyDown);
    }
  }

  function onClickButton() {
    errorElement.remove();
    button.removeEventListener('click', onClickButton);
  }

  function onOutsideClick(evt) {
    if (errorInner.contains(evt.target)) {
      return;
    }
    errorElement.remove();
    document.removeEventListener('click', onOutsideClick);
  }
};

const showErrorFirstDownloadMessage = () => {
  const errorElement = errorFirstDownloadTemplateSection.cloneNode(true);
  document.body.appendChild(errorElement);
};

const showSuccessUploadMessage = () => {
  const successElement = successTemplateSection.cloneNode(true);
  const button = successElement.querySelector('button');
  const successInner = successElement.querySelector('.success__inner');

  document.addEventListener('keydown', onKeyDown);
  button.addEventListener('click', onClickButton);
  document.addEventListener('click', onOutsideClick);

  document.body.appendChild(successElement);

  function onKeyDown(evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      successElement.remove();
      document.addEventListener('keydown', onKeyDown);
    }
  }

  function onClickButton() {
    successElement.remove();
    button.removeEventListener('click', onClickButton);
  }

  function onOutsideClick(evt) {
    if (successInner.contains(evt.target)) {
      return;
    }
    successElement.remove();
    document.removeEventListener('click', onOutsideClick);
  }
};

export {showSuccessUploadMessage, showErrorUploadMessage, showErrorFirstDownloadMessage};
