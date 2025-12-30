import { useQuery } from '@tanstack/react-query';
import { SiteLocationFilterParams } from '../../../types/location/locationList';
import siteLocation from '../../../helpers/api/siteLocation';
import { DOSER_RUNNING, DOSER_STOPPED } from '../../../constants/mapConstant';

const useSiteLocations: any = (id?: any) => {
  const getSiteLocations = async () => {
    const params: SiteLocationFilterParams = {};
    if (id) {
      params.customer_property_id = id;
    }

    const data = await siteLocation.getSiteLocations(params);

    const filteredData =
      data?.filter(
        (marker: any) => marker?.latitude !== null || marker?.longitude !== null
      ) ?? [];

    // Count status
    const runningData = filteredData.filter(
      (marker: any) => marker?.status === DOSER_RUNNING
    );
    const stoppedData = filteredData.filter(
      (marker: any) => marker?.status === DOSER_STOPPED
    );
    const alarmedData = filteredData.filter(
      (marker: any) =>
        marker?.status !== DOSER_RUNNING && marker?.status !== DOSER_STOPPED
    );

    return {
      filteredData,
      runningData,
      stoppedData,
      alarmedData,
    };
  };

  const { data, isFetching, isError } = useQuery({
    queryKey: ['getSiteLocations', id],
    queryFn: getSiteLocations,
    refetchOnWindowFocus: false,
  });

  return {
    data: data?.filteredData,
    runningData: data?.runningData,
    stoppedData: data?.stoppedData,
    alarmedData: data?.alarmedData,
    isFetching,
    isError,
  };
};

export default useSiteLocations;
