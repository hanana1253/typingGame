const WORDS = ['sigh', 'tense', 'airplane'];

let elapsedTime = { mm: 0, ss: 0, ms: 0 };
let timerId = null;

let state = {
  wordIndex: 0,
  isFail: false
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
