const render = completeType => {
  const { best, normal } = completeType;
  const $popupWrap = document.createElement('div');
  $popupWrap.className = `popup-wrap best-record`;
  $popupWrap.innerHTML = `
    <div class="popup">
      <h2 class="popup-title">${best.title}</h2>
      <p class="popup-record">${best.record} : 00:12:11</p>
      <div class="button-group">
        <a href="./ranking.html" class="button">랭킹 보기</a>
        <a href="./index.html" class="button">메인 페이지로</a>
      </div>
    </div>
  `;

  document.body.appendChild($popupWrap);
};

const completeType = {
  best: {
    title: 'Congraturations!!',
    record: 'The highest record'
  },
  normal: {
    title: 'Good Job!!',
    record: 'record'
  }
};
render(completeType);
