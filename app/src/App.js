import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Navbar from './components/navbar/';
import PageDownload from './components/page-download/';
import PageFaq from './components/page-faq/';
import PageHome from './components/page-home/';
import PageSearch from './components/page-search/';
import './app.css';

class App extends Component {
  render () {
    return (
      <div className="app">
        <Navbar/>
        <Switch>
          <Route path="/archive" component={PageSearch}/>
          <Route path="/download" component={PageDownload}/>
          <Route path="/faq" component={PageFaq}/>
          <Route component={PageHome}/>
        </Switch>
      </div>
    );
  }
}

export default App;
