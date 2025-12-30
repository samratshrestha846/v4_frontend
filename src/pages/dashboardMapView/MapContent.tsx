import React, { useState, useRef, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, LayersControl, ScaleControl } from 'react-leaflet';
import classNames from 'classnames';
import MeasureMap from '../property/detail/map/MeasureMap';
import SearchLatLng from '../property/detail/map/SearchLatLng';
import MyLocation from '../property/detail/map/MyLocation';
import useSiteLocations from './hooks/useSiteLocations';
import StationData from './components/StationData';
import BaseLayerMap from './components/mapLayers/BaseLayerMap';
import ErrorMessage from '../../components/ErrorMessage';
import AvenzaMapLayer from './components/mapLayers/AvenzaMapLayer';
import TrackMapZoomLevel from './components/TrackMapZoomLevel';
import RainfallMapLayer from './components/mapLayers/RainfallMapLayer';
import useRainfallLayer from './hooks/useRainfallLayer';
import CiboLabsLayer from './components/mapLayers/CiboLabsLayer';
import useMapCiboLabFeature from '../property/detail/hooks/useMapCiboLabFeature';
import ZoomController from './components/ZoomController';
import Loader from '../../components/Loader';
import useMapGeoJsonLayers from './hooks/useMapGeoJsonLayers';
import usePropertiesDropdown from '../../hooks/dropdown/usePropertiesDropdown';
import MapSideBarWrapper from './components/sidebar/MapSideBarWrapper';
import MlaLayer from './components/mapLayers/MlaLayer';
import useMlaLayer from './hooks/useMlaLayer';
import useCeresTagData from '../property/detail/map/Hooks/useCeresTagData';
import CeresTagLayer from './components/mapLayers/CeresTagLayer';

type Props = {
  wrapperclass?: string;
  mapWrapperClass?: string;
  height?: string;
};

