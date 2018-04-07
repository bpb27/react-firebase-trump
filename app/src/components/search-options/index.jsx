import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import { TOGGLE_SORT_ORDER } from '../../constants';
import hours from '../../utils/hours';
import './style.scss';

class SearchOptions extends Component {

  static propTypes = {
    ascending: PropTypes.bool.isRequired,
    show: PropTypes.bool.isRequired,
    sources: PropTypes.array,
  }

  get sortButton () {
    return this.props.ascending ? <FontAwesome name='arrow-circle-up' size='3x'/> : <FontAwesome name='arrow-circle-down' size='3x'/>;
  }

  get hoursDropdown () {
    const options = hours.map((hour) => <option key={hour}>{ hour }</option>);
    return <select>{ options }</select>;
  }

  get sourcesDropdown () {
    const options = this.props.sources.map((source) => <option key={source}>{ source }</option>);
    return <select>{ options }</select>;
  }

  render () {
    if (!this.props.show) return null;
    return (
      <div className="search-options">
        <div className="sort">
          <span onClick={() => this.props.toggleSortOrder()}>{ this.sortButton }</span>
        </div>
        <div className="dates">
          <input type="date"/>
          <input type="date"/>
        </div>
        <div className="dropdowns">
          { this.hoursDropdown }
          { this.sourcesDropdown }
        </div>
      </div>
    );
  }

}

function mapState ({ searchOptions }) {
  return {
    show: searchOptions.show,
    sources: searchOptions.sources || [],
    ascending: searchOptions.ascending,
  }
}

function mapDispatch (dispatch) {
  return {
    toggleSortOrder: () => dispatch({ type: TOGGLE_SORT_ORDER }),
  }
}

export default connect(mapState, mapDispatch)(SearchOptions);
