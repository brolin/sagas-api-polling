import { delay } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import nock from 'nock';
import { expect } from 'chai';

import {
  QUERY_ENGINE_POLL_SENSORS_DATA_BEGIN,
  QUERY_ENGINE_POLL_SENSORS_DATA_SUCCESS,
  QUERY_ENGINE_POLL_SENSORS_DATA_FAILURE,
  QUERY_ENGINE_POLL_SENSORS_DATA_DISMISS_ERROR,
} from 'src/features/query-engine/redux/constants';

import {
  pollSensorsData,
  dismissPollSensorsDataError,
  doPollSensorsData,
  reducer,
} from 'src/features/query-engine/redux/pollSensorsData';

describe('query-engine/redux/pollSensorsData', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  // redux action tests
  it('correct action by pollSensorsData', () => {
    expect(pollSensorsData()).to.have.property('type', QUERY_ENGINE_POLL_SENSORS_DATA_BEGIN);
  });

  it('returns correct action by dismissPollSensorsDataError', () => {
    expect(dismissPollSensorsDataError()).to.have.property('type', QUERY_ENGINE_POLL_SENSORS_DATA_DISMISS_ERROR);
  });

  // saga tests
  const generator = doPollSensorsData();

  it('calls delay when receives a begin action', () => {
    // Delay is just a sample, this should be replaced by real sync request.
    expect(generator.next().value).to.deep.equal(call(delay, 20));
  });

  it('dispatches QUERY_ENGINE_POLL_SENSORS_DATA_SUCCESS action when succeeded', () => {
    expect(generator.next('something').value).to.deep.equal(put({
      type: QUERY_ENGINE_POLL_SENSORS_DATA_SUCCESS,
      data: 'something',
    }));
  });

  it('dispatches QUERY_ENGINE_POLL_SENSORS_DATA_FAILURE action when failed', () => {
    const generatorForError = doPollSensorsData();
    generatorForError.next(); // call delay(20)
    const err = new Error('errored');
    expect(generatorForError.throw(err).value).to.deep.equal(put({
      type: QUERY_ENGINE_POLL_SENSORS_DATA_FAILURE,
      data: { error: err },
    }));
  });

  it('returns done when finished', () => {
    expect(generator.next()).to.deep.equal({ done: true, value: undefined });
  });

  // reducer tests
  it('handles action type QUERY_ENGINE_POLL_SENSORS_DATA_BEGIN correctly', () => {
    const prevState = { pollSensorsDataPending: false };
    const state = reducer(
      prevState,
      { type: QUERY_ENGINE_POLL_SENSORS_DATA_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.pollSensorsDataPending).to.be.true;
  });

  it('handles action type QUERY_ENGINE_POLL_SENSORS_DATA_SUCCESS correctly', () => {
    const prevState = { pollSensorsDataPending: true };
    const state = reducer(
      prevState,
      { type: QUERY_ENGINE_POLL_SENSORS_DATA_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.pollSensorsDataPending).to.be.false;
  });

  it('handles action type QUERY_ENGINE_POLL_SENSORS_DATA_FAILURE correctly', () => {
    const prevState = { pollSensorsDataPending: true };
    const state = reducer(
      prevState,
      { type: QUERY_ENGINE_POLL_SENSORS_DATA_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.pollSensorsDataPending).to.be.false;
    expect(state.pollSensorsDataError).to.exist;
  });

  it('handles action type QUERY_ENGINE_POLL_SENSORS_DATA_DISMISS_ERROR correctly', () => {
    const prevState = { pollSensorsDataError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: QUERY_ENGINE_POLL_SENSORS_DATA_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.pollSensorsDataError).to.be.null;
  });
});