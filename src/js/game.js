import { getFromLocalStorage, setLocalStorage } from './utils.js';

const WORDS = ['sigh', 'tense', 'airplane'];

// let elapsedTime = 0;
let timerId = null;

let state = {
  elapsedTime: 0,
  wordIndex: 0,
  isWrong: false,
  isFinished: false,
  isBest: false
};

const $word = document.querySelector('.word');
const $time = document.querySelector('.time');
const $input = document.querySelector('.game > input');
const $error = document.querySelector('.error');
const $left = document.querySelector('.left');

const formatElapsedTime = (() => {
  const format = n => (n < 10 ? '0' + n : n + '');

  return elapsedTime => {
    const [mm, ss, ms] = [
      Math.floor(elapsedTime / 60000),
      Math.floor((elapsedTime % 60000) / 1000),
      Math.floor((elapsedTime % 1000) / 10)
    ];
    return `${format(mm)}:${format(ss)}:${format(ms)}`;
  };
})();

const render = () => {
  $word.textContent = WORDS[state.wordIndex];
  $left.textContent = WORDS.length - state.wordIndex;
  $input.classList.toggle('error', state.isWrong);
  $error.style.display = state.isWrong ? 'block' : 'none';
  $time.textContent = formatElapsedTime(state.elapsedTime);
};

const setState = newState => {
  state = newState;
  render();
};

const timeHandler = () => {
  timerId = setInterval(() => {
    // elapsedTime += 10;
    // $time.textContent = formatElapsedTime(elapsedTime);
    setState({ ...state, elapsedTime: state.elapsedTime + 10 });
  }, 10);
};

const finish = () => {
  clearInterval(timerId);
  const userRecord = {
    username: getFromLocalStorage('currentUser')?.username || 'Anonymous',
    record: state.elapsedTime
  };
  const localRecords = getFromLocalStorage('records') || [];
  const records = [userRecord, ...localRecords].sort(
    (userRecord1, userRecord2) => {
      if (+userRecord1.record < +userRecord2.record) return -1;
      if (+userRecord1.record > +userRecord2.record) return 1;
      return userRecord1.username < userRecord2.username
        ? -1
        : userRecord1.username > userRecord2.username
        ? 1
        : 0;
    }
  );
  const isBest = records[0].username === userRecord.username;
  setState({ ...state, isBest, isFinished: true });
  setLocalStorage('records', records);
};

const correct = () => {
  setState({ ...state, wordIndex: state.wordIndex + 1, isWrong: false });
  $input.value = '';
  if (state.wordIndex === WORDS.length) {
    finish();
  }
};
const wrong = () => setState({ ...state, isWrong: true });

window.addEventListener('DOMContentLoaded', () => {
  render();
  timeHandler();
});

$input.addEventListener('keyup', e => {
  if (e.key !== 'Enter') return;

  $input.value === WORDS[state.wordIndex] ? correct() : wrong();
});
