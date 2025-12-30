import { LabelValue } from '@uhub/types/common';
import { DROPDOWN_LOCATION } from '../constants/apiUrls';
import useDropDown from './useDropDown';

type Params = {
  is_production_facility?: number;
};
export default function useDitConnectLocationDropDown(params?: Params) {
  const {
    data: locationOptions,
    isFetching: isFetchingLocationOptions,
    isError: isErrorLocationOptions,
  } = useDropDown<LabelValue[]>(DROPDOWN_LOCATION, null, params);
  return {
    locationOptions,
    isFetchingLocationOptions,
    isErrorLocationOptions,
  };
}
