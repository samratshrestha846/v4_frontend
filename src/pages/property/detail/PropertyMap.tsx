/* eslint-disable react/no-array-index-key */
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  ScaleControl,
  LayersControl,
  LayerGroup,
  FeatureGroup,
  GeoJSON,
  useMap,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Card } from 'react-bootstrap';
import { FeatureCollection } from 'geojson';
import L, { ImageOverlay } from 'leaflet';
import ReactDOM from 'react-dom';
import CustomLoader from '../../../components/CustomLoader';
import { DEFAULT_MAP_BOUNDS } from '../../../constants/mapConstant';
import DoserMarker from './map/DoserMarker';
import useSiteLocations from './hooks/useSiteLocations';
import { Property } from '../../../types/property/propertyList';
import MapLabel from './map/MapLabel';
import Legend from './map/Legend';
import MyLocation from './map/MyLocation';
import SearchLatLng from './map/SearchLatLng';
import useFetchMapLayers from './hooks/useFetchMapLayers';
import { capitalizeFirstLetter } from '../../../helpers';
import MeasureMap from './map/MeasureMap';
import MapViewFeature from './map/MapViewFeature';
import useCeresTagData from './map/Hooks/useCeresTagData';
import CeresTagPopUp from './map/ceresTag/CeresTagPopUp';
import useCiboLabs from './map/Hooks/useCiboLabs';
import CiboLabsPopUp from './map/ciboLabs/CiboLabsPopUp';
import ErrorMessage from '../../../components/ErrorMessage';
import useCeresTagDropdown from '../../../hooks/dropdown/useCeresTagDropdown';
import useRainfallData from './map/Hooks/useRainfallData';

const geoblaze = require('geoblaze');

type Props = {
  property: Property;
};

