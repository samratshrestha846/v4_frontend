// @flow
import { LogActionTypes } from './constants';

export const logFetchSuccess = (data: any) => ({
  type: LogActionTypes.FETCH_LOG_SUCCESS,
  payload: { data },
});

export const logFetchError = (error: any) => ({
  type: LogActionTypes.FETCH_LOG_ERROR,
  payload: { error },
});

export const logFetchStart = (params: Object) => ({
  type: LogActionTypes.FETCH_LOG_START,
  payload: { params },
});
