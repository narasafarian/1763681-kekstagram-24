import {getRandomInt} from './utils.js';
import {debounce} from './utils/debounce.js';

const MAX_RANDOM_PICTURES = 10;
const FILTER_DEBOUNCE_MS = 500;

const imageFilters = document.querySelector('.img-filters');
const filterDefault = imageFilters.querySelector('#filter-default');
const filterRandom = imageFilters.querySelector('#filter-random');
const filterDiscussed = imageFilters.querySelector('#filter-discussed');

let idHandlerMap;
let currentFilter = filterDefault;

const showFilters = () => {
  imageFilters.classList.remove('img-filters--inactive');
};

const changeActiveFilter = function() {
  const id = this.id;
  const handler = idHandlerMap[id];
  handler && handler();
  currentFilter.classList.remove('img-filters__button--active');
  currentFilter = this;
  currentFilter.classList.add('img-filters__button--active');
};

const onChangeActiveFilterDebounced = debounce(changeActiveFilter, FILTER_DEBOUNCE_MS);

const addFilterHandlers = ({
  onDefaultClick,
  onRandomClick,
  onDiscussedClick,
}) => {
  idHandlerMap = {
    'filter-default': onDefaultClick,
    'filter-random': onRandomClick,
    'filter-discussed': onDiscussedClick,
  };
  filterDefault.addEventListener('click', onChangeActiveFilterDebounced);
  filterRandom.addEventListener('click', onChangeActiveFilterDebounced);
  filterDiscussed.addEventListener('click', onChangeActiveFilterDebounced);
};

const getRandomPictures = (originalPictures) => {
  const pictures = [];
  while (pictures.length !== MAX_RANDOM_PICTURES && originalPictures.length) {
    const removed = originalPictures.splice(getRandomInt(0, originalPictures.length - 1) ,1);
    pictures.push(removed[0]);
  }

  return pictures;
};

export {showFilters, addFilterHandlers, getRandomPictures};
