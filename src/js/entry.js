import { getFromLocalStorage, setLocalStorage } from './utils.js';
// test용
// setLocalStorage('records', fetchedData);

// username 등록 (state에서 로컬 값 변경해줘야 함)
// const setCurrentUser = userName =>
//   localStorage.setItem('currentUser', userName);

const isValidRegexp = name => {
  const regexp = new RegExp(/^[ㄱ-ㅎ|가-힣|a-z|A-Z|]{4,25}$/);
  return regexp.test(name);
};

// EVENTS ====================================================================
const $input = document.getElementById('userName');

$input.oninput = () => {
  const inputName = $input.value;

  const isNameExist =
    getFromLocalStorage('records', []).findIndex(
      record => record.username === inputName
    ) >= 0;

  const error = document.querySelector('.error');

  error.textContent = isNameExist
    ? '이미 사용중인 이름입니다.'
    : !isValidRegexp(inputName)
    ? '이름은 4~25자 사이의 문자로 사용할 수 있습니다.'
    : '';

  document
    .querySelector('.start')
    .classList.toggle('disabled', isNameExist || !isValidRegexp(inputName));
};

document.querySelector('.entry-form').onsubmit = e => {
  e.preventDefault();
  setLocalStorage('currentUser', { username: $input.value });
  window.location.assign('src/game.html');
};
