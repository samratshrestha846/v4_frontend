/* eslint-disable default-param-last */
import { TankAction } from '../../types/redux/store-type';
import { TankActionTypes } from './constants';

type TankInitialState = {
  tanks: any[];
  loading: boolean;
};

const INIT_STATE: TankInitialState = {
  tanks: [],
  loading: false,
};

const Tank = (state: TankInitialState = INIT_STATE, action: TankAction) => {
  switch (action.type) {
    case TankActionTypes.FETCH_TANKS_START:
      return { ...state, loading: true };
    case TankActionTypes.FETCH_TANKS_SUCCESS:
      return { ...state, tanks: action.payload.data, loading: false };
    case TankActionTypes.FETCH_TANKS_ERROR:
      return { ...state, error: action.payload.error, loading: false };
    default:
      return { ...state };
  }
};
export default Tank;
