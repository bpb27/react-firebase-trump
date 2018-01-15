import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

class Navbar extends Component {

  //static propTypes = {}

  render () {
    return (
      <nav>
        <div>Trump Twitter Archive</div>
        <div>Download</div>
        <div>FAQ</div>
      </nav>
    );
  }

}

export default Navbar;
