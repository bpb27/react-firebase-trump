import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FileSaver from 'file-saver';
import fetchTweets from '../../actions/fetch-tweets';
import fetchCachedTweets from '../../actions/fetch-cached-tweets';
import toCSV from '../../utils/to-csv';
import './style.css';

class PageDownload extends Component {

  static propTypes = {
    tweets: PropTypes.array,
    fetchTweets: PropTypes.func,
    fetchAccounts: PropTypes.func,
  }

  componentDidMount () {
    if (!this.props.loadedLatest) this.props.fetchTweets('25073877');
    if (!this.props.loadedCached) this.props.fetchCachedTweets('realdonaldtrump');
  }

  downloadCSV ({textOnly}) {
    const tweets = toCSV(this.props.tweets);
    const blob = new Blob([tweets], {type : 'text/csv'});
    FileSaver.saveAs(blob, 'trump-twitter-archive.csv');
  }

  downloadJSON ({textOnly, formatted}) {
    let tweets;

    if (textOnly) {
      if (formatted) {
        tweets = JSON.stringify(this.props.tweets.map(tweet => tweet.text), null, 2);
      } else {
        tweets = JSON.stringify(this.props.tweets.map(tweet => tweet.text));
      }
    } else {
      if (formatted) {
        tweets = JSON.stringify(this.props.tweets, null, 2);
      } else {
        tweets = JSON.stringify(this.props.tweets);
      }
    }

    const blob = new Blob([tweets], {type : 'application/json'});
    FileSaver.saveAs(blob, 'trump-twitter-archive.json');
  }

  exampleJSON ({textOnly, formatted}) {
    if (textOnly) {
      if (formatted) {
        return JSON.stringify(this.props.tweets.map(t => t.text).slice(0,2), null, 2);
      } else {
        return JSON.stringify(this.props.tweets.map(t => t.text).slice(0,2));
      }
    } else {
      if (formatted) {
        return JSON.stringify(this.props.tweets.slice(0,2), null, 2);
      } else {
        return JSON.stringify(this.props.tweets.slice(0,2));
      }
    }
  }

   exampleCSV ({textOnly}) {
    if (!this.props.tweets.length) return '';
    if (textOnly) {
      return ['text', this.props.tweets[0].text, this.props.tweets[1].text].join('\n');
    } else {
      return [
        Object.keys(this.props.tweets[0]).join(','),
        Object.values(this.props.tweets[0]).join(','),
        Object.values(this.props.tweets[1]).join(',')
      ].join('\n');
    }
  }

  render () {
    return (
      <div className="page page-download">
        <h1>Downloads</h1>
        <p>Full archive available in JSON or CSV format (15MB)</p>
        <hr/>
        <div className="content">
          <div className="csv">
            <h3>CSV files (.csv)</h3>
            <p>Best for Excel or Google Sheets</p>
            <div className="download-option">
              <button onClick={() => this.downloadCSV({textOnly: true})}>Download Text Only</button>
              <div><pre>{this.exampleCSV({textOnly: true})}</pre></div>
            </div>
            <div className="download-option">
              <button onClick={() => this.downloadCSV({textOnly: true})}>Download Full</button>
              <div><pre>{this.exampleCSV({textOnly: false})}</pre></div>
            </div>
          </div>
          <hr/>
          <div className="json">
            <h3>JSON files (.json)</h3>
            <p>Best for programming purposes (JS, Python, etc.)</p>
            <div className="download-option">
              <button onClick={() => this.downloadJSON({textOnly: true, formatted: false})}>Download Text Only (unformatted)</button>
              <div><pre>{this.exampleJSON({textOnly: true, formatted: false})}</pre></div>
            </div>
            <div className="download-option">
              <button onClick={() => this.downloadJSON({textOnly: true, formatted: true})}>Download Text Only (formatted)</button>
              <div><pre>{this.exampleJSON({textOnly: true, formatted: true})}</pre></div>
            </div>
            <div className="download-option">
              <button onClick={() => this.downloadJSON({textOnly: false, formatted: false})}>Download Full (unformatted)</button>
              <div><pre>{this.exampleJSON({textOnly: false, formatted: false})}</pre></div>
            </div>
            <div className="download-option">
              <button onClick={() => this.downloadJSON({textOnly: false, formatted: true})}>Download Full (formatted)</button>
              <div><pre>{this.exampleJSON({textOnly: false, formatted: true})}</pre></div>
            </div>
          </div>
        </div>
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

export default connect(mapState, mapDispatch)(PageDownload);
