import { useQuery } from '@tanstack/react-query';
import propertyAnalytics from '../../../../helpers/api/propertyAnalytics';
import { FilterByPropertyQueryParams } from '../../../../types/property/analytics';

export default function useCostNutrientAnalytics(propertyId?: number) {
  const fetchCostNutrientAnalytics = async () => {
    const params: FilterByPropertyQueryParams = {};

    if (propertyId) {
      params.customer_property_id = Number(propertyId);
    }

    return propertyAnalytics.fetchCostNutrientAnalytics(params);
  };

  const { data, isFetching, error, isError } = useQuery(
    ['cost_nutrient_analytics', propertyId],
    fetchCostNutrientAnalytics,
    { refetchOnWindowFocus: false, retry: false }
  );

  return { data, isFetching, error, isError };
}
