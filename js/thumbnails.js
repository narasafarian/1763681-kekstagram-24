import {openBigPicture} from './big_picture.js';
import {getImagesFromServer} from './ajax.js';
import {showErrorFirstDownloadMessage} from './alerts.js';

getImagesFromServer()
  .then((pictures) => createPictures(pictures))
  .catch(() => {
    showErrorFirstDownloadMessage();
  });

function createPictures(pictures) {
  const thumbnailTemplate = document.querySelector('#picture').content;
  const userPictures = document.querySelector('.pictures');

  const thumbnailFragment = document.createDocumentFragment();

  pictures.forEach((picture) => {
    const pictureElement = thumbnailTemplate.cloneNode(true);
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
