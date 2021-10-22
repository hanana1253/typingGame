import { PAGE_VIEW_LIMIT } from './constant.js';
import { STORAGE_KEY, getFromLocalStorage } from './storage.js';
import formatRecordFromMs from './utils.js';

const currentUser = getFromLocalStorage(STORAGE_KEY.CURRENT_USER, '');
const records = getFromLocalStorage(STORAGE_KEY.RECORDS, []);
const lastPageNum = Math.ceil(records.length / PAGE_VIEW_LIMIT);

const state = {
  currentPage: 1
};

const render = () => {
  if (!records.length) {
    document
      .querySelector('.ranks-table')
      .classList.toggle('hidden', !records.length);
    document
      .querySelector('.page-control')
      .classList.toggle('hidden', !records.length);
    document.querySelector('.result').textContent = 'NO RECORD YET';

    return;
  }

  // 5개씩 잘라서 보여주기.
  document.querySelector('.ranks-table-body').innerHTML = (() => {
    const currentPageRecords = records.slice(
      (state.currentPage - 1) * PAGE_VIEW_LIMIT,
      state.currentPage * PAGE_VIEW_LIMIT
    );

    return currentPageRecords
      .map(
        ({ username, record }, index) =>
          `<tr ${currentUser.username === username ? 'class="my-record"' : ''}>
        <td>${(state.currentPage - 1) * PAGE_VIEW_LIMIT + index + 1}</td>
        <td>${username}</td>
        <td>${formatRecordFromMs(record)}</td>
      </tr>`
      )
      .join('');
  })();

  // currentPage 값에 따라 처리한 ul 요소 동적 생성 및 추가
  document.querySelector('.page-nums').innerHTML = (() => {
    const pageStartNum =
      Math.floor((state.currentPage - 1) / PAGE_VIEW_LIMIT) * PAGE_VIEW_LIMIT +
      1;
    const pageEndNum =
      pageStartNum + PAGE_VIEW_LIMIT - 1 < lastPageNum
        ? pageStartNum + PAGE_VIEW_LIMIT - 1
        : lastPageNum;

    return Array.from(
      { length: pageEndNum - pageStartNum + 1 },
      (_, i) =>
        `<li ${
          state.currentPage === pageStartNum + i ? 'class="current"' : ''
        }><a href="#">${pageStartNum + i}</a></li>`
    ).join('');
  })();

  if (!currentUser) return;

  const currentUserRank =
    records.findIndex(({ username }) => username === currentUser.username) + 1;

  document.querySelector('.result').innerHTML = ` 
    <p>Your record : ${formatRecordFromMs(currentUser.record)}</p>
    <p>You ranked ${currentUserRank} out of ${records.length} ${
    records.length > 1 ? 'users' : 'user'
  }!</p>`;
};

document.querySelector('.page-control').onclick = e => {
  if (e.target === e.currentTarget || e.target.matches('.page-nums') ||
    (e.target.matches('.prev-btn') && state.currentPage === 1) ||
    (e.target.matches('.next-btn') && state.currentPage === lastPageNum))
    return;

  state.currentPage = (() => {
    if (e.target.matches('.prev-btn')) {
      return e.target.classList.contains('to-first')
        ? 1
        : state.currentPage - 1;
    }
    if (e.target.matches('.next-btn'))
      return e.target.classList.contains('to-last')
        ? lastPageNum
        : state.currentPage + 1;
    if (e.target.matches('.page-nums a')) {
      e.preventDefault();
      return +e.target.textContent;
    }
  })();

  render();
};

document.addEventListener('DOMContentLoaded', render);