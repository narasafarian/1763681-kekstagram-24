import {getPictureDescriptions} from './utils.js';

const thumbnailTemplate = document.querySelector('#picture').content;
const userPictures = document.querySelector('.pictures');


const newUserPictures = getPictureDescriptions();
const thumbnailFragment = document.createDocumentFragment();

newUserPictures.forEach((picture) => {
  const pictureElement = thumbnailTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
  thumbnailFragment.appendChild(pictureElement);
});
userPictures.appendChild(thumbnailFragment);

