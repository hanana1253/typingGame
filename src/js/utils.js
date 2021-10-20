const getFromLocalStorage = key => JSON.parse(window.localStorage.getItem(key));

const setLocalStorage = (key, value) => window.localStorage.setItem(key, value);

export { getFromLocalStorage, setLocalStorage };
