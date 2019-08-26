import React from 'react';
import { shallow } from 'enzyme';
import { DefaultPage } from '../../../src/features/query-engine/DefaultPage';

describe('query-engine/DefaultPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      queryEngine: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DefaultPage {...props} />
    );

    expect(
      renderedComponent.find('.query-engine-default-page').length
    ).toBe(1);
  });
});
