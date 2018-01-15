export default function (tweets, query) {
  return tweets.filter(tweet => {
    return query ? tweet.text.includes(query) : true;
  });
}
