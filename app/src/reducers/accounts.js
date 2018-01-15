import * as Constants from '../constants';

const accounts = (state = {}, action) => {
  if (action.type === Constants.ACCOUNTS) {
    return action.data;
  }
  return state;
}

export default accounts
