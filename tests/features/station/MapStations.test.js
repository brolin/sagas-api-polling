import React from 'react';
import { shallow } from 'enzyme';
import { MapStations } from '../../../src/features/station';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<MapStations />);
  expect(renderedComponent.find('.station-map-stations').length).toBe(1);
});
