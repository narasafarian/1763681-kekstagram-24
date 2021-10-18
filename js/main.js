// Списала частично этот код отсюда-  https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(min, max) {
  if (min === max) {
    return min;
  }
  if (max < min) {
    return('Ошибка');
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
getRandomInt(1, 2);


function commentLengthCheck(lineCheked, maxLength) {
  return lineCheked.length <= maxLength;
}
commentLengthCheck('Hello, master!', 35);
