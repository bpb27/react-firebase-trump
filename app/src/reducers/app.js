import * as Constants from '../constants';

const tweets = (state = {}, action) => {
  if (action.type === Constants.TWEETS_LOADED) {
    if (action.data === 'latest') {
      return { ...state, loadedLatestTweets: true };
    }
    if (action.data === 'cached') {
      return { ...state, loadedCachedTweets: true };
    }
  }
  return state;
}

export default tweets;
