import SiteActionTypes from './constants';

export const siteFetchSuccess = (data: any) => ({
  type: SiteActionTypes.FETCH_SITES_SUCCESS,
  payload: { data },
});

export const siteFetchError = (error: any) => ({
  type: SiteActionTypes.FETCH_SITES_ERROR,
  payload: { error },
});

export const siteFetchStart = (params: any) => ({
  type: SiteActionTypes.FETCH_SITES_START,
  payload: { params },
});

export const siteDetailFetchSuccess = (data: any) => ({
  type: SiteActionTypes.FETCH_SITE_DETAIL_SUCCESS,
  payload: { data },
});

export const siteDetailFetchError = (error: any) => ({
  type: SiteActionTypes.FETCH_SITE_DETAIL_ERROR,
  payload: { error },
});

export const siteDetailFetchStart = (id: number, params: any) => ({
  type: SiteActionTypes.FETCH_SITE_DETAIL_START,
  payload: { id, params },
});
