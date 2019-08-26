import {
  QUERY_ENGINE_SET_TIME_RANGE,
} from '../../../../src/features/query-engine/redux/constants';

import {
  setTimeRange,
  reducer,
} from '../../../../src/features/query-engine/redux/setTimeRange';

describe('query-engine/redux/setTimeRange', () => {
  it('returns correct action by setTimeRange', () => {
    expect(setTimeRange()).toHaveProperty('type', QUERY_ENGINE_SET_TIME_RANGE);
  });

  it('handles action type QUERY_ENGINE_SET_TIME_RANGE correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: QUERY_ENGINE_SET_TIME_RANGE }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
