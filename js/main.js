import {createPictures, clearPictures} from './thumbnails.js';
import {onUploadPhotoChange, uploadPhoto} from './form.js';
import {getImagesFromServer} from './ajax.js';
import {showFilters, addFilterHandlers, getRandomPictures} from './filters.js';
import {showErrorFirstDownloadMessage} from './alerts.js';

const init = () => {
  uploadPhoto.addEventListener('change', onUploadPhotoChange);

  let pictures = [];

  const onDefaultClick = () => {
    clearPictures();
    createPictures(pictures);
  };

  const onRandomClick = () => {
    const copiesOfPictures = [...pictures];
    const randomPictures = getRandomPictures(copiesOfPictures);
    clearPictures();
    createPictures(randomPictures);
  };

  const onDiscussedClick = () => {
    const discussedPictures = [...pictures];
    discussedPictures.sort(((a, b) => b.comments.length - a.comments.length));
    clearPictures();
    createPictures(discussedPictures);
  };

  addFilterHandlers({
    onDefaultClick,
    onRandomClick,
    onDiscussedClick,
  });

  getImagesFromServer()
    .then((serverPictures) => {
      pictures = serverPictures;
      createPictures(pictures);
      showFilters();
    })
    .catch(() => {
      showErrorFirstDownloadMessage();
    });
};

init();
