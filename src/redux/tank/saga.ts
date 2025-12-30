import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import { v1list } from '../../helpers/api/site';
import { tankFetchSuccess, tankFetchError } from './actions';
import { TankActionTypes } from './constants';
import { TankAction } from '../../types/redux/store-type';

function* fetchTankSensorData(action: TankAction): any {
  try {
    const response = yield call(v1list, action.payload.params);
    const tanks: any[] = response.data.data;
    yield put(tankFetchSuccess(tanks));
  } catch (error) {
    yield put(tankFetchError(error));
  }
}

export function* watchFetchTankSensorData() {
  yield takeEvery(TankActionTypes.FETCH_TANKS_START, fetchTankSensorData);
}

function* tankSaga() {
  yield all([fork(watchFetchTankSensorData)]);
}
export default tankSaga;
