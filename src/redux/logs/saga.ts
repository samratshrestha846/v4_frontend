import { all, fork, put, takeEvery, call } from 'redux-saga/effects';

import { fetchLogs } from '../../helpers';

import { logFetchError, logFetchSuccess } from './action';
import { LogActionTypes } from './constants';
import { LogAction } from '../../types/redux/store-type';
import { Log } from '../../types/log/logList';

function* fetchLogsFromServer(action: LogAction): any {
  try {
    const response = yield call(fetchLogs, action.payload.params);
    const logs: Log[] = response.data.body;
    yield put(logFetchSuccess(logs));
  } catch (error) {
    yield put(logFetchError(error));
  }
}

export function* watchFetchLogs() {
  yield takeEvery(LogActionTypes.FETCH_LOG_START, fetchLogsFromServer);
}

function* logSaga() {
  yield all([fork(watchFetchLogs)]);
}

export default logSaga;
