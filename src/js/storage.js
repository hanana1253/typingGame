const STORAGE_KEY = {
  CURRENT_USER: 'currentUser',
  RECORDS: 'records'
};

const getFromLocalStorage = (key, fallbackValue) =>
  JSON.parse(window.localStorage.getItem(key)) ?? fallbackValue;

const setLocalStorage = (key, value) =>
  window.localStorage.setItem(key, JSON.stringify(value));

export { STORAGE_KEY, getFromLocalStorage, setLocalStorage };
