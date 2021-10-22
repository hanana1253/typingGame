import {
  STORAGE_KEY,
  getFromLocalStorage,
  setLocalStorage
} from './storage.js';
import { ERROR_MSG, REG_EXP } from './constant.js';

const $input = document.getElementById('userName');
const $start = document.querySelector('.start');

const validate = name => REG_EXP.USERNAME.test(name);

$input.oninput = () => {
  $start.tabIndex = '-1';
  $start.classList.add('disabled');
};

document.querySelector('.entry-form').onsubmit = e => {
  e.preventDefault();

  const username = $input.value;
  const isValid = validate(username);
  const isUnique = getFromLocalStorage(STORAGE_KEY.RECORDS, []).every(
    record => record.username !== username
  );

  document.querySelector('.error').textContent = isUnique
    ? isValid
      ? ''
      : ERROR_MSG.INVALID
    : ERROR_MSG.NOT_UNIQUE;

  document.querySelector('.title').textContent = isValid
    ? `Welcome, ${$input.value}`
    : 'Typing game';

  $start.classList.toggle('disabled', !(isUnique && isValid));

  if (isUnique && isValid) {
    $start.tabIndex = '0';
    $start.focus();
  }
};

$start.onclick = () => {
  setLocalStorage(STORAGE_KEY.CURRENT_USER, { username: $input.value });
};
