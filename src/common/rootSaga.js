import * as commonSagas from '../features/common/redux/sagas';
import * as examplesSagas from '../features/examples/redux/sagas';
import * as homeSagas from '../features/home/redux/sagas';
import * as queryEngineSagas from '../features/query-engine/redux/sagas';
import * as stationSagas from '../features/station/redux/sagas';
// This file is auto maintained by rekit-plugin-redux-saga,
// you usually don't need to manually edit it.

// NOTE: DO NOT chanage featureSagas declearation pattern, it's used by rekit-plugin-redux-saga.
const featureSagas = [
  commonSagas,
  examplesSagas,
  homeSagas,
  queryEngineSagas,
  stationSagas,
];

const sagas = featureSagas.reduce((prev, curr) => [
  ...prev,
  ...Object.keys(curr).map(k => curr[k]),
], [])
// a saga should be function, below filter avoids error if redux/sagas.js is empty;
.filter(s => typeof s === 'function');

function* rootSaga() {
  yield [sagas.map(saga => saga())];
}

export default rootSaga;
