const INITIAL_COUNTDOWN = 3;
const PAGE_VIEW_LIMIT = 5;

const ERROR_MSG = {
  INVALID: 'Use only 4-12 alphabet letters',
  NOT_UNIQUE: 'Username already exist'
};

const REG_EXP = {
  USERNAME: /^[a-z|A-Z|]{4,12}$/
};

export { INITIAL_COUNTDOWN, ERROR_MSG, REG_EXP, PAGE_VIEW_LIMIT };
