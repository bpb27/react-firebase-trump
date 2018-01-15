import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fetchTweets from './actions/fetch-tweets';
import fetchCachedTweets from './actions/fetch-cached-tweets';
import queryTweets from './utils/query-tweets';
import Navbar from './components/navbar/';
import Query from './components/query/';
import TweetList from './components/tweet-list/';
import VisibilitySensor from 'react-visibility-sensor';
import './App.css';

class App extends Component {

  static propTypes = {
    accounts: PropTypes.object,
    tweets: PropTypes.array,
    fetchTweets: PropTypes.func,
    fetchAccounts: PropTypes.func,
  }

  state = {
    limit: 100,
    query: '',
  }

  componentDidMount () {
    this.props.fetchTweets('25073877');
    this.props.fetchCachedTweets('realdonaldtrump');
  }

  updateQuery (value) {
    this.setState({limit: 100, query: value});
  }

  loadMore () {
    if (this.count > 99) this.setState({limit: this.state.limit + 25});
  }

  get tweets () {
    return queryTweets(this.props.tweets, this.state.query);
  }

  get count () {
    if (!this.state.query) {
      return this.props.tweets.length;
    } else {
      return this.tweets.length;
    }
  }

  render () {
    return (
      <div className="App">
        <Navbar/>
        <Query count={this.count} updateQuery={(value) => this.updateQuery(value)}/>
        <TweetList limit={this.state.limit} query={this.state.query} tweets={this.tweets} />
        <VisibilitySensor delayedCall={true} onChange={() => this.loadMore()}/>
      </div>
    );
  }
}

function mapState ({ tweets }) {
  return { tweets };
}

function mapDispatch (dispatch) {
  return {
    fetchTweets: (userId) => dispatch(fetchTweets(userId)),
    fetchCachedTweets: (username) => dispatch(fetchCachedTweets(username)),
  }
}

export default connect(mapState, mapDispatch)(App);
