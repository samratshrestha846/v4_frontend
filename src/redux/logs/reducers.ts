import { LogAction } from '../../types/redux/store-type';
import { LogActionTypes } from './constants';

type LogInitialState = {
  logs: any[];
  loading: boolean;
};

const INIT_STATE: LogInitialState = {
  logs: [],
  loading: false,
};

// eslint-disable-next-line default-param-last
const Log = (state: LogInitialState = INIT_STATE, action: LogAction) => {
  switch (action.type) {
    case LogActionTypes.FETCH_LOG_START:
      return { ...state, loading: true };
    case LogActionTypes.FETCH_LOG_SUCCESS:
      return { ...state, logs: action.payload.data, loading: false };
    case LogActionTypes.FETCH_LOG_ERROR:
      return { ...state, error: action.payload.error, loading: false };
    default:
      return { ...state };
  }
};

export default Log;
