import {
  setLocalStorage,
  getFromLocalStorage,
  formatRecordFromMs
} from './utils.js';

// localStorage에서 가져온 데이터
// const fetchedData = [
//   { username: 'Bareum', record: 100 },
//   { username: 'Chaeyoung', record: 1100 },
//   { username: 'Sohyeong', record: 12490 },
//   { username: 'Fastcampus', record: 15000 },
//   { username: 'Fastcampus2', record: 60000 },
//   { username: 'Fastcampus3', record: 18000 },
//   { username: 'Fastcampus4', record: 20000 },
//   { username: 'Fastcampus5', record: 21000 },
//   { username: 'Fastcampus6', record: 23000 },
//   { username: 'Fastcampus7', record: 25000 },
//   { username: 'Hangyul', record: 29300 },
//   { username: 'Fastcampus8', record: 60000 },
//   { username: 'Fastcampus9', record: 129300 }
// ];

// // 실험용 localStorage 넣는 코드
// window.localStorage.setItem('records', JSON.stringify(fetchedData));
// window.localStorage.setItem(
//   'currentUser',
//   JSON.stringify({ username: 'Chaeyoung', record: 1100 })
// );

const rankState = {
  currentPage: getFromLocalStorage('currentPage', 1),
  lastPageNum: 1
};

const renderRanks = () => {
  const records = getFromLocalStorage('records', []);

  // 데이터가 없는 경우, No records yet 메시지 노출 및 result 가린 후 return
  if (!records.length) {
    document.querySelector('.ranks-table-head').textContent = 'No records yet';
    document.querySelector('.page-control').classList.add('hidden');
    return;
  }

  const LIMIT = 5;
  rankState.lastPageNum = Math.ceil(records.length / LIMIT);
  const currentPageRecords = records.slice(
    (rankState.currentPage - 1) * LIMIT,
    rankState.currentPage * LIMIT
  );

  // 5개씩 잘라서 보여주기.
  document.querySelector('.ranks-table-body').innerHTML = currentPageRecords
    .map(
      ({ username, record }, index) =>
        `<tr>
        <td>${(rankState.currentPage - 1) * LIMIT + index + 1}</td>
        <td class="username">${username}</td>
        <td>${formatRecordFromMs(record)}</td>
      </tr>`
    )
    .join('');

  // 마지막 페이지넘버에 따라 ul 요소 동적 생성 및 추가
  document.querySelector('.page-nums').innerHTML = Array.from(
    { length: rankState.lastPageNum },
    (_, i) =>
      `<li ${
        rankState.currentPage === i + 1 ? 'class="current"' : ''
      }><a href="#">${i + 1}</a></li>`
  ).join('');

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
    currentUserRank >= (rankState.currentPage - 1) * LIMIT + 1 &&
    currentUserRank <= rankState.currentPage * LIMIT
  ) {
    [...document.querySelector('.ranks-table-body').children].forEach($tr => {
      $tr.classList.toggle(
        'my-record',
        currentUser.username === $tr.querySelector('.username').textContent
      );
    });
  }
};

[...document.querySelectorAll('.prev-btn')].forEach($btn => {
  $btn.onclick = () => {
    if (rankState.currentPage === 1) return;
    rankState.currentPage = $btn.classList.contains('to-first')
      ? 1
      : rankState.currentPage - 1;
    setLocalStorage('currentPage', rankState.currentPage);
    renderRanks();
  };
});

[...document.querySelectorAll('.next-btn')].forEach($btn => {
  $btn.onclick = () => {
    if (rankState.currentPage === rankState.lastPageNum) return;
    rankState.currentPage = $btn.classList.contains('to-last')
      ? rankState.lastPageNum
      : rankState.currentPage + 1;
    setLocalStorage('currentPage', rankState.currentPage);
    renderRanks();
  };
});

document.addEventListener('DOMContentLoaded', renderRanks);
