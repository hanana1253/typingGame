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

const render = () => {
  // 아직 로컬스토리지에 저장하지 않아서 가져올 수가 없으므로 아래 주석처리
  // const fetchedData = window.localStorage('rankingList');

  // myName, myRank, myRecord는 전역변수 상태를 가져올 예정이라 임시로 선언해둠
  const myName = 'Hangyul';
  const myRank = 11;
  const myRecord = { mm: 1, ss: 30, ms: 0 };

  document.querySelector('.ranking-list').innerHTML =
    '<li class="header-row"><span>Rank</span><span>Username</span><span>Record</span></li>' +
    fetchedData
      .slice(0, 5)
      .map(
        (userData, index) =>
          `<li ${userData.username === myName ? 'class="my-record"' : ''}>
            <span>${index+1}</span>
            <span>${userData.username}</span>
            <span>${formatRecord(userData.record)}</span>
          </li>`
      )
      .join('');

  // my-rank와 my-result는 전역변수 상태를 가져와 넣을 예정
  document.querySelector('.my-rank').textContent = myRank;
  document.querySelector('.my-result').textContent = formatRecord(myRecord);

  document.querySelector('.total-players').textContent = fetchedData.length;

  // 5위권 밖인 경우 li 요소 추가 및 result 요소 높이변경(class추가하여)
  if (myRank < 5) return;
  const newListItem = document.createElement('li');
  newListItem.classList.add('added');
  newListItem.innerHTML = `<span>${myRank}</span>
      <span>${myName}</span>
      <span>${formatRecord(myRecord)}</span>`;
  document.querySelector('.ranking-list').appendChild(newListItem);
  document.querySelector('.result').classList.add('added');
};

// utils로 빼둘 함수
const formatRecord = (() => {
  // 1 => '01', 10 => '10'
  const format = n => (n < 10 ? '0' + n : n + '');
  return ({ mm, ss, ms }) => `${format(mm)}:${format(ss)}:${format(ms)}`;
})();

document.addEventListener('DOMContentLoaded', render);
