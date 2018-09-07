import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fetchTweets from '../../actions/fetch-tweets';
import fetchCachedTweets from '../../actions/fetch-cached-tweets';
import { deepQueryObject } from '../../utils/deep-query';
import queryTweets from '../../utils/query-tweets';
import Query from '../query/';
import SearchOptions from '../search-options/';
import TweetList from '../tweet-list/';
import VisibilitySensor from 'react-visibility-sensor';
import './style.scss';

class PageSearch extends Component {

  static propTypes = {
    ascending: PropTypes.bool.isRequired,
    fetchAccounts: PropTypes.func.isRequired,
    fetchTweets: PropTypes.func.isRequired,
    hour: PropTypes.string.isRequired,
    sortBy: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
    tweets: PropTypes.array.isRequired,
  }

  state = {
    limit: 100,
    query: '',
    deepQuery: {},
  }

  componentDidMount () {
    if (!this.props.loadedLatest) this.props.fetchTweets('25073877');
    if (!this.props.loadedCached) this.props.fetchCachedTweets('realdonaldtrump');
  }

  loadMore () {
    if (this.count > 99) this.setState({ limit: this.state.limit + 25 });
  }

  updateQuery (value) {
    this.setState({ limit: 100, query: value, deepQuery: deepQueryObject(value) });
  }

  get queryList () {
    const {deepQuery, query} = this.state;
    const hasDeepQuery = !!Object.keys(deepQuery).length;

    if (hasDeepQuery) {
      return [...deepQuery.and, ...deepQuery.or];
    } else if (query) {
      return [query];
    } else {
      return [];
    }
  }

  get tweets () {
    const { hour, source } = this.props;
    const sorter = (a, b) => a[this.props.sortBy] - b[this.props.sortBy];
    const filter = (tweet) => {
      if (source && tweet.source !== source) return false;
      return true;
    }

    const tweets = queryTweets(this.props.tweets, this.state.query, this.state.deepQuery).filter(filter);
    if (this.props.sortBy !== 'created_at') tweets.sort(sorter);
    return this.props.ascending ? tweets.reverse() : tweets;
  }

  render () {
    const tweets = this.tweets;

    return (
      <div className="page page-search">
        <Query
          count={tweets.length}
          updateQuery={value => this.updateQuery(value)}
        />
        <SearchOptions/>
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

function mapState ({ app, searchOptions, tweets }) {
  return {
    ascending: searchOptions.ascending,
    hour: searchOptions.hour,
    loadedLatest: app.loadedLatestTweets,
    loadedCached: app.loadedCachedTweets,
    sortBy: searchOptions.sortBy,
    source: searchOptions.source,
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
