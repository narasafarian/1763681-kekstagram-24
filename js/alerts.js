import {isEscapeKey} from './utils.js';

const successTemplate = document.querySelector('#success').content;
const successTemplateSection = successTemplate.querySelector('section');
const errorTemplate = document.querySelector('#error').content;
const errorTemplateSection = errorTemplate.querySelector('section');
const errorFirstDownloadTemplate = document.querySelector('#error-first-download-images').content;
const errorFirstDownloadTemplateSection = errorFirstDownloadTemplate.querySelector('section');

const onKeyDown = (evt, element) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    element.remove();
  }
};

const onClickButton = (element) => {
  element.remove();
};

const onOutsideClick = (evt, elementInner, element) => {
  if (elementInner.contains(evt.target)) {
    return;
  }
  element.remove();
};

const showErrorUploadMessage = () => {
  const errorElement = errorTemplateSection.cloneNode(true);
  const button = errorElement.querySelector('button');
  const errorInner = errorElement.querySelector('.error__inner');

  const onKeyDownDocument = (evt) => {
    onKeyDown(evt, errorElement);
    document.removeEventListener('keydown', onKeyDownDocument);
  };

  const onAlertClickButton = () => {
    onClickButton(errorElement);
    button.removeEventListener('click', onAlertClickButton);
  };

  const onOutsideAlertClick = (evt) => {
    onOutsideClick(evt, errorInner, errorElement);
    document.removeEventListener('click', onOutsideAlertClick);
  };

  document.addEventListener('keydown', onKeyDownDocument);
  button.addEventListener('click', onAlertClickButton);
  document.addEventListener('click', onOutsideAlertClick);

  document.body.appendChild(errorElement);
};

const showErrorFirstDownloadMessage = () => {
  const errorElement = errorFirstDownloadTemplateSection.cloneNode(true);
  document.body.appendChild(errorElement);
};

const showSuccessUploadMessage = () => {
  const successElement = successTemplateSection.cloneNode(true);
  const button = successElement.querySelector('button');
  const successInner = successElement.querySelector('.success__inner');

  const onKeyDownDocument = (evt) => {
    onKeyDown(evt, successElement);
    document.removeEventListener('keydown', onKeyDownDocument);
  };

  const onAlertClickButton = () => {
    onClickButton(successElement);
    button.removeEventListener('click', onAlertClickButton);
  };

  const onOutsideAlertClick = (evt) => {
    onOutsideClick(evt, successInner, successElement);
    document.removeEventListener('click', onOutsideAlertClick);
  };

  document.addEventListener('keydown', onKeyDownDocument);
  button.addEventListener('click', onAlertClickButton);
  document.addEventListener('click', onOutsideAlertClick);

  document.body.appendChild(successElement);
};

export {showSuccessUploadMessage, showErrorUploadMessage, showErrorFirstDownloadMessage};
