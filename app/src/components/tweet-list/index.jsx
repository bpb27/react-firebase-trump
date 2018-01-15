import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tweet from '../tweet/'
import './style.css';

class TweetList extends Component {

  static propTypes = {
    limit: PropTypes.number,
    query: PropTypes.string,
    tweets: PropTypes.array,
  }

  get tweetsDisplayed () {
    return this.props.tweets
      .slice(0, this.props.limit)
      .map((tweet, i) => <Tweet key={tweet.id_str} data={tweet} index={i} query={this.props.query}/>);
  }

  render () {
    return (
      <div className="tweet-list">
        {this.tweetsDisplayed}
      </div>
    );
  }

}

export default TweetList;
