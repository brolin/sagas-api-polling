import React, { Component } from 'react';
import {render} from 'react-dom';
import {StaticMap} from 'react-map-gl';
import DeckGL, {ScatterplotLayer, LineLayer}  from 'deck.gl';
// deck.gl react components
//import DeckGL from '@deck.gl/react';

import {sensors} from '../query-engine/utils/sensors';
import Station from './Station';

// Viewport settings
const INITIAL_VIEW_STATE = {
  longitude: -75.5669,
  latitude: 6.28,
  zoom: 11,
  pitch: 0,
  bearing: -20
};

// Set your mapbox access token here
const MAPBOX_ACCESS_TOKEN = process.env.REACT_APP_MapboxAccessToken; // eslint-disable-line

export default class MapStations extends Component {
  render() {
    return (
      <DeckGL initialViewState={INITIAL_VIEW_STATE} controller={true} width="100%" height="100%">
        <StaticMap mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN} />
        <LineLayer
          data={[{sourcePosition: [-75.41669, 6.7883], targetPosition: [-75.41669, 6.781]}]}
          strokeWidth={5}
        />
        <ScatterplotLayer
          data={[{position: [-122.41669, 37.79]}]}
          radiusScale={100}
          getColor={x => [0, 0, 255]}
        />
      </DeckGL>
    );
  }
}
