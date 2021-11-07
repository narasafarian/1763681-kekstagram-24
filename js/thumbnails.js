import {openBigPicture} from './big_picture.js';

const userPictures = document.querySelector('.pictures');
const thumbnailTemplate = document.querySelector('#picture').content;
const pictureTemplate = thumbnailTemplate.querySelector('.picture');

function createPictures(pictures) {
  const thumbnailFragment = document.createDocumentFragment();

  pictures.forEach((picture) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    const image = pictureElement.querySelector('.picture__img');
    image.src = picture.url;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
    thumbnailFragment.appendChild(pictureElement);
    image.addEventListener('click', (evt) => {
      evt.preventDefault();
      openBigPicture(picture);
    });
  });
  userPictures.appendChild(thumbnailFragment);
}

function clearPictures() {
  const pictures = userPictures.querySelectorAll('.picture');
  pictures.forEach((pictureElement) => pictureElement.remove());
}

export {createPictures, clearPictures};
