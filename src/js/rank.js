import { getFromLocalStorage } from "./utils.js";

// localStorage에서 가져온 데이터
const fetchedData = [
  { username: 'Bareum', record: 10 },
  { username: 'Chaeyoung', record: 110 },
  { username: 'Sohyeong', record: 1249 },
  { username: 'Fastcampus', record: 1500 },
  { username: 'Fastcampus2', record: 6000 },
  { username: 'Fastcampus3', record: 1800 },
  { username: 'Fastcampus4', record: 2000 },
  { username: 'Fastcampus5', record: 2100 },
  { username: 'Fastcampus6', record: 2300 },
  { username: 'Fastcampus7', record: 2500 },
  { username: 'Hangyul', record: 2930 },
  { username: 'Fastcampus8', record: 6000 },
  { username: 'Fastcampus9', record: 12930 }
];

const renderRanks = () => {
  // 아직 로컬스토리지에 저장하지 않아서 가져올 수가 없으므로 아래 주석처리
  // const fetchedData = getFromLocalStorage('records');

  // myName, myRank, myRecord는 전역변수 상태를 가져올 예정이라 임시로 선언해둠
  // const currentUser = getFromLocalStorage('currentUser');
  const currentUser = { username: 'Chaeyoung', record: 110 }
  const currentUserRank = fetchedData.findIndex(
    userData => userData.username === currentUser.username
  );

  // 전역상태변수에서 가져오는 함수

  document.querySelector('.ranks-ol').innerHTML = fetchedData
    .slice(0, 5)
    .map(
      (userData, index) =>
        `<li ${
          userData.username === currentUser.username ? 'class="my-record"' : ''
        }>
            <span>${index + 1}</span>
            <span>${userData.username}</span>
            <span>${formatRecordFromMs(userData.record)}</span>
          </li>`
    )
    .join('');

  // my-rank와 my-result는 전역변수 상태를 가져와 넣을 예정
  document.querySelector('.my-rank').textContent = currentUserRank;
  document.querySelector('.my-result').textContent = formatRecordFromMs(
    currentUser.record
  );

  document.querySelector('.total-players').textContent = fetchedData.length;

  // 5위권 밖인 경우 li 요소 추가 및 result 요소 높이변경(class추가하여)
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
  // 1 => '01', 10 => '10'
  const mm = parseInt(miliseconds / 6000) % 60;
  const ss = parseInt(miliseconds / 100) % 60;
  const ms = miliseconds % 100;
  const format = n => (n < 10 ? '0' + n : n + '');
  return `${format(mm)}:${format(ss)}:${format(ms)}`;
};

document.addEventListener('DOMContentLoaded', renderRanks);
