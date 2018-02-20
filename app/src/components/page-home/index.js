import React, { Component } from 'react';
import embeddedTweets from '../../utils/twitter-embed';

class PageHome extends Component {

  componentDidMount () {
    embeddedTweets();
  }

  render () {
    return (
      <div className="page page-home">
        <h1>Home page</h1>
        <div className="timeline">
          <a className="twitter-timeline" href="https://twitter.com/realDonaldTrump?ref_src=twsrc%5Etfw">Tweets by realDonaldTrump</a>
        </div>
      </div>
    );
  }
}

export default PageHome;
