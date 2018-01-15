import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import renderHTML from 'react-render-html';
import FontAwesome from 'react-fontawesome';
import './style.css';

class Tweet extends Component {

  static propTypes = {
    data: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    query: PropTypes.string.isRequired,
  }

  transformText (text) {
    if (!this.props.query) {
      return text;
    } else {
      return renderHTML(text.replace(this.props.query, `<span className="highlight">${this.props.query}</span>`));
    }
  }

  formatCount (num) {
    return num;
    // return num > 999 ? (num/1000).toFixed(1) + 'k' : num
  }

  render () {
    const { created_at, favorite_count, id_str, retweet_count, source, text } = this.props.data;
    return (
      <div className="tweet" key={id_str}>
        <div>
          {this.props.index + 1}.
        </div>
        <div>
          <p>{moment(created_at).format('MMM Do YYYY, h:mm:ss a')}</p>
          <br/>
          <p>{source}</p>
          <br/>
          <p>
            <FontAwesome name='retweet'/> {this.formatCount(retweet_count)} <FontAwesome name='heart-o'/> {this.formatCount(favorite_count)} <FontAwesome name='twitter'/>
          </p>
        </div>
        <div>
          <p>{this.transformText(text)}</p>
        </div>
      </div>
    );
  }

}

export default Tweet;
