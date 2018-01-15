import * as Constants from '../constants';

const tweets = (state = [], action) => {
  if (action.type === Constants.TWEETS) {
    return [...state, ...action.data].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }
  return state;
}

export default tweets
