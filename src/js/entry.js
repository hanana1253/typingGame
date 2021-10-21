import { getFromLocalStorage, setLocalStorage } from './utils.js';
// test용
// setLocalStorage('records', fetchedData);

// username 등록 (state에서 로컬 값 변경해줘야 함)
// const setCurrentUser = userName =>
//   localStorage.setItem('currentUser', userName);

const validate = name => {
  const regexp = new RegExp(/^[ㄱ-ㅎ|가-힣|a-z|A-Z|]{1,15}$/);
  return regexp.test(name);
};

// EVENTS ====================================================================
const $input = document.getElementById('userName');
const $start = document.querySelector('.start');

$input.oninput = () => {
  if ($start.classList.contains('disabled')) return;
  $start.classList.add('disabled');
};

document.querySelector('.entry-form').onsubmit = e => {
  e.preventDefault();
  const username = $input.value;
  const isValid = validate(username);
  const isUnique = getFromLocalStorage('records', []).every(
    record => record.username !== username
  );

  $start.classList.toggle('disabled', !(isUnique && isValid));
  document.querySelector('.validate>i').className =
    isUnique && isValid ? 'bx bx-check' : 'bx bx-x';

  document.querySelector('.error').textContent = isUnique
    ? isValid
      ? ''
      : '이름은 1~15자 사이의 문자로 사용할 수 있습니다.'
    : '이미 사용중인 이름입니다.';
  document.querySelector('.title').textContent = isValid
    ? `Welcome, ${$input.value}`
    : 'Typing game';

  if (!(isUnique && isValid)) return;
  $start.focus();
};

$start.onclick = () => {
  setLocalStorage('currentUser', { username: $input.value });
};
