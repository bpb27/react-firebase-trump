import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import { CHANGE_HOUR, CHANGE_SORT, CHANGE_SOURCE, SORT_BY_PROPERTIES, TOGGLE_SORT_ORDER } from '../../constants';
import hours from '../../utils/hours';
import './style.scss';

class SearchOptions extends Component {

  static propTypes = {
    ascending: PropTypes.bool.isRequired,
    show: PropTypes.bool.isRequired,
    sortBy: PropTypes.string.isRequired,
    sources: PropTypes.array,
  }

  get buttonSort () {
    return this.props.ascending ? <FontAwesome name='arrow-circle-up' size='3x'/> : <FontAwesome name='arrow-circle-down' size='3x'/>;
  }

  get dropdownHours () {
    return <select onChange={(ev) => this.props.onChange(ev.target.value, 'hour')}>{ this.optionsHours }</select>;
  }

  get dropdownSort () {
    return <select onChange={(ev) => this.props.onChange(ev.target.value, 'sort')}>{ this.optionsSort }</select>;
  }

  get dropdownSource () {
    return <select onChange={(ev) => this.props.onChange(ev.target.value, 'source')}>{ this.optionsSource }</select>;
  }

  get optionsHours () {
    const placeholder = <option key="placeholder" value="">Any time</option>;
    const options = hours.map((hour) => <option key={hour} value={hour}>{ hour }</option>);
    return [placeholder, ...options];
  }

  get optionsSort () {
    return SORT_BY_PROPERTIES.map((prop) => <option key={prop} value={prop}>{ prop.replace('_', ' ') }</option>);
  }

  get optionsSource () {
    const placeholder = <option key="placeholder" value="">Any device</option>;
    const options = this.props.sources.map((source) => <option key={source} value={source}>{ source }</option>);
    return [placeholder, ...options];
  }

  render () {
    if (!this.props.show) return null;
    return (
      <div className="search-options">
        <div className="sort">
          <span onClick={() => this.props.toggleSortOrder()}>{ this.buttonSort }</span>
        </div>
        <div className="dates">
          <input type="date"/>
          <input type="date"/>
        </div>
        <div className="dropdowns">
          { this.dropdownHours }
          { this.dropdownSource }
          { this.dropdownSort }
        </div>
      </div>
    );
  }

}

function mapState ({ searchOptions }) {
  return {
    ascending: searchOptions.ascending,
    show: searchOptions.show,
    sortBy: searchOptions.sortBy,
    sources: searchOptions.sources || [],
  }
}

function mapDispatch (dispatch) {
  return {
    onChange: (data, name) => {
      if (name === 'hour') dispatch({ type: CHANGE_HOUR, data});
      if (name === 'sort') dispatch({ type: CHANGE_SORT, data});
      if (name === 'source') dispatch({ type: CHANGE_SOURCE, data});
    },
    toggleSortOrder: () => dispatch({ type: TOGGLE_SORT_ORDER }),
  }
}

export default connect(mapState, mapDispatch)(SearchOptions);
