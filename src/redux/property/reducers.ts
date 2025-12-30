/* eslint-disable default-param-last */
import { Property as TProperty } from '../../types/property/propertyList';
import { PropertyAction } from '../../types/redux/store-type';
import { PropertyActionTypes } from './constants';

type PropertyInitialState = {
  properties: TProperty[];
  loading: boolean;
};

const INIT_STATE: PropertyInitialState = {
  properties: [],
  loading: false,
};

const Property = (
  state: PropertyInitialState = INIT_STATE,
  action: PropertyAction
) => {
  switch (action.type) {
    case PropertyActionTypes.FETCH_PROPERTY_START:
      return { ...state, loading: true };
    case PropertyActionTypes.FETCH_PROPERTY_SUCCESS:
      return { ...state, properties: action.payload.data, loading: false };
    case PropertyActionTypes.FETCH_PROPERTY_ERROR:
      return { ...state, error: action.payload.error, loading: false };
    default:
      return { ...state };
  }
};

export default Property;
