const GET_IMAGES_URL = 'https://24.javascript.pages.academy/kekstagram/data';
const POST_IMAGE_URL = 'https://24.javascript.pages.academy/kekstagram';

const getImagesFromServer = () => fetch(GET_IMAGES_URL).then((response) => response.json());

const submitImageToServer = (formData) => fetch(POST_IMAGE_URL, {
  method: 'post',
  body: formData,
}).then((response) => response.json());

export {
  getImagesFromServer,
  submitImageToServer
};
