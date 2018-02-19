import {deepQueryObject, deepQueryParse} from './deep-query';

export default function (tweets, query='') {
  const deepQuery = deepQueryObject(query);
  console.log(deepQuery);

  return tweets.filter(tweet => {
    if (!query) {
      return true;
    } else if (deepQuery) {
      return deepQueryParse(deepQuery, tweet.text);
    } else {
      return tweet.text.toLowerCase().includes(query.toLowerCase());
    }
  });
}
