import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

class Query extends Component {

  static propTypes = {
    count: PropTypes.number.isRequired,
    updateQuery: PropTypes.func.isRequired
  }

  state = {
    query: ''
  }

  handleChange (value) {
    this.setState({query: value});
    setTimeout(() => {
      if (this.state.query === value) this.props.updateQuery(value)
    }, 500);
  }

  render () {
    return (
      <div className="query">
        <label>{this.props.count}</label>
        <input
          type="text"
          placeholder="Search..."
          autoFocus
          value={this.state.query}
          onChange={(e) => this.handleChange(e.target.value)}
        />
      </div>
    );
  }

}

export default Query;
