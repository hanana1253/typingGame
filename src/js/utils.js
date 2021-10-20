const getFromLocalStorage = key => JSON.parse(window.localStorage.getItem(key));

const setLocalStorage = (key, value) =>
  window.localStorage.setItem(key, JSON.stringify(value));

export { getFromLocalStorage, setLocalStorage };
