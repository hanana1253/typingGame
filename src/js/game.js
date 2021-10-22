import {
  STORAGE_KEY,
  getFromLocalStorage,
  setLocalStorage
} from './storage.js';

import formatRecordFromMs from './utils.js';
import { INITIAL_COUNTDOWN } from './constant.js';
import word from './word.js';

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
const $error = document.querySelector('.error');
const $left = document.querySelector('.left');

const $popupWrap = document.querySelector('.popup-wrap');
const $popupTitle = document.querySelector('.popup-title');
const $popupRecord = document.querySelector('.popup-record');

const render = () => {
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

const startCountDown = () => {
  let countDown = INITIAL_COUNTDOWN;
  document.querySelector('.count').textContent = 'READY';
  timerId = setInterval(() => {
    document.querySelector('.count').textContent = countDown--;
  }, 1000);

  setTimeout(() => {
    clearInterval(timerId);
    document.querySelector('.count-down').style.display = 'none';
    render();
    measureTime();
  }, (INITIAL_COUNTDOWN + 1) * 1000);
};

const finish = () => {
  clearInterval(timerId);

  const { username } = getFromLocalStorage(STORAGE_KEY.CURRENT_USER, {
    username: 'Anonymous'
  });
  const currentUser = { username, record: elapsedTime };
  const localRecords = getFromLocalStorage(STORAGE_KEY.RECORDS, []);
  const records = [currentUser, ...localRecords].sort(
    (record1, record2) => +record1.elapsedTime - +record2.elapsedTime
  );
  const isBestRecord = records[0].username === username;

  setState({ ...state, isBestRecord, isFinished: true });
  setLocalStorage(STORAGE_KEY.RECORDS, records);
  setLocalStorage(STORAGE_KEY.CURRENT_USER, currentUser);
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
  new Audio('audios/keyboard.wav').play();
};
