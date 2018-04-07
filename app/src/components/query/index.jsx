import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TOGGLE_SEARCH_OPTIONS } from '../../constants';
import './style.scss';

class Query extends Component {

  static propTypes = {
    count: PropTypes.number.isRequired,
    toggleSearchOptions: PropTypes.func.isRequired,
    updateQuery: PropTypes.func.isRequired,
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
        <label onClick={() => this.props.toggleSearchOptions()}>Options</label>
      </div>
    );
  }

}

function mapDispatch (dispatch) {
  return {
    toggleSearchOptions: () => dispatch({ type: TOGGLE_SEARCH_OPTIONS }),
  }
}

export default connect(null, mapDispatch)(Query);
