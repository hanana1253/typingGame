const getFromLocalStorage = key => JSON.parse(window.localStorage.getItem(key));

const setLocalStorage = (key, value) =>
  window.localStorage.setItem(key, JSON.stringify(value));

const formatRecordFromMs = miliseconds => {
  const mm = parseInt(miliseconds / 6000) % 60;
  const ss = parseInt(miliseconds / 100) % 60;
  const ms = miliseconds % 100;
  // 1 => '01', 10 => '10'
  const format = n => (n < 10 ? '0' + n : n + '');
  return `${format(mm)}:${format(ss)}:${format(ms)}`;
};

export { getFromLocalStorage, setLocalStorage, formatRecordFromMs };
