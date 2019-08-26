import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class DefaultPage extends Component {
  static propTypes = {
    queryEngine: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentWillMount() {
    this.props.actions.pollSensorsData()
  }

  setYearly = () => {
    this.props.actions.setTimeRange('year')
    this.props.actions.pollSensorsData()
  }

  render() {
    return (
      <div className="query-engine-default-page">
        <form>
          <input type="button" value="HOLA" onClick={this.setYearly}/>
        </form>
        Page Content: query-engine/DefaultPage For testing support
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    queryEngine: state.queryEngine,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DefaultPage);
