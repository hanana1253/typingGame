import { PAGE_VIEW_LIMIT } from './constant.js';
import {
  setSessionStorage,
  getFromSessionStorage,
  getFromLocalStorage,
  formatRecordFromMs
} from './utils.js';

const state = {
  currentPage: getFromSessionStorage('currentPage', 1),
  lastPageNum: 1
};
const currentUser = getFromLocalStorage('currentUser', '');
const records = getFromLocalStorage('records', []);

const renderRanks = () => {

  // 데이터가 없는 경우, No records yet 메시지 노출 및 page-control hidden 후 return
  if (!records.length) {
    document.querySelector('.ranks-table-head').textContent = 'No records yet';
    document.querySelector('.page-control').classList.add('hidden');
    return;
  }
  state.lastPageNum = Math.ceil(records.length / PAGE_VIEW_LIMIT);


  // 5개씩 잘라서 보여주기.
  document.querySelector('.ranks-table-body').innerHTML = (() => {
    const currentPageRecords = records.slice(
      (state.currentPage - 1) * PAGE_VIEW_LIMIT,
      state.currentPage * PAGE_VIEW_LIMIT
    );

    return currentPageRecords
      .map(
        ({ username, record }, index) =>
          `<tr ${currentUser.username === username ? 'class="my-record"':''}>
        <td>${(state.currentPage - 1) * PAGE_VIEW_LIMIT + index + 1}</td>
        <td>${username}</td>
        <td>${formatRecordFromMs(record)}</td>
      </tr>`
      )
      .join('');
  })();

  // currentPage 따라 처리한 ul 요소 동적 생성 및 추가
  document.querySelector('.page-nums').innerHTML = (() => {
    const indexOfFirst =
      Math.floor((state.currentPage - 1) / PAGE_VIEW_LIMIT) * PAGE_VIEW_LIMIT +
      1;
    const indexOfLast =
      indexOfFirst + PAGE_VIEW_LIMIT - 1 < state.lastPageNum
        ? indexOfFirst + PAGE_VIEW_LIMIT - 1
        : state.lastPageNum;

    return Array.from(
      { length: indexOfLast - indexOfFirst + 1 },
      (_, i) =>
        `<li ${
          state.currentPage === indexOfFirst + i ? 'class="current"' : ''
        }><a href="#">${indexOfFirst + i}</a></li>`
    ).join('');
  })();


  // currentUser 기록 보여주는 div에 넣을 것
  const currentUserRank =
    records.findIndex(({ username }) => username === currentUser.username) + 1;

};

[...document.querySelectorAll('.prev-btn')].forEach($btn => {
  $btn.onclick = () => {
    if (state.currentPage === 1) return;
    state.currentPage = $btn.classList.contains('to-first')
      ? 1
      : state.currentPage - 1;
    setSessionStorage('currentPage', state.currentPage);
    renderRanks();
  };
});

[...document.querySelectorAll('.next-btn')].forEach($btn => {
  $btn.onclick = () => {
    if (state.currentPage === state.lastPageNum) return;
    state.currentPage = $btn.classList.contains('to-last')
      ? state.lastPageNum
      : state.currentPage + 1;
    setSessionStorage('currentPage', state.currentPage);
    renderRanks();
  };
});

document.querySelector('.page-nums').onclick = e => {
  if (!e.target.matches('.page-nums a')) return;
  e.preventDefault();
  state.currentPage = +e.target.textContent;
  setSessionStorage('currentPage', state.currentPage);
  renderRanks();
};

document.addEventListener('DOMContentLoaded', renderRanks);
