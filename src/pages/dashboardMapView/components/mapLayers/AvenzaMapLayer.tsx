import React, { FC, SetStateAction, useEffect } from 'react';
import {
  LayersControl,
  GeoJSON,
  LayerGroup,
  FeatureGroup,
  useMap,
} from 'react-leaflet';
import L from 'leaflet';
import { capitalizeFirstLetter } from '../../../../helpers';
import LabelMapLayer from './LabelMapLayer';
import {
  LAYER_LINE,
  LAYER_POINT,
  LAYER_POLYGON,
  MAP_LAYER_BOUNDARY,
  MAP_LAYER_FENCELINE,
  MAP_LAYER_INVISIBLE_FENCE_LINE,
} from '../../../../constants/mapConstant';
import Loader from '../../../../components/Loader';

type Props = {
  zoomLevel: number;
  loadingAvenzaMap: boolean;
  setLoadingAvenzaMap: React.Dispatch<SetStateAction<boolean>>;
  geoJsonLayerArray: any[];
  isFetchingMapLayers: boolean;
  fetchingAvenzaMap: boolean;
  avenzaMapError: boolean;
};

const AvenzaMapLayer: FC<Props> = ({
  zoomLevel,
  loadingAvenzaMap,
  setLoadingAvenzaMap,
  geoJsonLayerArray,
  isFetchingMapLayers,
  fetchingAvenzaMap,
  avenzaMapError,
}) => {
  const map = useMap();

  useEffect(() => {
    if (geoJsonLayerArray && geoJsonLayerArray.length > 0) {
      const boundaryLayer = geoJsonLayerArray.find(
        (layer) => layer.name === MAP_LAYER_BOUNDARY
      );

      if (boundaryLayer && boundaryLayer.features.length > 0) {
        const bounds = L.geoJSON(boundaryLayer).getBounds();
        map.fitBounds(bounds);
      }
    }
  }, [geoJsonLayerArray, map]);

  if (isFetchingMapLayers || fetchingAvenzaMap) {
    return <Loader />;
  }

  if (!avenzaMapError && geoJsonLayerArray && geoJsonLayerArray.length > 0) {
    let fenceLineLayer: any = null;
    let invisibleFenceLineLayer: any = null;
    return (
      <>
        {loadingAvenzaMap && <Loader />}
        <FeatureGroup
          eventHandlers={{
            add: () => {
              setLoadingAvenzaMap(false);
            },
          }}>
          {geoJsonLayerArray.map((item) => {
            // Ignoring fenceline and invisible fenceline for now
            if (item.name === MAP_LAYER_FENCELINE) {
              fenceLineLayer = item;
              return null;
            }
            if (item.name === MAP_LAYER_INVISIBLE_FENCE_LINE) {
              invisibleFenceLineLayer = item;
              return null;
            }

            // Adding all Polygon and Line layer in map except insivibile fenceline and fenceline
            if (
              (item.type === LAYER_POLYGON &&
                item.name !== MAP_LAYER_INVISIBLE_FENCE_LINE) ||
              (item.type === LAYER_LINE && item.name !== MAP_LAYER_FENCELINE)
            ) {
              return (
                <LayersControl.Overlay
                  key={item.layerId}
                  name={capitalizeFirstLetter(item.name)}
                  checked={zoomLevel >= item.visibleZoom}>
                  <FeatureGroup>
                    <GeoJSON
                      key={item.name}
                      data={item}
                      style={item.style.style}
                    />
                    {zoomLevel >= item.labelZoom && (
                      <LayerGroup>
                        {item.features.map((featureItem: any) => (
                          <LabelMapLayer
                            featureItem={featureItem}
                            item={item}
                          />
                        ))}
                      </LayerGroup>
                    )}
                  </FeatureGroup>
                </LayersControl.Overlay>
              );
            }

            // Adding all point layer to map
            if (item.type === LAYER_POINT) {
              return (
                <LayersControl.Overlay
                  key={item.layerId}
                  name={capitalizeFirstLetter(item.name)}
                  checked={zoomLevel >= item.visibleZoom}>
                  <FeatureGroup>
                    <GeoJSON
                      key={item.name}
                      data={item}
                      pointToLayer={(feature, latlng) => {
                        return L.marker(latlng, {
                          icon: L.divIcon(item.style.style),
                        });
                      }}
                    />
                    {zoomLevel >= item.labelZoom && (
                      <LayerGroup>
                        {item.features.map((featureItem: any) => (
                          <LabelMapLayer
                            featureItem={featureItem}
                            item={item}
                          />
                        ))}
                      </LayerGroup>
                    )}
                  </FeatureGroup>
                </LayersControl.Overlay>
              );
            }

            return null;
          })}

          {/* Merging and adding fenceline and invisible fenceline in map */}
          {(fenceLineLayer || invisibleFenceLineLayer) && (
            <LayersControl.Overlay
              key="merged_fenceline"
              name="Fenceline"
              checked={zoomLevel >= fenceLineLayer.visibleZoom}>
              <FeatureGroup>
                {fenceLineLayer && (
                  <GeoJSON
                    key={fenceLineLayer.name}
                    data={fenceLineLayer}
                    style={fenceLineLayer.style.style}
                  />
                )}
                {invisibleFenceLineLayer && (
                  <>
                    <GeoJSON
                      key={invisibleFenceLineLayer.name}
                      data={invisibleFenceLineLayer}
                      style={invisibleFenceLineLayer.style.style}
                    />

                    <LayerGroup>
                      {zoomLevel >= fenceLineLayer.labelZoom &&
                        fenceLineLayer?.features.map((featureItem: any) => (
                          <LabelMapLayer
                            featureItem={featureItem}
                            item={fenceLineLayer}
                          />
                        ))}
                      {zoomLevel >= invisibleFenceLineLayer.labelZoom &&
                        invisibleFenceLineLayer?.features.map(
                          (featureItem: any) => (
                            <LabelMapLayer
                              featureItem={featureItem}
                              item={invisibleFenceLineLayer}
                            />
                          )
                        )}
                    </LayerGroup>
                  </>
                )}
              </FeatureGroup>
            </LayersControl.Overlay>
          )}
        </FeatureGroup>
      </>
    );
  }

  return null;
};
export default AvenzaMapLayer;
