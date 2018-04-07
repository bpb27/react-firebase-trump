import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import Lists from '../lists';
import embeddedTweets from '../../utils/twitter-embed';
import siteVideo from '../../assets/site.mp4';
import './style.scss';

class PageHome extends Component {

  componentDidMount () {
    embeddedTweets();
  }

  state = {
    video: true // meaningless flag to toggle re-render
  }

  get video () {
    if (window.localStorage.getItem('video') === 'false') return;

    return (
      <div className="video">
        <span onClick={() => this.hideVideo()}>
          <FontAwesome name='window-close' size='2x'/>
        </span>
        <p><Link to="/archive">Search through all 30,000+ tweets</Link></p>
        <video autoPlay loop>
          <source src={siteVideo} type="video/mp4" />
        </video>
      </div>
    );
  }

  hideVideo () {
    window.localStorage.setItem('video', false);
    this.setState({ video: true });
  }

  shouldShowVideo () {
    return window.localStorage.getItem('video') !== false;
  }

  render () {
    return (
      <div className="page page-home">
        <div className="header">
          <h1>Trump Twitter Archive</h1>
        </div>
        <div className="content">
          <div className="left">
            <div className="timeline">
              <a className="twitter-timeline" href="https://twitter.com/realDonaldTrump?ref_src=twsrc%5Etfw">Tweets by realDonaldTrump</a>
            </div>
          </div>
          <div className="right">
            { this.video }
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
