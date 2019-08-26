import React from 'react';
import { shallow } from 'enzyme';
import { Station } from '../../../src/features/station';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Station />);
  expect(renderedComponent.find('.station-station').length).toBe(1);
});
