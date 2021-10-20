// localStorage에서 가져온 데이터
const fetchedData = [
  { username: 'Bareum', record: { mm: 0, ss: 0, ms: 10 } },
  { username: 'Chaeyoung', record: { mm: 0, ss: 10, ms: 0 } },
  { username: 'Sohyeong', record: { mm: 0, ss: 20, ms: 0 } },
  { username: 'Fastcampus', record: { mm: 0, ss: 40, ms: 0 } },
  { username: 'Fastcampus2', record: { mm: 0, ss: 50, ms: 0 } },
  { username: 'Fastcampus3', record: { mm: 0, ss: 60, ms: 0 } },
  { username: 'Fastcampus4', record: { mm: 0, ss: 70, ms: 0 } },
  { username: 'Fastcampus5', record: { mm: 0, ss: 80, ms: 0 } },
  { username: 'Fastcampus6', record: { mm: 0, ss: 90, ms: 0 } },
  { username: 'Fastcampus7', record: { mm: 1, ss: 0, ms: 0 } },
  { username: 'Hangyul', record: { mm: 1, ss: 30, ms: 0 } },
  { username: 'Fastcampus8', record: { mm: 2, ss: 40, ms: 0 } },
  { username: 'Fastcampus9', record: { mm: 3, ss: 40, ms: 0 } }
];

// username 등록 (state에서 로컬 값 변경해줘야 함)
const setUserName = ({ username, record = { mm: 0, ss: 0, ms: 0 } }) => {
  fetchedData = [...fetchedData, { username, record }];
};

const isExistName = inputUserName =>
  fetchedData.some(ranking => ranking.username === inputUserName);

const isValidName = name => {
  const regexp = new RegExp(/^[ㄱ-ㅎ|가-힣|a-z|A-Z|]{4,25}$/);
  return regexp.test(name);
};

// EVENTS ====================================================================

window.addEventListener('DOMContentLoaded', () => {
  // TODO: state 에서 관리
  if (!localStorage.getItem('rankingList'))
    localStorage.setItem('rankingList', []);
});

document.getElementById('userName').oninput = e => {
  const inputName = e.target.value;
  const isValid = !isExistName(inputName) && isValidName(inputName);
  const error = document.querySelector('.error');

  error.textContent = isExistName(inputName)
    ? '이미 사용중인 이름입니다.'
    : !isValidName(inputName)
    ? '이름은 4~25자 사이의 문자로 사용할 수 있습니다.'
    : '';

  console.log(isValid);
  console.log(document.querySelector('.start'));
  document.querySelector('.start').disabled = !isValid;
};

document.querySelector('.entry-form').onsubmit = () => {
  // setting data
  setUserName(document.querySelector('.entry-form #userName'));
  // redirect to game start page
};
