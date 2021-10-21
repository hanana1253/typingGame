import {
  getFromLocalStorage,
  setLocalStorage,
  formatRecordFromMs
} from './utils.js';

import { LS_KEY, INITIAL_COUNTDOWN } from './constant.js';
import word from './word.js';

let timerId = null;
let elapsedTime = 0;

let state = {
  currentWord: word.getWord,
  restCount: 3,
  isWrong: false,
  isFinished: false,
  isBest: false
};

const $word = document.querySelector('.word');
const $time = document.querySelector('.time');
const $input = document.querySelector('.game > input');
const $error = document.querySelector('.error');
const $left = document.querySelector('.left');

const $popupWrap = document.querySelector('.popup-wrap');
const $popupTitle = document.querySelector('.popup-title');
const $popupRecord = document.querySelector('.popup-record');

const render = () => {
  $word.textContent = state.currentWord;
  $left.textContent = state.restCount;
  $input.classList.toggle('error', state.isWrong);
  $error.style.display = state.isWrong ? 'block' : 'none';
  $time.textContent = formatRecordFromMs(elapsedTime);

  if (!state.isFinished) return;

  $popupWrap.style.display = 'block';
  $popupWrap.classList.toggle('best-record', state.isBest);
  $popupTitle.textContent = state.isBest ? 'Congraturations!!' : 'Good Job!!';
  $popupRecord.textContent =
    (state.isBest ? 'The highest record : ' : 'record : ') +
    formatRecordFromMs(elapsedTime);
};

const setState = newState => {
  state = newState;
  render();
};

const timeHandler = () => {
  timerId = setInterval(() => {
    elapsedTime += 10;
    $time.textContent = formatRecordFromMs(elapsedTime);
  }, 10);
};

const finish = () => {
  clearInterval(timerId);
  const currentUser = {
    username: getFromLocalStorage(LS_KEY.CURRENT_USER, {
      username: 'Anonymous'
    }).username,
    record: elapsedTime
  };
  const localRecords = getFromLocalStorage(LS_KEY.RECORDS, []);
  const records = [currentUser, ...localRecords].sort(
    (record1, record2) => +record1.elapsedTime - +record2.elapsedTime
  );
  const isBest = records[0].username === currentUser.username;

  setState({ ...state, isBest, isFinished: true });
  setLocalStorage(LS_KEY.RECORDS, records);
  setLocalStorage(LS_KEY.CURRENT_USER, currentUser);
};

const correct = () => {
  setState({
    ...state,
    currentWord: word.getWord,
    restCount: state.restCount - 1,
    isWrong: false
  });
  $input.value = '';

  if (state.restCount === 0) {
    finish();
  }
};
const wrong = () => setState({ ...state, isWrong: true });

window.addEventListener('DOMContentLoaded', () => {
  let countDownTimer = null;
  let countDown = INITIAL_COUNTDOWN;

  document.querySelector('.count').textContent = 'READY';
  countDownTimer = setInterval(() => {
    document.querySelector('.count').textContent = countDown--;
  }, 1000);

  setTimeout(() => {
    clearInterval(countDownTimer);
    document.querySelector('.count-down').style.display = 'none';
    render();
    timeHandler();
  }, (INITIAL_COUNTDOWN + 1) * 1000);
});

$input.onkeyup = e => {
  if (e.key !== 'Enter') return;

  $input.value === $word.textContent ? correct() : wrong();
};

$input.oninput = () => {
  new Audio('audios/keyboard.wav').play();
};
