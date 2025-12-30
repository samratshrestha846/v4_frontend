import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import siteLocation from '../../../../helpers/api/siteLocation';
import { SiteLocationFilterParams } from '../../../../types/location/locationList';

export default function useSiteLocations() {
  const { id } = useParams();

  const getSiteLocations = async () => {
    const params: SiteLocationFilterParams = { customer_property_id: id };
    const data = await siteLocation.getSiteLocations(params);

    return (
      data?.filter(
        (marker: any) => marker?.latitude !== null || marker?.longitude !== null
      ) ?? []
    );
  };

  const { data, isFetching, isError } = useQuery(
    ['getSiteLocations', { id }],
    getSiteLocations,
    { refetchOnWindowFocus: false, retry: false, enabled: !!id }
  );

  return { data, isFetching, isError };
}
