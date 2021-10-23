import {
  STORAGE_KEY,
  getFromLocalStorage,
} from './storage.js';
import formatRecordFromMs from './utils.js';

const PAGE_VIEW_LIMIT = 5;

const currentUser = getFromLocalStorage(STORAGE_KEY.CURRENT_USER, '');
const records = getFromLocalStorage(STORAGE_KEY.RECORDS, []);

const lastPageNum = Math.ceil(records.length / PAGE_VIEW_LIMIT);
let currentPage = 1;

const render = (() => {
  const $ranksTable = document.querySelector('.ranks-table');
  const $rankTableBody = document.querySelector('.ranks-table-body');
  const $pageControl = document.querySelector('.page-control');
  const $pageNums = document.querySelector('.page-nums');
  const $result = document.querySelector('.result');

  return () => {
    if (records.length === 0) {
      $ranksTable.classList.add('hidden');
      $pageControl.classList.add('hidden');
      $result.textContent = 'NO RECORD YET';

      return;
    }

    $rankTableBody.innerHTML = (() => {
      const currentPageRecords = records.slice(
        (currentPage - 1) * PAGE_VIEW_LIMIT,
        currentPage * PAGE_VIEW_LIMIT
      );

      return currentPageRecords
        .map(
          ({ username, record }, index) =>
            `<tr ${
              currentUser.username === username ? 'class="my-record"' : ''
            }>
        <td>${(currentPage - 1) * PAGE_VIEW_LIMIT + index + 1}</td>
        <td>${username}</td>
        <td>${formatRecordFromMs(record)}</td>
      </tr>`
        )
        .join('');
    })();

    $pageNums.innerHTML = (() => {
      const pageStartNum =
        Math.floor((currentPage - 1) / PAGE_VIEW_LIMIT) * PAGE_VIEW_LIMIT + 1;
      const pageEndNum =
        pageStartNum + PAGE_VIEW_LIMIT - 1 < lastPageNum
          ? pageStartNum + PAGE_VIEW_LIMIT - 1
          : lastPageNum;

      return Array.from(
        { length: pageEndNum - pageStartNum + 1 },
        (_, i) =>
          `<li ${
            currentPage === pageStartNum + i ? 'class="current"' : ''
          }><button type="button">${pageStartNum + i}</button></li>`
      ).join('');
    })();

    if (!currentUser || currentUser.username === 'Anonymous') {
      $result.classList.add('hidden');
      return;
    }

    const currentUserRank =
      records.findIndex(({ username }) => username === currentUser.username) +
      1;

    $result.innerHTML = ` 
    <p>Your record : ${formatRecordFromMs(currentUser.record)}</p>
    <p>You ranked ${currentUserRank} out of ${records.length} ${
      records.length > 1 ? 'users' : 'user'
    }!</p>`;
  };
})();

document.querySelector('.page-control').onclick = e => {
  if (
    !e.target.matches('.page-control button') ||
    (e.target.matches('.prev-btn') && currentPage === 1) ||
    (e.target.matches('.next-btn') && currentPage === lastPageNum)
  )
    return;

  currentPage = (() => {
    if (e.target.matches('.prev-btn')) {
      return e.target.classList.contains('to-first') ? 1 : currentPage - 1;
    }
    if (e.target.matches('.next-btn'))
      return e.target.classList.contains('to-last')
        ? lastPageNum
        : currentPage + 1;
    if (e.target.matches('.page-nums button')) {
      return +e.target.textContent;
    }
  })();

  render();
};

document.addEventListener('DOMContentLoaded', render);

