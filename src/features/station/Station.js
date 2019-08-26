import React, { Component } from 'react';
import ReactMapGL, {Marker} from 'react-map-gl';

import {sensors} from '../query-engine/utils/sensors';

export default class Station extends Component {
  static propTypes = {

  };

  render() {
    const {latitude, longitude, name} = this.props;

    return (
        <Marker latitude={latitude} longitude={longitude} offsetLeft={-20} offsetTop={-10}>
          <div className="station-station">{name}</div>
        </Marker>
    );
  }
}
