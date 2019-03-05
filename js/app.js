import * as ui from './ui.js';
import * as data from './data.js';

const init = () => {
  setupEventListeners();
  data.fetchDataHome(onSuccessHome);
};

const initSingle = () => {
  setupEventListeners();
  const id = data.fetchLocalStorage();
  data.fetchDataForSingleShow(id, onSuccessSingle);
};

const setupEventListeners = () => {
  const $ul = $('.search-ul');
  $('input').on('click', () => {
    $ul.css('display', 'block');
  });

  let typingInterval;
  $('input').on('keyup', () => {
    clearTimeout(typingInterval);
    typingInterval = setTimeout(onClickHandler, 200);
  });
  $('input').on('keydown', () => {
    clearTimeout(typingInterval);
  });
};

const onClickHandler = () => {
  const input = ui.collectInput();
  data.fetchDataForSearch(input, onSuccessSearch);
};
const onSuccessHome = data => {
  ui.displayHome(data);
  $('.card-movie').on('click', function () {
    localStorage.setItem('id', $(this).attr('data-id'));
    window.location.href = './show.html';
  });
};

const onSuccessSearch = data => {
  ui.addToList(data);
  $('.search-li').on('click', function () {
    localStorage.setItem('id', $(this).attr('data-id'));
    window.location.href = './show.html';
  });
};
const onSuccessSingle = show => {
  ui.displaySingle(show);
};

export { init, initSingle };