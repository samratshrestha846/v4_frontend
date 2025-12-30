import { useEffect, useState } from 'react';
import L, { LatLng } from 'leaflet';
import { MapData, MapLayerData } from '../../../../types/property/mapLayer';
import { Property } from '../../../../types/property/propertyList';
import usePropertyMapLayers from './usePropertyMapLayers';
import mapLayerApi from '../../../../helpers/api/mapLayer';

type Props = {
  property: Property;
};
const useFetchMapLayers = ({ property }: Props) => {
  const [geoJsonLayers, setGeoJsonLayers] = useState<MapData[]>();
  const [bounds, setBounds] = useState<any>();
  const [maxBounds, setMaxBounds] = useState<any>();
  const [zoomLevel, setZoomLevel] = useState<number>(8);

  const maxZoom = 16;
  const minZoom = 4;

  const {
    data: mapLayers,
    isFetching: isFetchingMapLayers,
    isFetched: isFetchedMapLayers,
    isError: isErrorMapLayers,
  } = usePropertyMapLayers();

  const fetchDataFromGeoServer = () => {
    Promise.all(
      mapLayers?.map(async (mapLayer: MapLayerData) => {
        const response = await mapLayerApi.loadGeoJsonDataByMapLayerId(
          property.id,
          mapLayer.id
        );
        const resData: MapData = {
          layerData: mapLayer,
          geoJSONData: response,
        };
        return resData;
      })
    ).then((response) => {
      let filteredResponse = response;

      const fenceline = response.find(
        (item) => item.layerData.name === 'fence_line'
      );

      const invisibleFenceline = response.find(
        (item) => item.layerData.name === 'invisible_fence_line'
      );

      if (fenceline && invisibleFenceline) {
        let updatedFenceline = {};
        filteredResponse = response.filter(
          (item) =>
            !['fence_line', 'invisible_fence_line'].includes(
              item.layerData.name
            )
        );
        updatedFenceline = {
          layerData: {
            ...fenceline.layerData,
            font: { ...invisibleFenceline.layerData.font },
          },
          geoJSONData: {
            ...fenceline.geoJSONData,
            features: [
              ...fenceline.geoJSONData.features,
              ...invisibleFenceline.geoJSONData.features,
            ],
          },
        };
        filteredResponse.push(updatedFenceline);
      }

      // get bounds of first response i.e. boundary
      const mapBounds = L.geoJSON(response?.[0]?.geoJSONData).getBounds();
      const adjustmentValue = 5;
      const maxMapBounds = [
        [
          mapBounds.getSouthWest().lat - adjustmentValue,
          mapBounds.getSouthWest().lng - adjustmentValue,
        ],
        [
          mapBounds.getNorthEast().lat + adjustmentValue,
          mapBounds.getNorthEast().lng + adjustmentValue,
        ],
      ];
      setMaxBounds(maxMapBounds);

      const LayerBounds = [
        [mapBounds?.getSouthWest().lat, mapBounds?.getSouthWest().lng],
        [mapBounds?.getNorthEast().lat, mapBounds?.getNorthEast().lng],
      ];
      setBounds(LayerBounds);

      setGeoJsonLayers(filteredResponse);
    });
  };

  useEffect(() => {
    if (isFetchedMapLayers && mapLayers?.length > 0) {
      fetchDataFromGeoServer();
    }
  }, [isFetchedMapLayers]);

  const pointToLayer = (
    feature: any,
    latlng: LatLng,
    layerData: MapLayerData
  ) => {
    return L.marker(latlng, {
      icon: L.divIcon(layerData.style.style),
    });
  };

  return {
    isErrorMapLayers,
    isFetchingMapLayers,
    geoJsonLayers,
    pointToLayer,
    bounds,
    maxBounds,
    minZoom,
    maxZoom,
    zoomLevel,
    setZoomLevel,
  };
};

export default useFetchMapLayers;
