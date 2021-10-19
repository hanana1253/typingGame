let rankingList = [
  { username: 'Bareum', record: { mm: 0, ss: 0, ms: 10 } },
  { username: 'Chaeyoung', record: { mm: 0, ss: 10, ms: 0 } },
  { username: 'Sohyeong', record: { mm: 0, ss: 20, ms: 0 } },
  { username: 'Hangyul', record: { mm: 0, ss: 30, ms: 0 } },
  { username: 'Fastcampus', record: { mm: 0, ss: 40, ms: 0 } }
];

/*

ranks 스토리지에 생성 (setRanks)
ranks 의 name 중복확인 (isNameExist)
ranks 에 새로운 기록 추가 (name 값 입력, record 초기값) (setRank)
닉네임 정규표현식 (isValidName)
*/

const getRankingListLength = () => rankingList.length;

// rankings 를 변수명으로 하는 것이 어떨까
const setRankingList = ({ username, record = { mm: 0, ss: 0, ms: 0 } }) => {
  rankingList = [...rankingList, { username, record }];
};

const isExistName = inputUserName =>
  rankingList.some(ranking => ranking.username === inputUserName);

window.addEventListener('DOMContentLoaded', () => {
  if (!localStorage.getItem('rankingList'))
    localStorage.setItem('rankingList', []);
});

document.getElementById('userName').oninput = e => {
  const error = document.querySelector('.error');
  // console.log(e);
  error.textContent = isExistName(e.target.value)
    ? '이미 사용중인 이름입니다.'
    : '';
};
