import { getFromLocalStorage, setLocalStorage } from './utils.js';

const WORDS = ['sigh', 'tense', 'airplane'];

let elapsedTime = { mm: 0, ss: 0, ms: 0 };
let timerId = null;

let state = {
  wordIndex: 0,
  isFail: false,
  isFinished: false,
  isBest: false
};

const $word = document.querySelector('.word');
const $time = document.querySelector('.time');
const $input = document.querySelector('.container > input');
const $error = document.querySelector('.error');
const $left = document.querySelector('.left');

const render = () => {
  $word.textContent = WORDS[state.wordIndex];
  $left.textContent = WORDS.length - state.wordIndex;
  $input.classList.toggle('error', state.isFail);
  $input.value = '';
  $error.style.display = state.isFail ? 'block' : 'none';
};

const setState = newState => {
  state = newState;
  render();
};

const formatElapsedTime = (() => {
  const format = n => (n < 10 ? '0' + n : n + '');
  return ({ mm, ss, ms }) => `${format(mm)}:${format(ss)}:${format(ms)}`;
})();

const timeHandler = () => {
  let { mm, ss, ms } = elapsedTime;

  timerId = setInterval(() => {
    ms += 1;
    if (ms >= 100) {
      ss += 1;
      ms = 0;
    }
    if (ss >= 60) {
      mm += 1;
      ss = 0;
    }
    elapsedTime = { mm, ss, ms };
    $time.textContent = formatElapsedTime(elapsedTime);
  }, 10);
};

const finish = () => {
  clearInterval(timerId);
  // 1. currentUser :{ username: -> getLocal , userRecord = elapsedTime }
  // 2. get record list
  // 3. list add userRecord
  // 4. sort
  // 5.  0번 인덱스가 === username ? isBest: true, false
  // 6 새로 정렬된 리스트를 storage set
  // 7. setState({...state, isBest, isFinish: true})
  const userRecord = {
    username: getFromLocalStorage('currentUser').username,
    record: elapsedTime
  };
  const localRecords = getFromLocalStorage('records') || [];
  // localStorage 객체에 밀리세컨드 기록 넣어두기. 그 기록 빼와서 소팅하기
  const records = [userRecord, ...localRecords];
  const isBest = records[0].username === userRecord.username;
  setState({ ...state, isBest, isFinished: true });
  setLocalStorage('records', records);
  console.log('끝');

  // 팝업 등장
};

const correct = () => {
  setState({ wordIndex: state.wordIndex + 1, isFail: false });

  if (state.wordIndex === WORDS.length) {
    finish();
  }
};
const wrong = () => setState({ ...state, isFail: true });

window.addEventListener('DOMContentLoaded', () => {
  render();
  timeHandler();
});

$input.addEventListener('keyup', e => {
  if (e.key !== 'Enter') return;

  $input.value === WORDS[state.wordIndex] ? correct() : wrong();
});
