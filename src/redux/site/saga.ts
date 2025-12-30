import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { v1list } from '../../helpers/api/site';
import udose from '../../helpers/api/udose';

import {
  siteDetailFetchError,
  siteDetailFetchSuccess,
  siteFetchError,
  siteFetchSuccess,
} from './actions';

import SiteActionTypes from './constants';
import { Udose } from '../../types/udose/udoseList';

function* fetchSites({ payload }: { payload: any }) {
  try {
    const response: AxiosResponse<any> = yield call(v1list, payload.params);
    const sites = response.data.data;
    yield put(siteFetchSuccess(sites));
  } catch (error) {
    yield put(siteFetchError(error));
  }
}

function* fetchSiteDetail({ payload }: { payload: any }) {
  try {
    const response: Promise<Udose> = yield call(
      udose.getUdoseSiteById,
      payload.id
    );
    const sites = response;
    yield put(siteDetailFetchSuccess(sites));
  } catch (error) {
    yield put(siteDetailFetchError(error));
  }
}

export function* watchFetchSites() {
  yield takeEvery<any>(SiteActionTypes.FETCH_SITES_START, fetchSites);
}

export function* watchFetchSiteDetail() {
  yield takeEvery<any>(
    SiteActionTypes.FETCH_SITE_DETAIL_START,
    fetchSiteDetail
  );
}

function* siteSaga() {
  yield all([fork(watchFetchSites), fork(watchFetchSiteDetail)]);
}

export default siteSaga;
