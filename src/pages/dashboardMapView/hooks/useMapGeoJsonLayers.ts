import { useEffect, useState } from 'react';
import { APICore } from '../../../helpers/api/apiCore';
import usePropertyMapLayers from './usePropertyMapLayers';

const useMapGeoJsonLayers = (customerPropertyId: number) => {
  const api = new APICore();

  const {
    data: mapLayers,
    isFetching: isFetchingMapLayers,
    isFetched: isFetchedMapLayers,
    isError: isErrorMapLayers,
  } = usePropertyMapLayers(customerPropertyId);

  const [geoJsonLayerArray, setGeoJsonLayerArray] = useState<any[]>([]);
  const [avenzaMapError, setAvenzaMapError] = useState<boolean>(false);
  const [fetchingAvenzaMap, setFetchingAvenzaMap] = useState<boolean>(false);

  const getMapGeoJsonLayer = async (layerId: number) => {
    const response = await api.get(
      `customer-properties/${customerPropertyId}/map-layers/${layerId}/coordinates`
    );
    return response.data.body;
  };

  useEffect(() => {
    const fetchGeoJsonLayers = async () => {
      try {
        setGeoJsonLayerArray([]);
        const geoJsonLayers = await Promise.all(
          mapLayers.map(async (layer: any) => {
            const geoJson = await getMapGeoJsonLayer(layer.id);
            return {
              ...geoJson,
              name: layer.name,
              type: layer.feature_type,
              layerId: layer.id,
              style: layer.style,
              visibleZoom: layer.visible_zoom_level,
              labelZoom: layer.label_visible_zoom_level,
            };
          })
        );
        setGeoJsonLayerArray(geoJsonLayers);
      } catch (error) {
        setAvenzaMapError(true);
      }
    };

    if (!customerPropertyId) {
      setGeoJsonLayerArray([]);
    }

    if (mapLayers && mapLayers.length < 1) {
      setGeoJsonLayerArray([]);
    }

    if (
      customerPropertyId &&
      mapLayers &&
      mapLayers.length > 0 &&
      !isErrorMapLayers &&
      !avenzaMapError &&
      isFetchedMapLayers
    ) {
      setFetchingAvenzaMap(true);
      fetchGeoJsonLayers();
      setFetchingAvenzaMap(false);
    }
  }, [customerPropertyId, isFetchedMapLayers]);

  return {
    geoJsonLayerArray,
    isFetchingMapLayers,
    fetchingAvenzaMap,
    avenzaMapError,
  };
};

export default useMapGeoJsonLayers;
