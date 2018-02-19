import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fetchTweets from './actions/fetch-tweets';
import fetchCachedTweets from './actions/fetch-cached-tweets';
import { deepQueryObject } from './utils/deep-query';
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
    deepQuery: {},
  }

  componentDidMount () {
    this.props.fetchTweets('25073877');
    this.props.fetchCachedTweets('realdonaldtrump');
  }

  updateQuery (value) {
    this.setState({ limit: 100, query: value, deepQuery: deepQueryObject(value) });
  }

  loadMore () {
    if (this.count > 99) this.setState({ limit: this.state.limit + 25 });
  }

  get queryList () {
    const {deepQuery, query} = this.state;
    if (Object.keys(deepQuery).length > 0) {
      return [...deepQuery.and, ...deepQuery.or];
    } else if (query) {
      return [query];
    } else {
      return [];
    }
  }

  get tweets () {
    return queryTweets(this.props.tweets, this.state.query, this.state.deepQuery);
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
        <Query
          count={this.count}
          updateQuery={(value) => this.updateQuery(value)}
        />
        <TweetList
          queryList={this.queryList}
          limit={this.state.limit}
          tweets={this.tweets}
        />
        <VisibilitySensor
          delayedCall={true}
          onChange={() => this.loadMore()}
        />
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
