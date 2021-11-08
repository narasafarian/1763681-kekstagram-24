const getRandomInt = (min, max) => {
  if (min === max) {
    return min;
  }
  if (max < min) {
    throw new Error('Введено некорректное число');
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const isEscapeKey = (evt) => evt.key === 'Escape';

function hasDuplicates(array) {
  return (new Set(array)).size !== array.length;
}

export {
  getRandomInt,
  isEscapeKey,
  hasDuplicates
};