const PropertyMap: FC<Props> = ({ property }) => {
  const contentRef = useRef(null);

  const {
    data: siteLocations,
    isFetching: isFetchingSiteLocations,
    isError: isErrorSiteLocations,
  } = useSiteLocations();

  const [ceresCurrentLayer, setCeresCurrentLayer] = useState<any>(null); // Ceres Tag Layer that is being displayed in the map
  const [ciboCurrentLayer, setCiboCurrentLayer] = useState<any>(null);

  const {
    isFetchingMapLayers,
    isErrorMapLayers,
    geoJsonLayers,
    pointToLayer,
    bounds,
    minZoom,
    maxZoom,
    zoomLevel,
    setZoomLevel,
  } = useFetchMapLayers({ property });

  const {
    ceresTagActive,
    setCeresTagActive,
    ceresTagData,
    times,
    timeSliderValue,
    setTimeSliderValue,
    cowIcon,
    ceresTagId,
    setCeresTagId,
    asOfFrom,
    setAsOfFrom,
    asOfTo,
    setAsOfTo,
    isFetching: isFetchingCeresTag,
    isError: isErrorCeresTag,
    displaySelectedDate,
    setDisplaySelectedDate,
  } = useCeresTagData(property.id);

  const {
    ciboLabsActive,
    setCiboLabsActive,
    ciboLabsStyle,
    ciboLabsData,
    isFetchingCiboLabs,
    setIsFetchingCiboLabs,
  } = useCiboLabs();

  const {
    data: ceresTagsOptions,
    isFetching: isFetchingCeresTagsOptions,
    isError: isErrorCeresTagsOptions,
  } = useCeresTagDropdown(String(property?.id));

  const {
    rainfallActive,
    setRainfallActive,
    isFetching: isFetchingRainfall,
    isError: isErrorRainfall,
    setDateRange,
    getDateRange,
    rainfallRange,
    fetchRasterError,
    fetchingRaster,
    setFetchingRaster,
    rainfallLayer,
    georasterData,
  } = useRainfallData(String(property?.id));
  const layerRef = useRef<ImageOverlay | null>(null);

  const TrackMapZoomLevel = () => {
    const map = useMap();
    useEffect(() => {
      const handleZoomChange = () => {
        setZoomLevel(map.getZoom());
      };

      map.on('zoomend', handleZoomChange);

      return () => {
        map.off('zoomend', handleZoomChange);
      };
    }, [map]);
    return null;
  };

  const AddRainfallToMap = useCallback(() => {
    const map = useMap();

    useEffect(() => {
      const removeClickEventListener = () => {
        map.off('click');
      };

      const removePreviousLayer = () => {
        if (layerRef.current) {
          removeClickEventListener();
          map.removeLayer(layerRef.current);
          layerRef.current = null;
        }
      };

      const addNewLayer = () => {
        if (rainfallLayer) {
          rainfallLayer.addTo(map);
          setFetchingRaster(false);

          map.on('click', function handleClick(evt: any) {
            const latlng = map.mouseEventToLatLng(evt.originalEvent);

            if (rainfallLayer && rainfallLayer.getBounds().contains(latlng)) {
              const rainfallval = geoblaze.identify(georasterData, [
                latlng.lng,
                latlng.lat,
              ]);

              if (rainfallval[0] >= 0) {
                L.popup()
                  .setLatLng(latlng)
                  .setContent(`Rainfall: ${rainfallval[0].toFixed(4)}mm`)
                  .openOn(map);
              }
            }
          });

          layerRef.current = rainfallLayer;
        }
      };

      removePreviousLayer();
      if (rainfallActive) {
        addNewLayer();
      }
      return () => {
        removePreviousLayer();
      };
    }, [rainfallLayer, rainfallActive]);

    return null;
  }, [rainfallLayer, rainfallActive]);

  // Add CeresTag data to map
  const AddCeresTagToMap = useCallback(() => {
    const map = useMap();

    const getLocationOnSelectedDate = (
      data: FeatureCollection,
      selectedDate: string
    ) => {
      const cowLocations: { [key: number]: any } = {};
      const firstDates: { [key: number]: Date } = {};

      data.features.forEach((feature) => {
        const ceresTagID = feature.properties?.ceres_tag_id;
        const dateTime = feature.properties?.datetime;
        const featureDate = new Date(dateTime);
        const selectedFeatureDate = new Date(selectedDate);

        // Track the first data date for each ceres_tag_id
        if (!firstDates[ceresTagID] || featureDate < firstDates[ceresTagID]) {
          firstDates[ceresTagID] = featureDate;
        }

        // Only proceed if the first data date is before or on the selected date
        if (firstDates[ceresTagID] <= selectedFeatureDate) {
          if (!cowLocations[ceresTagID]) {
            cowLocations[ceresTagID] = feature;
          } else {
            const currentFeatureDate = new Date(
              cowLocations[ceresTagID].properties.datetime
            );

            if (
              (featureDate <= selectedFeatureDate &&
                featureDate > currentFeatureDate) ||
              (currentFeatureDate > selectedFeatureDate &&
                featureDate > selectedFeatureDate)
            ) {
              cowLocations[ceresTagID] = feature;
            }
          }
        }
      });

      return {
        type: 'FeatureCollection',
        features: Object.values(cowLocations),
      } as FeatureCollection;
    };

    useEffect(() => {
      if (ceresCurrentLayer) {
        map.removeLayer(ceresCurrentLayer);
      }

      if (ceresTagData && times && ceresTagActive) {
        const selectedDate = times[timeSliderValue];
        setDisplaySelectedDate(times[timeSliderValue]);

        const dataToDisplay = getLocationOnSelectedDate(
          ceresTagData,
          selectedDate
        );

        const filteredLayer = new L.GeoJSON(dataToDisplay, {
          pointToLayer: (feature, latlng) => {
            return new L.Marker(latlng, { icon: cowIcon });
          },
          onEachFeature: (feature: any, layer) => {
            if (feature.properties) {
              const div = document.createElement('div');
              ReactDOM.render(<CeresTagPopUp feature={feature} />, div);
              layer.bindPopup(div);
            }
          },
        });

        setCeresCurrentLayer(filteredLayer);
        filteredLayer.addTo(map);
      }
    }, [ceresTagId, ceresTagActive, timeSliderValue, asOfFrom, asOfTo]);
    return null;
  }, [ceresTagId, timeSliderValue, ceresTagActive, asOfFrom, asOfTo]);

  const AddCiboLabsToMap = useCallback(() => {
    const map = useMap();
    const featureGroup = L.featureGroup();

    useEffect(() => {
      if (!ciboLabsActive && ciboCurrentLayer) {
        map.removeLayer(ciboCurrentLayer);
      }

      if (
        ciboLabsActive &&
        ciboLabsData &&
        siteLocations &&
        siteLocations?.length > 0
      ) {
        ciboLabsData.forEach((ciboLabs: any) => {
          const geojsonLayer = L.geoJSON(ciboLabs.data, {
            style: ciboLabsStyle,
            onEachFeature: (feature, layer) => {
              if (feature.properties) {
                const { name } = ciboLabs.location;
                const div = document.createElement('div');
                ReactDOM.render(
                  <CiboLabsPopUp feature={feature} name={name} />,
                  div
                );
                layer.bindPopup(div);
              }
            },
          });

          geojsonLayer.addTo(featureGroup);
          setCiboCurrentLayer(featureGroup);
        });
        featureGroup.addTo(map);
        setIsFetchingCiboLabs(false);
      }
    }, []);
    return null;
  }, [ciboLabsActive, ciboLabsData]);

  const fenceStyleFunction = (feature: any, item: any) =>
    feature.geometry.type === 'MultiPolygon'
      ? { opacity: 0, fillOpacity: 0 }
      : item.layerData.style.style;

  const tileLayer = {
    name: 'ESRI World Imagery',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: '&copy; Tiles &copy; Esri &mdash; Source: Esri',
  };

  if (
    isFetchingSiteLocations ||
    isFetchingMapLayers ||
    isFetchingCeresTagsOptions
  ) {
    return <CustomLoader />;
  }

  if (
    isErrorCeresTag ||
    isErrorSiteLocations ||
    isErrorMapLayers ||
    isErrorCeresTagsOptions
  ) {
    return <ErrorMessage />;
  }

  return (
    <Card className="">
      <Card.Header as="h5" className="text-primary-color">
        Properties Map View
      </Card.Header>
      <Card.Body>
        <div className="row">
          <div className="col-md-9">
            <div id="map-print" className=" position-relative" ref={contentRef}>
              {bounds && geoJsonLayers && geoJsonLayers?.length > 0 ? (
                <>
                  <MapContainer
                    key="geojson-map"
                    bounds={bounds}
                    style={{ height: '70vh', width: '100%' }}
                    zoom={zoomLevel}
                    minZoom={minZoom}
                    maxZoom={maxZoom}>
                    <SearchLatLng />
                    <MyLocation />
                    <AddCeresTagToMap />
                    <AddCiboLabsToMap />
                    <AddRainfallToMap />
                    <MeasureMap />
                    <LayersControl position="topright">
                      <LayersControl.BaseLayer
                        checked
                        name="ESRI World Imagery">
                        <TileLayer
                          key={1}
                          attribution={tileLayer.attribution}
                          url={tileLayer.url}
                        />
                      </LayersControl.BaseLayer>
                      <LayersControl.BaseLayer name="OpenStreetMap">
                        <TileLayer
                          key={2}
                          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                      </LayersControl.BaseLayer>

                      {geoJsonLayers.map((item) => (
                        <LayersControl.Overlay
                          key={item.layerData.name}
                          name={capitalizeFirstLetter(item.layerData.name)}
                          checked={
                            zoomLevel >= item.layerData.visible_zoom_level
                          }>
                          <LayerGroup>
                            <FeatureGroup>
                              {item.layerData.feature_type === 'Point' ? (
                                <GeoJSON
                                  key={item.layerData.name}
                                  data={item.geoJSONData}
                                  pointToLayer={(feature, latlng) =>
                                    pointToLayer(
                                      feature,
                                      latlng,
                                      item.layerData
                                    )
                                  }
                                  style={item.layerData.style.style}>
                                  {zoomLevel >=
                                    item.layerData.label_visible_zoom_level && (
                                    <LayerGroup>
                                      {item.geoJSONData.features.map(
                                        (featureItem: any, idx: number) => (
                                          <MapLabel
                                            key={`${item.layerData.name}-${idx}`}
                                            featureItem={featureItem}
                                            item={item}
                                          />
                                        )
                                      )}
                                    </LayerGroup>
                                  )}
                                </GeoJSON>
                              ) : (
                                <GeoJSON
                                  key={item.layerData.name}
                                  data={item.geoJSONData}
                                  style={(feature) =>
                                    item.layerData.name === 'fence_line'
                                      ? fenceStyleFunction(feature, item)
                                      : item.layerData.style.style
                                  }>
                                  {zoomLevel >=
                                    item.layerData.label_visible_zoom_level && (
                                    <LayerGroup>
                                      {item.geoJSONData.features.map(
                                        (featureItem: any, idx: number) => (
                                          <MapLabel
                                            key={`${item.layerData.name}-${idx}`}
                                            featureItem={featureItem}
                                            item={item}
                                          />
                                        )
                                      )}
                                    </LayerGroup>
                                  )}
                                </GeoJSON>
                              )}
                            </FeatureGroup>
                          </LayerGroup>
                        </LayersControl.Overlay>
                      ))}

                      {siteLocations && siteLocations?.length > 0 && (
                        <LayersControl.Overlay
                          key="Dosers"
                          name="Dosers"
                          checked>
                          <FeatureGroup>
                            {siteLocations?.map((marker: any) => (
                              <DoserMarker
                                key={marker?.site_id}
                                marker={marker}
                              />
                            ))}
                          </FeatureGroup>
                        </LayersControl.Overlay>
                      )}
                    </LayersControl>

                    <ScaleControl position="bottomleft" />
                    <TrackMapZoomLevel />
                  </MapContainer>

                  {((siteLocations && siteLocations?.length > 0) ||
                    geoJsonLayers?.length > 0) && (
                    <Legend
                      geojsonLayers={geoJsonLayers}
                      siteLocations={siteLocations}
                    />
                  )}
                </>
              ) : (
                <MapContainer
                  key="default-map"
                  bounds={DEFAULT_MAP_BOUNDS}
                  style={{ height: '65vh', width: '100%' }}
                  zoom={zoomLevel}
                  minZoom={minZoom}
                  maxZoom={maxZoom}>
                  <TileLayer
                    key={1}
                    attribution={tileLayer.attribution}
                    url={tileLayer.url}
                  />
                  <SearchLatLng />
                  <MeasureMap />
                  <MyLocation />
                  <AddCeresTagToMap />

                  {siteLocations && siteLocations?.length > 0 && (
                    <LayersControl position="topright">
                      <LayersControl.Overlay key="Dosers" name="Dosers" checked>
                        <FeatureGroup>
                          {siteLocations?.map((marker: any) => (
                            <DoserMarker
                              key={marker?.site_id}
                              marker={marker}
                            />
                          ))}
                        </FeatureGroup>
                      </LayersControl.Overlay>
                    </LayersControl>
                  )}
                  <ScaleControl position="bottomleft" />
                  {siteLocations && siteLocations?.length > 0 && (
                    <Legend geojsonLayers={[]} siteLocations={siteLocations} />
                  )}
                </MapContainer>
              )}
            </div>
          </div>
          <MapViewFeature
            ceresTagData={ceresTagData}
            isFetchingCeresTag={isFetchingCeresTag}
            isErrorCeresTag={isErrorCeresTag}
            ceresTagActive={ceresTagActive}
            setCeresTagActive={setCeresTagActive}
            times={times}
            timeSliderValue={timeSliderValue}
            setTimeSliderValue={setTimeSliderValue}
            ceresTagId={ceresTagId}
            setCeresTagId={setCeresTagId}
            setAsOfFrom={setAsOfFrom}
            setAsOfTo={setAsOfTo}
            cereTagsOptions={ceresTagsOptions}
            ciboLabsActive={ciboLabsActive}
            setCiboLabsActive={setCiboLabsActive}
            displaySelectedDate={displaySelectedDate}
            ciboLabsData={ciboLabsData}
            isFetchingCiboLabs={isFetchingCiboLabs}
            rainfallActive={rainfallActive}
            setRainfallActive={setRainfallActive}
            setDateRange={setDateRange}
            getDateRange={getDateRange}
            rainfallRange={rainfallRange}
            isFetchingRainfall={isFetchingRainfall}
            isErrorRainfall={isErrorRainfall}
            fetchRasterError={fetchRasterError}
            fetchingRaster={fetchingRaster}
          />
        </div>
      </Card.Body>
    </Card>
  );
};

export default PropertyMap;
