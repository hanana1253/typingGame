// localStorage에서 가져온 데이터
const fetchedData = [
  { username: 'Bareum', record: { mm: 0, ss: 0, ms: 10 } },
  { username: 'Chaeyoung', record: { mm: 0, ss: 10, ms: 0 } },
  { username: 'Sohyeong', record: { mm: 0, ss: 20, ms: 0 } },
  { username: 'Hangyul', record: { mm: 0, ss: 30, ms: 0 } },
  { username: 'Fastcampus', record: { mm: 0, ss: 40, ms: 0 } }
];

const render = () => {
  // myName은 전역변수 상태를 가져올 예정이라 임시로 선언해둠
  const myName = 'Hangyul';

  document.querySelector('.ranking-list').innerHTML =
    '<li class="header-row"><span>Rank</span> <span>Username</span><span>Record</span></li>' +
    fetchedData
      .map((userData, index) => `<li ${userData.username === myName ? 'class="my-record"': ''}><span>${index}</span><span>${userData.username}</span><span>${formatRecord(userData.record)}</span></li>`)
      .join('');

  // my-rank와 my-result는 전역변수 상태를 가져와 넣을 예정
  document.querySelector('.my-rank').textContent = '4';
  document.querySelector('.my-result').textContent = '00:30:00';

  document.querySelector('.total-players').textContent = fetchedData.length;
};

// utils로 빼둘 함수
const formatRecord = (() => {
  // 1 => '01', 10 => '10'
  const format = n => (n < 10 ? '0' + n : n + '');
  return ({ mm, ss, ms }) => `${format(mm)}:${format(ss)}:${format(ms)}`;
})();


document.addEventListener('DOMContentLoaded', render);
