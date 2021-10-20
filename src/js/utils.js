const getRankingListFromLocalStorage = () => {
  return JSON.parse(window.localStorage.getItem('rankingList'));
}


export { getRankingListFromLocalStorage };