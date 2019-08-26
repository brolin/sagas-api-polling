import axios from 'axios';
import { delay } from 'redux-saga';
import { call, put, take, race, fork, takeLatest, takeEvery, select } from 'redux-saga/effects';
import {
  QUERY_ENGINE_POLL_SENSORS_DATA_BEGIN,
  QUERY_ENGINE_POLL_SENSORS_DATA_SUCCESS,
  QUERY_ENGINE_POLL_SENSORS_DATA_FAILURE,
  QUERY_ENGINE_POLL_SENSORS_DATA_DISMISS_ERROR,
} from './constants';

import {QUERY_TEMPLATE_PM, QUERY_TEMPLATE_LOCATION, TIME_RANGE} from '../utils/queryTemplate'
import {queryRefreshTime} from '../utils/queryRefreshTime'
import {sensors} from '../utils/sensors'

export function pollSensorsData() {
  // If need to pass args to saga, pass it with the begin action.
  return {
    type: QUERY_ENGINE_POLL_SENSORS_DATA_BEGIN,
  };
}

export function dismissPollSensorsDataError() {
  return {
    type: QUERY_ENGINE_POLL_SENSORS_DATA_DISMISS_ERROR,
  };
}

const fetchSensorsData = (query) => () => axios({
  "async": true,
  "crossDomain": true,
  "url": `http://aqa.unloquer.org:8086/query?db=aqa&q=${query}`,
  "method": "GET",
  "headers": {
    'Content-type': 'application/application/x-www-form-urlencoded'
  }
})

//https://stackoverflow.com/questions/35411423/how-to-dispatch-a-redux-action-with-a-timeout
//http://notjoshmiller.com/ajax-polling-part-2-sagas/

// worker Saga: will be fired on QUERY_ENGINE_POLL_SENSORS_DATA_BEGIN actions
export function* doPollSensorsData() {
  // If necessary, use argument to receive the begin action with parameters.
  const time_range = yield select((state) => state.queryEngine.time_range)
  let res;
  try {
    // Do Ajax call or other async request here. delay(20) is just a placeholder.
    res = yield call(fetchSensorsData(QUERY_TEMPLATE_PM(sensors.map(r => r.name),TIME_RANGE[time_range])));
  } catch (err) {
    yield put({
      type: QUERY_ENGINE_POLL_SENSORS_DATA_FAILURE,
      data: { error: err },
    });
    return;
  }
  // Dispatch success action out of try/catch so that render errors are not catched.
  yield put({
    type: QUERY_ENGINE_POLL_SENSORS_DATA_SUCCESS,
    data: res,
  });
}

/*
   Alternatively you may use takeEvery.

   takeLatest does not allow concurrent requests. If an action gets
   dispatched while another is already pending, that pending one is cancelled
   and only the latest one will be run.
 */

export function* watchPollSensorsData() {
  function* pollSensors() {
    yield takeLatest(QUERY_ENGINE_POLL_SENSORS_DATA_BEGIN, doPollSensorsData)
  }

  function* pollSensorsScheduler() {
    while(true){
      yield take(QUERY_ENGINE_POLL_SENSORS_DATA_SUCCESS)
      yield call(delay, queryRefreshTime)
      yield put({
        type: QUERY_ENGINE_POLL_SENSORS_DATA_BEGIN,
      })
    }
  }

  yield [
    fork(pollSensors),
    call(pollSensorsScheduler)
  ]
}

// Redux reducer
export function reducer(state, action) {
  switch (action.type) {
    case QUERY_ENGINE_POLL_SENSORS_DATA_BEGIN:
      return {
        ...state,
        pollSensorsDataPending: true,
        pollSensorsDataError: null,
      };

    case QUERY_ENGINE_POLL_SENSORS_DATA_SUCCESS:
      return {
        ...state,
        pollSensorsDataPending: false,
        pollSensorsDataError: null,
      };

    case QUERY_ENGINE_POLL_SENSORS_DATA_FAILURE:
      return {
        ...state,
        pollSensorsDataPending: false,
        pollSensorsDataError: action.data.error,
      };

    case QUERY_ENGINE_POLL_SENSORS_DATA_DISMISS_ERROR:
      return {
        ...state,
        pollSensorsDataError: null,
      };

    default:
      return state;
  }
}
