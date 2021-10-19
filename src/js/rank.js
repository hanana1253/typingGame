// localStorage에서 가져온 데이터
const fetchedData = [
  { username: 'Bareum', record: { mm: 0, ss: 0, ms: 10 } },
  { username: 'Chaeyoung', record: { mm: 0, ss: 10, ms: 0 } },
  { username: 'Sohyeong', record: { mm: 0, ss: 20, ms: 0 } },
  { username: 'Hangyul', record: { mm: 0, ss: 30, ms: 0 } },
  { username: 'Fastcampus', record: { mm: 0, ss: 40, ms: 0 } }
];

const render = () => {
  document.querySelector('.ranking-list').innerHTML =
    '<li class="header-row"><span>Rank</span> <span>Username</span><span>Record</span></li>' +
    fetchedData
      .map((userData, index) => `<li><span>${index}</span><span>${userData.username}</span><span>${userData.record}</span></li>`)
      .join('');
  document.querySelector('.my-rank').textContent = '';
  document.querySelector('.my-result').textContent = '';
  document.querySelector('.total-players').textContent = fetchedData.length;
};

document.addEventListener('DOMContentLoaded', render);
