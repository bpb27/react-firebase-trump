import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Lists from '../lists';
import embeddedTweets from '../../utils/twitter-embed';
import './style.css';

class PageHome extends Component {

  componentDidMount () {
    embeddedTweets();
  }

  render () {
    return (
      <div className="page page-home">
        <div className="header">
          <h1>Trump Twitter Archive</h1>
          <p><Link to="/archive">Search through all 30,000+ tweets</Link></p>
        </div>
        <div className="content">
          <div className="left">
            <div className="timeline">
              <a className="twitter-timeline" href="https://twitter.com/realDonaldTrump?ref_src=twsrc%5Etfw">Tweets by realDonaldTrump</a>
            </div>
          </div>
          <div className="right">
            <Lists.PersonalSuperlatives/>
            <Lists.KeyIngredient/>
            <Lists.GlobalWarming/>
          </div>
        </div>
      </div>
    );
  }
}

export default PageHome;
