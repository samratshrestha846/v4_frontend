import { useQuery } from '@tanstack/react-query';
import { APICore } from '../../../helpers/api/apiCore';

const usePropertyMapLayers = (id: number) => {
  const api = new APICore();

  const getMapLayersByCustomerPropertyId = async () => {
    const response = await api.get(`customer-properties/${id}/map-layers`);
    return response.data.body;
  };

  const { data, isFetching, isFetched, isError } = useQuery({
    queryKey: ['getMapLayersByCustomerPropertyId', id],
    queryFn: getMapLayersByCustomerPropertyId,
    refetchOnWindowFocus: false,
    retry: false,
    enabled: !!id,
  });
  return { data, isFetching, isFetched, isError };
};

export default usePropertyMapLayers;
