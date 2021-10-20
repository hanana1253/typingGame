let rankingList = [
  { username: 'Bareum', record: { mm: 0, ss: 0, ms: 10 } },
  { username: 'Chaeyoung', record: { mm: 0, ss: 10, ms: 0 } },
  { username: 'Sohyeong', record: { mm: 0, ss: 20, ms: 0 } },
  { username: 'Hangyul', record: { mm: 0, ss: 30, ms: 0 } },
  { username: 'Fastcampus', record: { mm: 0, ss: 40, ms: 0 } }
];

// rankings 를 변수명으로 하는 것이 어떨까
const setUserName = ({ username, record = { mm: 0, ss: 0, ms: 0 } }) => {
  rankingList = [...rankingList, { username, record }];
};

const isExistName = inputUserName =>
  rankingList.some(ranking => ranking.username === inputUserName);

const isValidName = name => {
  const regexp = new RegExp(/^[ㄱ-ㅎ|가-힣|a-z|A-Z|]{4,25}$/);
  return regexp.test(name);
};

// EVENTS ====================================================================

window.addEventListener('DOMContentLoaded', () => {
  if (!localStorage.getItem('rankingList'))
    localStorage.setItem('rankingList', []);
});

document.getElementById('userName').oninput = e => {
  const inputName = e.target.value;
  const isValid = isExistName(inputName) && isValidName(inputName);
  const error = document.querySelector('.error');

  error.textContent = isExistName(inputName)
    ? '이미 사용중인 이름입니다.'
    : !isValidName(inputName)
    ? '이름은 4~25자 사이의 문자로 사용할 수 있습니다.'
    : '';

  document.querySelector('.start').setAttribute('disabled', isValid);
};

document.querySelector('.entry-form').onsubmit = () => {
  // setting data
  setUserName(document.querySelector('.entry-form #userName'));
  // redirect to game start page
};
