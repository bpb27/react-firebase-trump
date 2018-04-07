import * as Constants from '../constants';

const defaults = {
  show: true,
  ascending: false,
}

const searchOptions = (state = defaults, action) => {
  if (action.type === Constants.TWEETS) {
    return { ...state, sources: getSources(action.data) }
  }
  if (action.type === Constants.TOGGLE_SEARCH_OPTIONS) {
    return { ...state, show: !state.show };
  }
  if (action.type === Constants.TOGGLE_SORT_ORDER) {
    return { ...state, ascending: !state.ascending };
  }
  return state;
}

function getSources (tweets) {
  const exclude = ['year', 'source', 'id_str', 'text', 'created_at', 'retweet_count', 'in_reply_to_user_id_str', 'favorite_count', 'is_retweet'];
  const sources = tweets.reduce((hash, tweet) => ({ ...hash, [tweet.source]: true }));
  return Object.keys(sources)
    .filter((item) => !exclude.includes(item));
}

export default searchOptions;
