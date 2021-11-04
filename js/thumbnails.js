import {getPictureDescriptions} from './utils.js';
import {openBigPicture} from './big_picture.js';

const thumbnailTemplate = document.querySelector('#picture').content;
const userPictures = document.querySelector('.pictures');


const newUserPictures = getPictureDescriptions();
const thumbnailFragment = document.createDocumentFragment();

newUserPictures.forEach((picture) => {
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

