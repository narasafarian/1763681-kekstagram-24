function getRandomInt(min, max) {
  if (min === max) {
    return min;
  }
  if (max < min) {
    throw new Error('Введено некорректное число');
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
getRandomInt(1, 2);

const DEFAULT_MAX_LENGTH = 140;
function checkCommentLength(lineChecked, maxLength = DEFAULT_MAX_LENGTH) {
  return lineChecked.length <= maxLength;
}
checkCommentLength('Hello, master!', 35);
checkCommentLength('Hello, master!');
