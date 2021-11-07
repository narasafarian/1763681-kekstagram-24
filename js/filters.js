import {getRandomInt} from './utils.js';
import {debounce} from './utils/debounce.js';

const imageFilters = document.querySelector('.img-filters');

const filterDefault = imageFilters.querySelector('#filter-default');
const filterRandom = imageFilters.querySelector('#filter-random');
const filterDiscussed = imageFilters.querySelector('#filter-discussed');

const MAX_RANDOM_PICTURES = 10;
const FILTER_DEBOUNCE_MS = 500;

let idHandlerMap;
let currentFilter = filterDefault;

function showFilters() {
  imageFilters.classList.remove('img-filters--inactive');
}

function changeActiveFilter() {
  const id = this.id;
  const handler = idHandlerMap[id];
  handler && handler();
  currentFilter.classList.remove('img-filters__button--active');
  currentFilter = this;
  currentFilter.classList.add('img-filters__button--active');
}

const changeActiveFilterDebounced = debounce(changeActiveFilter, FILTER_DEBOUNCE_MS);

function addFilterHandlers({
  onDefaultClick,
  onRandomClick,
  onDiscussedClick,
}) {
  idHandlerMap = {
    'filter-default': onDefaultClick,
    'filter-random': onRandomClick,
    'filter-discussed': onDiscussedClick,
  };
  filterDefault.addEventListener('click', changeActiveFilterDebounced);
  filterRandom.addEventListener('click', changeActiveFilterDebounced);
  filterDiscussed.addEventListener('click', changeActiveFilterDebounced);
}

function getRandomPictures(pictures) {
  const result = [];
  while (result.length !== MAX_RANDOM_PICTURES && pictures.length) {
    const removed = pictures.splice(getRandomInt(0, pictures.length - 1) ,1);
    result.push(removed[0]);
  }

  return result;
}

export {showFilters, addFilterHandlers, getRandomPictures};
