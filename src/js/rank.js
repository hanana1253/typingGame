import { getFromLocalStorage } from './utils.js';

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
// window.localStorage.setItem('currentUser', JSON.stringify({ username: 'Hangyul', record: 6000}))

const renderRanks = () => {
  const fetchedData = getFromLocalStorage('records');

  // 데이터가 없는 경우, No records yet 메시지 노출 후 return
  if (!fetchedData) {
    document.querySelector('.header-row').innerHTML = '<p>NO RECORDS YET</p>';
    document.querySelector('.result').style.display = 'none';
    return;
  }

  const currentUser = getFromLocalStorage('currentUser');

  // 전역상태변수에서 가져오는 함수

  document.querySelector('.ranks-ol').innerHTML = fetchedData
    .slice(0, 5)
    .map(
      (userData, index) =>
        `<li ${
          userData.username === currentUser?.username ? 'class="my-record"' : ''
        }>
      <span>${index + 1}</span>
      <span>${userData.username}</span>
      <span>${formatRecordFromMs(userData.record)}</span>
      </li>`
    )
    .join('');

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
  if (currentUserRank < 5) return;
  const newListItem = document.createElement('li');
  newListItem.classList.add('added');
  newListItem.innerHTML = `<span>${currentUserRank}</span>
      <span>${currentUser.username}</span>
      <span>${formatRecordFromMs(currentUser.record)}</span>`;
  document.querySelector('.ranks-ol').appendChild(newListItem);
  document.querySelector('.result').classList.add('added');
};

// utils로 빼둘 함수
const formatRecordFromMs = miliseconds => {
  const mm = parseInt(miliseconds / 6000) % 60;
  const ss = parseInt(miliseconds / 100) % 60;
  const ms = miliseconds % 100;
  // 1 => '01', 10 => '10'
  const format = n => (n < 10 ? '0' + n : n + '');
  return `${format(mm)}:${format(ss)}:${format(ms)}`;
};

document.addEventListener('DOMContentLoaded', renderRanks);
