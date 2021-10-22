import {
  STORAGE_KEY,
  getFromLocalStorage,
  setLocalStorage
} from './storage.js';
import formatRecordFromMs from './utils.js';
import word from './word.js';

const INITIAL_COUNTDOWN = 3;

let timerId = null;
let elapsedTime = 0;

let state = {
  currentWord: word.getWord,
  leftWordsCount: 3,
  isWrong: false,
  isFinished: false,
  isBestRecord: false
};

const $word = document.querySelector('.word');
const $time = document.querySelector('.time');
const $input = document.querySelector('.game > input');

const render = (() => {
  const $error = document.querySelector('.error');
  const $left = document.querySelector('.left');
  const $popupWrap = document.querySelector('.popup-wrap');
  const $popupTitle = document.querySelector('.popup-title');
  const $popupRecord = document.querySelector('.popup-record');

  return () => {
    $word.textContent = state.currentWord;
    $left.textContent = state.leftWordsCount;
    $input.classList.toggle('error', state.isWrong);
    $error.style.display = state.isWrong ? 'block' : 'none';
    $time.textContent = formatRecordFromMs(elapsedTime);

    if (!state.isFinished) return;

    $popupWrap.style.display = 'block';
    $popupWrap.classList.toggle('best-record', state.isBestRecord);
    $popupTitle.textContent = state.isBestRecord
      ? 'Congraturations!!'
      : 'Good Job!!';
    $popupRecord.textContent =
      (state.isBestRecord ? 'The highest record : ' : 'record : ') +
      formatRecordFromMs(elapsedTime);
  };
})();

const setState = newState => {
  state = newState;
  render();
};

const measureTime = () => {
  timerId = setInterval(() => {
    elapsedTime += 10;
    $time.textContent = formatRecordFromMs(elapsedTime);
  }, 10);
};

const startCountDown = (() => {
  let countDownTimer = null;
  let countDown = INITIAL_COUNTDOWN;

  const $count = document.querySelector('.count');
  const $countDown = document.querySelector('.count-down');

  return () => {
    $count.textContent = 'READY';
    countDownTimer = setInterval(() => {
      $count.textContent = countDown--;
    }, 1000);

    setTimeout(() => {
      clearInterval(countDownTimer);
      $countDown.style.display = 'none';
      render();
      measureTime();
    }, (INITIAL_COUNTDOWN + 1) * 1000);
  };
})();

const finish = () => {
  clearInterval(timerId);

  const { username } = getFromLocalStorage(STORAGE_KEY.CURRENT_USER, {
    username: 'Anonymous'
  });
  const newRecord = { username, record: elapsedTime };
  const records = getFromLocalStorage(STORAGE_KEY.RECORDS, []);
  const updatedRecords = [newRecord, ...records].sort(
    (user1, user2) => +user1.record - +user2.record
  );
  const isBestRecord = records[0].username === username;

  setState({ ...state, isBestRecord, isFinished: true });
  setLocalStorage(STORAGE_KEY.RECORDS, updatedRecords);
  setLocalStorage(STORAGE_KEY.CURRENT_USER, newRecord);
};

const correct = () => {
  setState({
    ...state,
    currentWord: word.getWord,
    leftWordsCount: state.leftWordsCount - 1,
    isWrong: false
  });

  $input.value = '';

  if (state.leftWordsCount === 0) {
    finish();
  }
};
const wrong = () => setState({ ...state, isWrong: true });

window.addEventListener('DOMContentLoaded', startCountDown);

$input.onkeyup = e => {
  if (e.key !== 'Enter') return;

  $input.value === $word.textContent ? correct() : wrong();
};

$input.oninput = () => {
  new Audio('src/audios/keyboard.wav').play();
};
