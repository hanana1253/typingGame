import {
  STORAGE_KEY,
  getFromLocalStorage,
  setLocalStorage
} from './storage.js';

const ERROR_MSG = {
  INVALID: 'Use only 4-12 alphabet letters',
  NOT_UNIQUE: 'Username already exist'
};

const REG_EXP = {
  USERNAME: /^[a-z|A-Z|]{4,12}$/
};

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

  document.querySelector('.title').textContent =
    isUnique && isValid ? `Welcome, ${$input.value}` : 'Typing game';

  $start.classList.toggle('disabled', !(isUnique && isValid));

  if (isUnique && isValid) {
    $start.tabIndex = '0';
    $start.focus();
  }
};

$start.onclick = () => {
  setLocalStorage(STORAGE_KEY.CURRENT_USER, { username: $input.value });
};
