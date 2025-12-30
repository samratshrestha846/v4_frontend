import { all, fork, put, takeEvery, call } from 'redux-saga/effects';

import { listProperties } from '../../helpers/api/property';

import { propertyFetchError, propertyFetchSuccess } from './actions';
import { PropertyActionTypes } from './constants';
import { PropertyAction } from '../../types/redux/store-type';
import { Property } from '../../types/property/propertyList';

function* fetchProperties(action: PropertyAction): any {
  try {
    const response = yield call(listProperties, action.payload.params);
    const properties: Property[] = response.data.data;
    yield put(propertyFetchSuccess(properties));
  } catch (error) {
    yield put(propertyFetchError(error));
  }
}

export function* watchFetchProperties() {
  yield takeEvery(PropertyActionTypes.FETCH_PROPERTY_START, fetchProperties);
}

function* propertySaga() {
  yield all([fork(watchFetchProperties)]);
}

export default propertySaga;
