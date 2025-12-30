import { TankActionTypes } from './constants';

export const tankFetchStart = (params: Object) => ({
  type: TankActionTypes.FETCH_TANKS_START,
  payload: { params },
});

export const tankFetchSuccess = (data: any[]) => ({
  type: TankActionTypes.FETCH_TANKS_SUCCESS,
  payload: { data },
});

export const tankFetchError = (error: any) => ({
  type: TankActionTypes.FETCH_TANKS_ERROR,
  payload: { error },
});
