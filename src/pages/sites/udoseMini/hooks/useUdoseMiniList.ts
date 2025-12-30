import { useQuery } from '@tanstack/react-query';
import { v1list } from '../../../../helpers/api/site';
import { DEVICE_CONFIGURATION_TYPE_UDOSE_MINI } from '../../../../constants/constants';

const useUdoseMiniList = () => {
  const prepareQueryParams = () => {
    const params = { device_type: DEVICE_CONFIGURATION_TYPE_UDOSE_MINI };
    return params;
  };

  const fetchUdoseMini = () => {
    const params = prepareQueryParams();
    return v1list(params);
  };

  const { data, isFetching, isError } = useQuery(
    ['udoseMini'],
    fetchUdoseMini,
    { refetchOnWindowFocus: false }
  );

  return {
    data,
    isFetching,
    isError,
  };
};

export default useUdoseMiniList;
