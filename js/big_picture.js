import {isEscapeKey} from './utils.js';

const MAX_COMMENTS_SHOWED = 5;
const IMAGE_WIDTH = '35';
const IMAGE_HEIGHT = '35';

const bigPicture = document.querySelector('.big-picture');
const bigPictureCancel = document.querySelector('.big-picture__cancel');

const getCommentsFragment = (comments) => {
  const commentsFragment = document.createDocumentFragment();
  comments.forEach((comment) => {
    const commentElement = document.createElement('li');
    commentElement.classList.add('social__comment');
    const imageElement = document.createElement('img');
    imageElement.classList.add('social__picture');
    imageElement.setAttribute('src', comment.avatar);
    imageElement.setAttribute('alt', comment.name);
    imageElement.setAttribute('width', IMAGE_WIDTH);
    imageElement.setAttribute('height', IMAGE_HEIGHT);
    commentElement.appendChild(imageElement);
    const textElement = document.createElement('p');
    textElement.classList.add('social__text');
    textElement.textContent = comment.message;
    commentElement.appendChild(textElement);
    commentsFragment.appendChild(commentElement);
  });

  return commentsFragment;
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const onKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const onCloseBigPicture = (evt) => {
  evt.preventDefault();
  closeBigPicture();
};

const openBigPicture = (photo) => {
  bigPicture.classList.remove('hidden');

  bigPicture.querySelector('.big-picture__img img').src = photo.url;
  bigPicture.querySelector('.likes-count').textContent = photo.likes;
  bigPicture.querySelector('.comments-count').textContent = photo.comments.length;
  bigPicture.querySelector('.social__caption').textContent = photo.description;

  const activeCommentsCountElement = bigPicture.querySelector('.comments-count-active');
  let currentIndex = 0;
  let activeComments = photo.comments.slice(currentIndex, currentIndex + MAX_COMMENTS_SHOWED);
  let commentsFragment = getCommentsFragment(activeComments);
  currentIndex += activeComments.length;
  activeCommentsCountElement.textContent = currentIndex;

  const socialCommentsElement = bigPicture.querySelector('.social__comments');
  socialCommentsElement.textContent = '';
  socialCommentsElement.appendChild(commentsFragment);

  const commentsLoader = bigPicture.querySelector('.comments-loader');

  const onClickCommentsLoader = () => {
    activeComments = photo.comments.slice(currentIndex, currentIndex + MAX_COMMENTS_SHOWED);
    commentsFragment = getCommentsFragment(activeComments);
    currentIndex += activeComments.length;
    activeCommentsCountElement.textContent = currentIndex;
    socialCommentsElement.appendChild(commentsFragment);
    if (photo.comments.length === currentIndex) {
      commentsLoader.classList.add('hidden');
    }
  };

  const onCloseBigPictureWrapper = (evt) => {
    onCloseBigPicture(evt);
    bigPictureCancel.removeEventListener('click', onCloseBigPicture);
    commentsLoader.removeEventListener('click', onClickCommentsLoader);
  };
  bigPictureCancel.addEventListener('click', onCloseBigPictureWrapper);

  const onKeyDownWrapper = (evt) => {
    onKeyDown(evt);
    document.removeEventListener('keydown', onKeyDownWrapper);
    commentsLoader.removeEventListener('click', onClickCommentsLoader);
  };
  document.addEventListener('keydown', onKeyDownWrapper);

  if (photo.comments.length > MAX_COMMENTS_SHOWED) {
    commentsLoader.classList.remove('hidden');
    commentsLoader.addEventListener('click', onClickCommentsLoader);
  } else {
    commentsLoader.classList.add('hidden');
  }

  document.body.classList.add('modal-open');
};

export {openBigPicture};
