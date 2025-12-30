import { Property } from '../../types/property/propertyList';
import { PropertyActionTypes } from './constants';

export const propertyFetchSuccess = (data: Property[]) => ({
  type: PropertyActionTypes.FETCH_PROPERTY_SUCCESS,
  payload: { data },
});

export const propertyFetchError = (error: any) => ({
  type: PropertyActionTypes.FETCH_PROPERTY_ERROR,
  payload: { error },
});

export const propertyFetchStart = (params: Object) => ({
  type: PropertyActionTypes.FETCH_PROPERTY_START,
  payload: { params },
});
