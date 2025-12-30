import SiteActionTypes from './constants';

type InitStateProps = {
  sites: any[];
  siteDetail: any;
  loading: boolean;
};

const INIT_STATE: InitStateProps = {
  sites: [],
  siteDetail: {},
  loading: false,
};

// eslint-disable-next-line default-param-last
const Site = (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case SiteActionTypes.FETCH_SITES_START:
      return { ...state, loading: true };
    case SiteActionTypes.FETCH_SITES_SUCCESS:
      return { ...state, sites: action.payload.data, loading: false };
    case SiteActionTypes.FETCH_SITES_ERROR:
      return { ...state, error: action.payload.error, loading: false };
    case SiteActionTypes.FETCH_SITE_DETAIL_START:
      return { ...state, loading: true };
    case SiteActionTypes.FETCH_SITE_DETAIL_SUCCESS:
      return { ...state, siteDetail: action.payload.data, loading: false };
    case SiteActionTypes.FETCH_SITE_DETAIL_ERROR:
      return { ...state, error: action.payload.error, loading: false };
    default:
      return { ...state };
  }
};

export default Site;
