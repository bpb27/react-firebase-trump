export default function embeddedTweets () {
  if (window.twttr && window.twttr.widgets && window.twttr.widgets.load) {
    window.twttr.widgets.load();
  } else {
    setTimeout(embeddedTweets, 1000);
  }
}
