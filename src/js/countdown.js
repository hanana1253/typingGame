const $count = document.querySelector('.count');
const INITIAL_COUNT = 3;
let count = INITIAL_COUNT;

let countDown = null;

countDown = setInterval(() => {
  $count.textContent = count;
  count -= 1;
  if (count <= 0) {
    count = INITIAL_COUNT;
  }
}, 1000);

window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    clearInterval(countDown);
  }, 3000);
});
