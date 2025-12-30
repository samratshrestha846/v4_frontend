import { MapLayerData } from '../../types/property/mapLayer';
import { APICore } from './apiCore';

function apiMapLayer() {
  const apiCore = new APICore();

  return {
    loadGeoJsonDataByMapLayerId: async (
      customerPropertyId: number,
      mapLayerId: number
    ): Promise<MapLayerData> => {
      const response = await apiCore.get(
        `customer-properties/${customerPropertyId}/map-layers/${mapLayerId}/coordinates`
      );
      return response.data.body;
    },
  };
}

export default apiMapLayer();
