const GET_IMAGES_URL = 'https://24.javascript.pages.academy/kekstagram/data';
const POST_IMAGE_URL = 'https://24.javascript.pages.academy/kekstagram';

function getImagesFromServer() {
  return fetch(GET_IMAGES_URL)
    .then((response) => response.json());
}

function submitImageToServer(formData) {
  return fetch(POST_IMAGE_URL, {
    method: 'post',
    body: formData,
  })
    .then((response) => response.json());
}

export {
  getImagesFromServer,
  submitImageToServer
};
