import { getFromLocalStorage, setLocalStorage } from './utils.js';
// test용
// setLocalStorage('records', fetchedData);

// username 등록 (state에서 로컬 값 변경해줘야 함)
// const setCurrentUser = userName =>
//   localStorage.setItem('currentUser', userName);

const validate = name => {
  const regexp = new RegExp(/^[ㄱ-ㅎ|가-힣|a-z|A-Z|]{4,25}$/);
  return regexp.test(name);
};

// EVENTS ====================================================================
const $input = document.getElementById('userName');

$input.oninput = () => {
  const username = $input.value;

  const isValid = validate(username);
  const isUnique = getFromLocalStorage('records', []).every(
    record => record.username !== username
  );

  document.querySelector('.error').textContent = isUnique
    ? isValid
      ? ''
      : '이름은 4~25자 사이의 문자로 사용할 수 있습니다.'
    : '이미 사용중인 이름입니다.';

  document.querySelector('.start').disabled = !(isUnique && isValid);
};

document.querySelector('.entry-form').onsubmit = e => {
  // TODO:
  // if(!(validate(username) && getFromLocalStorage('records', []).every(
  //   record => record.username !== username
  // )) return;

  e.preventDefault();
  setLocalStorage('currentUser', { username: $input.value });
  // TODO: 알아보기g
  window.location.assign('src/game.html');
};
