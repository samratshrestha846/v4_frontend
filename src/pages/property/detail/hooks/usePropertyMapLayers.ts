import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { APICore } from '../../../../helpers/api/apiCore';

const usePropertyMapLayers = () => {
  const api = new APICore();
  const { id } = useParams();

  const getMapLayersByCustomerPropertyId = async () => {
    const response = await api.get(`customer-properties/${id}/map-layers`);
    return response.data.body;
  };

  const { data, isFetching, isFetched, isError } = useQuery({
    queryKey: ['getMapLayersByCustomerPropertyId', id],
    queryFn: getMapLayersByCustomerPropertyId,
    refetchOnWindowFocus: false,
    retry: false,
  });
  return { data, isFetching, isFetched, isError };
};

export default usePropertyMapLayers;