const MapContent: React.FC<Props> = ({
  wrapperclass,
  mapWrapperClass,
  height,
}) => {
  const defaultCenterCoordinates = { lat: -25.86944, lng: 135.04453 };
  const [property, setProperty] = useState<string>();
  const [zoomLevel, setZoomLevel] = useState(1);

  // Dosers Marker
  const [siteIsHide, setSiteIsHide] = useState<boolean>(false);
  const [runningIsHide, setRunningIsHide] = useState<boolean>(false);
  const [stoppedIsHide, setStoppedIsHide] = useState<boolean>(false);
  const [alarmedIsHide, setAlarmedIsHide] = useState<boolean>(false);
  const markerRefs = useRef([]);

  const [avenzaMapHide, setAvenzaMapHide] = useState<boolean>(false);
  const [loadingAvenzaMap, setLoadingAvenzaMap] = useState<boolean>(true);

  const [rainfallHide, setRainfallHide] = useState<boolean>(true);
  const [ciboLabsHide, setCiboLabsHide] = useState<boolean>(true);
  const [ceresTagHide, setCeresTagHide] = useState<boolean>(true);

  const [mlaHide, setMlaHide] = useState<boolean>(false);

  const { landData, coastalData, loadingMla, errorMla, setLoadingMla } =
    useMlaLayer();

  const {
    data: siteLocations,
    runningData: runningSiteLocations,
    stoppedData: stoppedSiteLocations,
    alarmedData: alarmedSiteLocations,
    isError: isErrorsiteLocation,
    isFetching: isFetchingSiteLocation,
  } = useSiteLocations(property);

  const {
    geoJsonData: ciboLabsData,
    isFetchingCiboLabs,
    setIsFetchingCiboLabs,
  } = useMapCiboLabFeature(property ? siteLocations : null);

  const {
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
  } = useRainfallLayer(rainfallHide, property);

  // Hook for Avenza maps
  const {
    geoJsonLayerArray,
    isFetchingMapLayers,
    fetchingAvenzaMap,
    avenzaMapError,
  } = useMapGeoJsonLayers(Number(property));

  const {
    data: propertiesOptions,
    isError: isErrorPropertiesOptions,
    isFetching: isFetchingPropertiesOptions,
  } = usePropertiesDropdown();

  const {
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
  } = useCeresTagData(Number(property));

  useEffect(() => {
    setLoadingAvenzaMap(true);
  }, [property]);

  if (isFetchingSiteLocation || isFetchingPropertiesOptions) {
    return <Loader />;
  }

  if (isErrorsiteLocation) {
    return <ErrorMessage />;
  }

  return (
    <div
      id="dashboard-map-view"
      className={classNames('d-flex', wrapperclass ?? 'mt-2')}>
      <MapContainer
        center={defaultCenterCoordinates}
        zoom={4}
        style={{ height: height ?? '100vh', width: '100%' }}
        zoomControl={false}
        maxZoom={16}
        className={mapWrapperClass || ''}>
        <MapSideBarWrapper
          property={property}
          setProperty={setProperty}
          propertiesOptions={propertiesOptions}
          isErrorPropertiesOptions={isErrorPropertiesOptions}
          siteIsHide={siteIsHide}
          setSiteIsHide={setSiteIsHide}
          runningIsHide={runningIsHide}
          setRunningIsHide={setRunningIsHide}
          stoppedIsHide={stoppedIsHide}
          setStoppedIsHide={setStoppedIsHide}
          alarmedIsHide={alarmedIsHide}
          setAlarmedIsHide={setAlarmedIsHide}
          runningSiteLocations={runningSiteLocations}
          stoppedSiteLocations={stoppedSiteLocations}
          alarmedSiteLocations={alarmedSiteLocations}
          markerRefs={markerRefs}
          avenzaMapHide={avenzaMapHide}
          setAvenzaMapHide={setAvenzaMapHide}
          geoJsonLayerArray={geoJsonLayerArray}
          rainfallHide={rainfallHide}
          setRainfallHide={setRainfallHide}
          setDateRange={setDateRange}
          getDateRange={getDateRange}
          rainfallRange={rainfallRange}
          fetchRasterError={fetchRasterError}
          fetchingRaster={fetchingRaster}
          isFetchingRainfall={isFetchingRainfall}
          isErrorRainfall={isErrorRainfall}
          ciboLabsHide={ciboLabsHide}
          setCiboLabsHide={setCiboLabsHide}
          ciboLabsData={ciboLabsData}
          isFetchingCiboLabs={isFetchingCiboLabs}
          setIsFetchingCiboLabs={setIsFetchingCiboLabs}
          mlaHide={mlaHide}
          setMlaHide={setMlaHide}
          loadingMla={loadingMla}
          errorMla={errorMla}
          ceresTagHide={ceresTagHide}
          setCeresTagHide={setCeresTagHide}
          ceresTagData={ceresTagData}
          times={times}
          timeSliderValue={timeSliderValue}
          setTimeSliderValue={setTimeSliderValue}
          ceresTagId={ceresTagId}
          setCeresTagId={setCeresTagId}
          setAsOfFrom={setAsOfFrom}
          setAsOfTo={setAsOfTo}
          isFetchingCeresTag={isFetchingCeresTag}
          isErrorCeresTag={isErrorCeresTag}
          displaySelectedDate={displaySelectedDate}
        />

        <div className="map-functionality-wrapper">
          <SearchLatLng />
          <ZoomController />
          <MyLocation />
          <MeasureMap />
        </div>

        <TrackMapZoomLevel setZoomLevel={setZoomLevel} />

        <ScaleControl position="bottomleft" />

        <LayersControl position="topright">
          <BaseLayerMap />
          {property && !avenzaMapHide && geoJsonLayerArray.length > 0 && (
            <AvenzaMapLayer
              zoomLevel={zoomLevel}
              loadingAvenzaMap={loadingAvenzaMap}
              setLoadingAvenzaMap={setLoadingAvenzaMap}
              geoJsonLayerArray={geoJsonLayerArray}
              isFetchingMapLayers={isFetchingMapLayers}
              fetchingAvenzaMap={fetchingAvenzaMap}
              avenzaMapError={avenzaMapError}
            />
          )}
        </LayersControl>

        {property && ciboLabsData && !ciboLabsHide && (
          <CiboLabsLayer
            ciboLabsHide={ciboLabsHide}
            ciboLabsData={ciboLabsData}
            setIsFetchingCiboLabs={setIsFetchingCiboLabs}
          />
        )}

        {!siteIsHide && siteLocations?.length > 0 && (
          <StationData
            siteLocations={siteLocations}
            runningIsHide={runningIsHide}
            stoppedIsHide={stoppedIsHide}
            alarmedIsHide={alarmedIsHide}
            markerRefs={markerRefs}
          />
        )}

        {!rainfallHide && property && (
          <RainfallMapLayer
            rainfallLayer={rainfallLayer}
            rainfallHide={rainfallHide}
            georasterData={georasterData}
            setFetchingRaster={setFetchingRaster}
          />
        )}
        {!mlaHide && !property && !errorMla && (
          <MlaLayer
            setLoadingMla={setLoadingMla}
            landData={landData}
            coastalData={coastalData}
          />
        )}

        {property && !isErrorCeresTag && (
          <CeresTagLayer
            ceresTagData={ceresTagData}
            times={times}
            timeSliderValue={timeSliderValue}
            ceresTagHide={ceresTagHide}
            ceresTagId={ceresTagId}
            asOfFrom={asOfFrom}
            asOfTo={asOfTo}
            setDisplaySelectedDate={setDisplaySelectedDate}
            cowIcon={cowIcon}
          />
        )}
      </MapContainer>
    </div>
  );
};

export default MapContent;
