// @flow
import { all } from 'redux-saga/effects';

import authSaga from './auth/saga';
import layoutSaga from './layout/saga';
import logSaga from './logs/saga';
import siteSaga from './site/saga';
import tankSaga from './tank/saga';
import propertySaga from './property/saga';

export default function* rootSaga(): any {
  yield all([
    authSaga(),
    layoutSaga(),
    logSaga(),
    siteSaga(),
    tankSaga(),
    propertySaga(),
  ]);
}
