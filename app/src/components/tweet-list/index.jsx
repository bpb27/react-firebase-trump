import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tweet from '../tweet/'
import './style.scss';

class TweetList extends Component {

  static propTypes = {
    queryList: PropTypes.array,
    limit: PropTypes.number,
    tweets: PropTypes.array,
  }

  get tweetsDisplayed () {
    return this.props.tweets
      .slice(0, this.props.limit)
      .map((tweet, i) => <Tweet key={tweet.id_str} data={tweet} index={i} queryList={this.props.queryList}/>);
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
