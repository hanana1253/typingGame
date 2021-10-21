const LS_KEY = {
  CURRENT_USER: 'currentUser',
  RECORDS: 'records'
};

const INITIAL_COUNTDOWN = 3;

const ERROR_MSG = {
  INVALID: '이름은 1~15자 사이의 문자로 사용할 수 있습니다',
  NOT_UNIQUE: '중복'
};

const REG_EXP = {
  USERNAME: /^[a-z|A-Z|]{2,15}$/
};

export { LS_KEY, INITIAL_COUNTDOWN, ERROR_MSG, REG_EXP };
