import * as Constants from '../constants';

const defaults = {
  ascending: false,
  hour: '',
  show: true,
  sortBy: 'created_at',
  source: '',
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
  if (action.type === Constants.CHANGE_HOUR) {
    return { ...state, hour: action.data };
  }
  if (action.type === Constants.CHANGE_SORT && Constants.SORT_BY_PROPERTIES.includes(action.data)) {
    return { ...state, sortBy: action.data };
  }
  if (action.type === Constants.CHANGE_SOURCE) {
    return { ...state, source: action.data };
  }
  return state;
}

function getSources (tweets) {
  const exclude = ['year', 'source', 'id_str', 'text', 'created_at', 'retweet_count', 'in_reply_to_user_id_str', 'favorite_count', 'is_retweet'];
  const sources = tweets.reduce((hash, tweet) => ({ ...hash, [tweet.source]: true }));
  return Object.keys(sources)
    .filter((item) => !exclude.includes(item))
    .sort((a, b) => a > b ? 1 : -1);
}

export default searchOptions;
