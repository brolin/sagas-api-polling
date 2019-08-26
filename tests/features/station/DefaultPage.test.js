import React from 'react';
import { shallow } from 'enzyme';
import { DefaultPage } from '../../../src/features/station/DefaultPage';

describe('station/DefaultPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      station: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DefaultPage {...props} />
    );

    expect(
      renderedComponent.find('.station-default-page').length
    ).toBe(1);
  });
});
