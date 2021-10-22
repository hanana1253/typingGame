import { PAGE_VIEW_LIMIT } from './constant.js';
import {
  setSessionStorage,
  getFromSessionStorage,
  getFromLocalStorage,
  formatRecordFromMs
} from './utils.js';

const rankState = {
  currentPage: getFromSessionStorage('currentPage', 1),
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

  rankState.lastPageNum = Math.ceil(records.length / PAGE_VIEW_LIMIT);

  // 5개씩 잘라서 보여주기.
  document.querySelector('.ranks-table-body').innerHTML = (() => {
    const currentPageRecords = records.slice(
      (rankState.currentPage - 1) * PAGE_VIEW_LIMIT,
      rankState.currentPage * PAGE_VIEW_LIMIT
    );

    return currentPageRecords
      .map(
        ({ username, record }, index) =>
          `<tr>
        <td>${(rankState.currentPage - 1) * PAGE_VIEW_LIMIT + index + 1}</td>
        <td class="username">${username}</td>
        <td>${formatRecordFromMs(record)}</td>
      </tr>`
      )
      .join('');
  })();

  // currentPage 따라 처리한 ul 요소 동적 생성 및 추가
  document.querySelector('.page-nums').innerHTML = (() => {
    const indexOfFirst =
      Math.floor((rankState.currentPage - 1) / PAGE_VIEW_LIMIT) *
        PAGE_VIEW_LIMIT +
      1;
    const indexOfLast =
      indexOfFirst + PAGE_VIEW_LIMIT - 1 < rankState.lastPageNum
        ? indexOfFirst + PAGE_VIEW_LIMIT - 1
        : rankState.lastPageNum;

    return Array.from(
      { length: indexOfLast - indexOfFirst + 1 },
      (_, i) =>
        `<li ${
          rankState.currentPage === indexOfFirst + i ? 'class="current"' : ''
        }><a href="#">${indexOfFirst + i}</a></li>`
    ).join('');
  })();

  const currentUser = getFromLocalStorage('currentUser');
  // currentUser가 없으면 my-result 안보이게 처리
  if (!currentUser) {
    document.querySelector('.result').style.display = 'none';
    return;
  }

  const currentUserRank =
    records.findIndex(({ username }) => username === currentUser.username) + 1;

  // currentUser가 현재 View page 안에 있으면 my-record 클래스 이름 붙여주기
  if (
    currentUserRank >= (rankState.currentPage - 1) * PAGE_VIEW_LIMIT + 1 &&
    currentUserRank <= rankState.currentPage * PAGE_VIEW_LIMIT
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
    setSessionStorage('currentPage', rankState.currentPage);
    renderRanks();
  };
});

[...document.querySelectorAll('.next-btn')].forEach($btn => {
  $btn.onclick = () => {
    if (rankState.currentPage === rankState.lastPageNum) return;
    rankState.currentPage = $btn.classList.contains('to-last')
      ? rankState.lastPageNum
      : rankState.currentPage + 1;
    setSessionStorage('currentPage', rankState.currentPage);
    renderRanks();
  };
});

document.querySelector('.page-nums').onclick = e => {
  e.preventDefault();
  rankState.currentPage = +e.target.textContent;
  setSessionStorage('currentPage', rankState.currentPage);
  renderRanks();
};

document.addEventListener('DOMContentLoaded', renderRanks);
