import { useQuery } from '@tanstack/react-query';
import propertyAnalytics from '../../../../helpers/api/propertyAnalytics';
import { FilterByPropertyQueryParams } from '../../../../types/property/analytics';

export default function useDashboardCounts(propertyId?: number) {
  const fetchDashboardCounts = async () => {
    const params: FilterByPropertyQueryParams = {};

    if (propertyId) {
      params.customer_property_id = Number(propertyId);
    }

    return propertyAnalytics.fetchDashboardCounts(params);
  };

  const { data, isFetching, error, isError } = useQuery(
    ['customer_dashboard_counts', propertyId],
    fetchDashboardCounts,
    { refetchOnWindowFocus: false, retry: false }
  );

  return { data, isFetching, error, isError };
}
