import { getFromLocalStorage, formatRecordFromMs } from './utils.js';

// // localStorage에서 가져온 데이터
const fetchedData = [
  { username: 'Bareum', record: 100 },
  { username: 'Chaeyoung', record: 1100 },
  { username: 'Sohyeong', record: 12490 },
  { username: 'Fastcampus', record: 15000 },
  { username: 'Fastcampus2', record: 60000 },
  { username: 'Fastcampus3', record: 18000 },
  { username: 'Fastcampus4', record: 20000 },
  { username: 'Fastcampus5', record: 21000 },
  { username: 'Fastcampus6', record: 23000 },
  { username: 'Fastcampus7', record: 25000 },
  { username: 'Hangyul', record: 29300 },
  { username: 'Fastcampus8', record: 60000 },
  { username: 'Fastcampus9', record: 129300 }
];

// // // 실험용 localStorage 넣는 코드
window.localStorage.setItem('records', JSON.stringify(fetchedData));
window.localStorage.setItem(
  'currentUser',
  JSON.stringify({ username: 'Chaeyoung', record: 1100 })
);
// window.localStorage.setItem(
//   'currentPage',
//   JSON.stringify(1)
// );
const renderRanks = () => {
  const records = getFromLocalStorage('records');

  // 데이터가 없는 경우, No records yet 메시지 노출 및 result 가린 후 return
  if (!records) {
    document.querySelector('.ranks-table-head').textContent = 'No records yet';
    document.querySelector('.page-control').classList.add('hidden');
    return;
  }

  const currentPage = getFromLocalStorage('currentPage', 1);

  const LIMIT = 5;
  const currentPageRecords = records.slice(
    (currentPage - 1) * LIMIT,
    currentPage * LIMIT
  );

  // 5개씩 잘라서 보여주기.
  document.querySelector('.ranks-table-body').innerHTML = currentPageRecords
    .map(
      ({ username, record }, index) =>
        `<tr>
      <td>${(currentPage - 1) * LIMIT + index + 1}</td>
      <td class="username">${username}</td>
      <td>${formatRecordFromMs(record)}</td>
      </tr>`
    )
    .join('');

  const currentUser = getFromLocalStorage('currentUser');
  // currentUser가 없으면 my-result 안보이게 처리
  if (!currentUser) {
    document.querySelector('.result').style.display = 'none';
    return;
  }

  const currentUserRank =
    records.findIndex(({ username }) => username === currentUser.username) + 1;

  // document.querySelector('.my-rank').textContent = currentUserRank;
  // document.querySelector('.my-result').textContent = formatRecordFromMs(
  //   currentUser.record
  // );
  // document.querySelector('.total-players').textContent = fetchedData.length;
  // document.querySelector('.return').textContent = 'Try Again';

  // currentUser가 현재 View page 안에 있으면 my-record 클래스 이름 붙여주기
  if (
    currentUserRank >= (currentPage - 1) * LIMIT + 1 &&
    currentUserRank <= currentPage * LIMIT
  ) {
    [...document.querySelector('.ranks-table-body').children].forEach($tr => {
      $tr.classList.toggle(
        'my-record',
        currentUser.username === $tr.querySelector('.username').textContent
      );
    });
  }
};

document.addEventListener('DOMContentLoaded', renderRanks);
