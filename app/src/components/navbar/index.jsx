import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './style.css';

class Navbar extends Component {

  render () {
    return (
      <nav>
        <NavLink exact to="/">Home</NavLink>
        <NavLink to="/archive">Search</NavLink>
        <NavLink to="/download">Download</NavLink>
        <NavLink to="/faq">FAQ</NavLink>
      </nav>
    );
  }

}

export default Navbar;
