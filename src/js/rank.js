import { getFromLocalStorage, formatRecordFromMs } from './utils.js';

// localStorage에서 가져온 데이터
// const fetchedData = [
//   { username: 'Bareum', record: 10 },
//   { username: 'Chaeyoung', record: 110 },
//   { username: 'Sohyeong', record: 1249 },
//   { username: 'Fastcampus', record: 1500 },
//   { username: 'Fastcampus2', record: 6000 },
//   { username: 'Fastcampus3', record: 1800 },
//   { username: 'Fastcampus4', record: 2000 },
//   { username: 'Fastcampus5', record: 2100 },
//   { username: 'Fastcampus6', record: 2300 },
//   { username: 'Fastcampus7', record: 2500 },
//   { username: 'Hangyul', record: 2930 },
//   { username: 'Fastcampus8', record: 6000 },
//   { username: 'Fastcampus9', record: 12930 }
// ];

// // 실험용 localStorage 넣는 코드
// window.localStorage.setItem('records', JSON.stringify(fetchedData));
// window.localStorage.setItem(
//   'currentUser',
//   JSON.stringify({ username: 'Chaeyoung', record: 6000 })
// );

const renderRanks = () => {
  const fetchedData = getFromLocalStorage('records');

  // 데이터가 없는 경우, No records yet 메시지 노출 및 result 가린 후 return
  if (!fetchedData) {
    document.querySelector('.header-row').innerHTML = '<p>NO RECORDS YET</p>';
    document.querySelector('.result').style.display = 'none';
    return;
  }

  // 5위까지 잘라서 보여주기.
  document.querySelector('.ranks-ol').innerHTML = fetchedData
    .slice(0, 5)
    .map(
      (userData, index) =>
        `<li>
      <span>${index + 1}</span>
      <span class="username">${userData.username}</span>
      <span>${formatRecordFromMs(userData.record)}</span>
      </li>`
    )
    .join('');

  const currentUser = getFromLocalStorage('currentUser');

  // currentUser가 없으면 my-result 안보이게 처리
  if (!currentUser) {
    document.querySelector('.result').style.display = 'none';
    return;
  }

  const currentUserRank =
    fetchedData.findIndex(
      userData => userData.username === currentUser.username
    ) + 1;

  document.querySelector('.my-rank').textContent = currentUserRank;
  document.querySelector('.my-result').textContent = formatRecordFromMs(
    currentUser.record
  );

  document.querySelector('.total-players').textContent = fetchedData.length;
  document.querySelector('.return').textContent = 'Try Again';

  // currentUser가 5위 안에 드는 경우 my-record 클래스 이름 붙여주기
  if (currentUserRank < 5) {
    [...document.querySelector('.ranks-ol').children].forEach($li => {
      $li.classList.toggle(
        'my-record',
        currentUser.username === $li.querySelector('.username').textContent
      );
    });
    return;
  }
  
  // 5위 안에 안 드는 경우에는 내 기록을 순위판 최하단에 붙여주기
  const newListItem = document.createElement('li');
  newListItem.classList.add('added');
  newListItem.innerHTML = `<span>${currentUserRank}</span>
      <span>${currentUser.username}</span>
      <span>${formatRecordFromMs(currentUser.record)}</span>`;
  document.querySelector('.ranks-ol').appendChild(newListItem);
  document.querySelector('.result').classList.add('added');
};

document.addEventListener('DOMContentLoaded', renderRanks);
