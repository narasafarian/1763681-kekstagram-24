import {DESCRIPTIONS, MESSAGES, NAMES} from './consts.js';

const COMMENT_MIN = 1;
const COMMENT_MAX = 5;
const AVATAR_MIN = 1;
const AVATAR_MAX = 6;
const LIKES_MIN = 15;
const LIKES_MAX = 200;
const ID_MIN = 1;
const ID_MAX = 25;
const DEFAULT_MAX_LENGTH = 140;

const getRandomInt = (min, max) => {
  if (min === max) {
    return min;
  }
  if (max < min) {
    throw new Error('Введено некорректное число');
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const checkCommentLength = (lineChecked, maxLength = DEFAULT_MAX_LENGTH) => lineChecked.length <= maxLength;

const getComment = (id) => ({
  id: id,
  avatar: `img/avatar-${  getRandomInt(AVATAR_MIN, AVATAR_MAX) }.svg`,
  message: MESSAGES[getRandomInt(0, MESSAGES.length - 1)],
  name: NAMES[getRandomInt(0, NAMES.length - 1)],
});

const getComments = (amount) => {
  const comments = [];
  for (let id = 1; id <= amount; id++) {
    const comment = getComment(id);
    comments.push(comment);
  }
  return comments;
};

const getPictureDescription = (id) => ({
  id: id,
  url: `photos/${  id  }.jpg`,
  description: DESCRIPTIONS[getRandomInt(0, DESCRIPTIONS.length - 1)],
  likes: getRandomInt(LIKES_MIN, LIKES_MAX),
  comments: getComments(getRandomInt(COMMENT_MIN, COMMENT_MAX)),
});

const getPictureDescriptions = () => {
  const pictureDescriptions = [];

  for (let id = ID_MIN; id <= ID_MAX; id++)  {
    const pictureDescription = getPictureDescription(id);
    pictureDescriptions.push(pictureDescription);
  }
  return pictureDescriptions;
};

export {
  getRandomInt,
  checkCommentLength,
  getComment,
  getComments,
  getPictureDescription,
  getPictureDescriptions
};
