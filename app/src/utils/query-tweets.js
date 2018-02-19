import {deepQueryParse} from './deep-query';

export default function (tweets, query='', deepQuery) {
  const hasDeepQuery = Object.keys(deepQuery).length > 0;
  return tweets.filter(tweet => {
    if (!query) {
      return true;
    } else if (hasDeepQuery) {
      return deepQueryParse(deepQuery, tweet.text);
    } else {
      return tweet.text.toLowerCase().includes(query.toLowerCase());
    }
  });
}
