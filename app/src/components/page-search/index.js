import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fetchTweets from '../../actions/fetch-tweets';
import fetchCachedTweets from '../../actions/fetch-cached-tweets';
import { deepQueryObject } from '../../utils/deep-query';
import queryTweets from '../../utils/query-tweets';
import Query from '../query/';
import TweetList from '../tweet-list/';
import VisibilitySensor from 'react-visibility-sensor';

class PageSearch extends Component {

  static propTypes = {
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
    if (!this.props.loadedLatest) this.props.fetchTweets('25073877');
    // if (!this.props.loadedCached) this.props.fetchCachedTweets('realdonaldtrump');
  }

  loadMore () {
    if (this.count > 99) this.setState({ limit: this.state.limit + 25 });
  }

  updateQuery (value) {
    this.setState({ limit: 100, query: value, deepQuery: deepQueryObject(value) });
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
      <div className="page page-search">
        <Query
          count={this.count}
          updateQuery={value => this.updateQuery(value)}
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

function mapState ({ app, tweets }) {
  return {
    loadedLatest: app.loadedLatestTweets,
    loadedCached: app.loadedCachedTweets,
    tweets: tweets
  };
}

function mapDispatch (dispatch) {
  return {
    fetchTweets: (userId) => dispatch(fetchTweets(userId)),
    fetchCachedTweets: (username) => dispatch(fetchCachedTweets(username)),
  }
}

export default connect(mapState, mapDispatch)(PageSearch);
