const COMMENT_MIN = 1;
const COMMENT_MAX = 5;
const AVATAR_MIN = 1;
const AVATAR_MAX = 6;
const LIKES_MIN = 15;
const LIKES_MAX = 200;
const ID_MIN = 1;
const ID_MAX = 25;

function getRandomInt(min, max) {
  if (min === max) {
    return min;
  }
  if (max < min) {
    throw new Error('Введено некорректное число');
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
getRandomInt(15, 200);

const DEFAULT_MAX_LENGTH = 140;
function checkCommentLength(lineChecked, maxLength = DEFAULT_MAX_LENGTH) {
  return lineChecked.length <= maxLength;
}
checkCommentLength('Hello, master!', 35);
checkCommentLength('Hello, master!');

const DESCRIPTIONS = [
  'All men must die, but we are not men.',
  'Winter is coming.',
  'You know nothing Jon Snow.',
  'Fear cuts deeper than swords.',
  'Everything before the word ‘but’ is horseshit.',
  'A lion doesn’t concern himself with the opinions of a sheep.',
  'If you think this has a happy ending you haven’t been paying attention.',
  'Always keep your foes confused.',
  'Never forget what you are. The rest of the world will not. Wear it like armour, and it can never be used to hurt you.',
  'Chaos isn’t a pit. Chaos is a ladder.',
  'Gingers are beautiful. We’ve been kissed by fire.',
  'I don’t care about making the world a better place. Hang the world.',
  'It is beautiful beneath the sea, but if you stay too long, you’ll drown.',
  'Death is so terribly final.',
  'What do we say to the Lord of Death?',
  'Not today',
  'Why are all the gods such vicious cunts?',
  'Everything’s better with some wine in the Belly.',
  'Sleep is good and Books are better.',
  'It is not easy being drunk all the time. Everyone would do if it were easy.”',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',

];

const NAMES = [
  'Ned',
  'Ygritte',
  'Daenerys',
  'Jon',
  'Arya',
  'Ramsay',
  'Petyr',
  'Tyrion',
  'Varys',
  'Cersei',
  'Tywin',
  'Sansa',
  'Bran',
  'Melisandre',
  'Three Eyed Raven',
  'Joffrey',
  'Jaime',
  'Jorah',
  'Robb',
  'Stannis',
];

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

// eslint-disable-next-line no-unused-vars
const getPictureDescriptions = () => {
  const pictureDescriptions = [];

  for (let id = ID_MIN; id <= ID_MAX; id++)  {
    const pictureDescription = getPictureDescription(id);
    pictureDescriptions.push(pictureDescription);
  }
  return pictureDescriptions;
};
