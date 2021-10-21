const getFromLocalStorage = (key, fallbackValue) =>
  JSON.parse(window.localStorage.getItem(key)) ?? fallbackValue;

const setLocalStorage = (key, value) =>
  window.localStorage.setItem(key, JSON.stringify(value));

const formatRecordFromMs = (() => {
  const format = n => (n < 10 ? '0' + n : n + '');

  return elapsedTimeInMs => {
    const [mm, ss, ms] = [
      Math.floor(elapsedTimeInMs / 60000),
      Math.floor((elapsedTimeInMs % 60000) / 1000),
      Math.floor((elapsedTimeInMs % 1000) / 10)
    ];
    return `${format(mm)}:${format(ss)}:${format(ms)}`;
  };
})();

export { getFromLocalStorage, setLocalStorage, formatRecordFromMs };
