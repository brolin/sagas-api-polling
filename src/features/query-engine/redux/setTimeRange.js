// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  QUERY_ENGINE_SET_TIME_RANGE,
} from './constants';

export function setTimeRange(time_range) {
  return {
      type: QUERY_ENGINE_SET_TIME_RANGE,
      payload: time_range
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case QUERY_ENGINE_SET_TIME_RANGE:
      return {
        ...state,
        ...{time_range: action.payload}
      };

    default:
      return state;
  }
}
