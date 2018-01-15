const request = require('request');
const Twitter = require('twitter');
const firebaseAdmin = require('firebase-admin');
const credsFirebase = require('./creds-firebase.json');
const credsTwitter = require('./creds-twitter.json');

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(credsFirebase),
  databaseURL: 'https://trumptwitterarchive-361e4.firebaseio.com/'
});

function getLatest (screenName, callback) {
  const credentials = new Buffer(credsTwitter['consumer_key'] + ":" + credsTwitter['consumer_secret']).toString('base64');
  const requestParams = {
    url: 'https://api.twitter.com/oauth2/token',
    method: 'POST',
    headers: {
      "Authorization": "Basic " + credentials,
      "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
    },
    body: "grant_type=client_credentials"
  }

  request(requestParams, (error, response, body) => {
    if (error) return callback("error requesting bearer token", null);

    const bearerToken = JSON.parse(body)['access_token'];
    const client = new Twitter({
      consumer_key: credsTwitter['consumer_key'],
      consumer_secret: credsTwitter['consumer_secret'],
      bearer_token: bearerToken
    });

    const params = {
      count: 100,
      screen_name: screenName,
      trim_user: true,
      tweet_mode: 'extended',
    };

    client.get('statuses/user_timeline', params, (error, tweets, response) => {
      if (error) return callback("error requesting user timeline", null);

      const newTweets = tweets.reduce((hash, tweet) => {
        hash[tweet.id_str] = {
          id_str: tweet['id_str'],
          created_at: tweet['created_at'],
          text: tweet['full_text'] || tweet['text'],
          retweet_count: tweet['retweet_count'],
          favorite_count: tweet['favorite_count'],
          year: tweet['created_at'].split(' ')[5]
        }
        return hash;
      }, {});

      callback(null, newTweets);
    });

  });
}

getLatest('realdonaldtrump', (error, tweets) => {
  if (error) {
    console.log(error);
    process.exit();
  } else {
    firebaseAdmin.database().ref(`/tweets/25073877/`).set(tweets).then(() => {
      process.exit();
    });
  }
});
