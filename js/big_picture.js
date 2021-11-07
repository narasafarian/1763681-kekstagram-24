import {isEscapeKey} from './utils.js';

const MAX_COMMENTS_SHOWED = 5;

const bigPicture = document.querySelector('.big-picture');

function getCommentsFragment(comments) {
  const commentsFragment = document.createDocumentFragment();
  comments.forEach((comment) => {
    const commentElement = document.createElement('li');
    commentElement.classList.add('social__comment');
    const imageElement = document.createElement('img');
    imageElement.classList.add('social__picture');
    imageElement.setAttribute('src', comment.avatar);
    imageElement.setAttribute('alt', comment.name);
    imageElement.setAttribute('width', '35');
    imageElement.setAttribute('height', '35');
    commentElement.appendChild(imageElement);
    const textElement = document.createElement('p');
    textElement.classList.add('social__text');
    textElement.textContent = comment.message;
    commentElement.appendChild(textElement);
    commentsFragment.appendChild(commentElement);
  });

  return commentsFragment;
}

function openBigPicture (photo) {
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
  if (photo.comments.length > MAX_COMMENTS_SHOWED) {
    commentsLoader.classList.remove('hidden');
    commentsLoader.onclick = () => {
      activeComments = photo.comments.slice(currentIndex, currentIndex + MAX_COMMENTS_SHOWED);
      commentsFragment = getCommentsFragment(activeComments);
      currentIndex += activeComments.length;
      activeCommentsCountElement.textContent = currentIndex;
      socialCommentsElement.appendChild(commentsFragment);
      if (photo.comments.length === currentIndex) {
        commentsLoader.classList.add('hidden');
      }
    };
  } else {
    commentsLoader.classList.add('hidden');
  }

  document.body.classList.add('modal-open');
}

document.addEventListener('keydown', onKeyDown);


const bigPictureCancel = document.querySelector('.big-picture__cancel');
bigPictureCancel.addEventListener('click', onCloseBigPicture);

function onKeyDown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

function closeBigPicture() {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
}

function onCloseBigPicture (evt) {
  evt.preventDefault();
  closeBigPicture();
}

export {openBigPicture};
