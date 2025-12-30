import React, { SetStateAction, useState } from 'react';
import classNames from 'classnames';
import { useMap } from 'react-leaflet';
import MapSidebar from './MapSidebar';

type Props = {
  propertiesOptions: any;
  isErrorPropertiesOptions: boolean;
  runningIsHide: boolean;
  setRunningIsHide: React.Dispatch<SetStateAction<boolean>>;
  stoppedIsHide: boolean;
  setStoppedIsHide: React.Dispatch<SetStateAction<boolean>>;
  alarmedIsHide: boolean;
  setAlarmedIsHide: React.Dispatch<SetStateAction<boolean>>;
  siteIsHide: boolean;
  setSiteIsHide: React.Dispatch<SetStateAction<boolean>>;
  property: string | undefined;
  setProperty: React.Dispatch<SetStateAction<string | undefined>>;
  runningSiteLocations: any;
  stoppedSiteLocations: any;
  alarmedSiteLocations: any;
  markerRefs: React.MutableRefObject<any[]>;
  avenzaMapHide: boolean;
  setAvenzaMapHide: React.Dispatch<SetStateAction<boolean>>;
  rainfallHide: boolean;
  setRainfallHide: React.Dispatch<SetStateAction<boolean>>;
  setDateRange: React.Dispatch<SetStateAction<string>>;
  getDateRange: any;
  rainfallRange: any;
  fetchRasterError: boolean;
  fetchingRaster: boolean;
  isFetchingRainfall: boolean;
  isErrorRainfall: boolean;
  ciboLabsHide: boolean;
  setCiboLabsHide: React.Dispatch<SetStateAction<boolean>>;
  ciboLabsData: any;
  isFetchingCiboLabs: boolean;
  geoJsonLayerArray: any[];
  setIsFetchingCiboLabs: React.Dispatch<SetStateAction<boolean>>;

  mlaHide: boolean;
  setMlaHide: React.Dispatch<SetStateAction<boolean>>;
  loadingMla: boolean;
  errorMla: boolean;
  ceresTagHide: boolean;
  setCeresTagHide: React.Dispatch<SetStateAction<boolean>>;
  ceresTagData: any;
  times: string[];
  timeSliderValue: number | null;
  setTimeSliderValue: React.Dispatch<SetStateAction<number>>;
  ceresTagId: number | null;
  setCeresTagId: React.Dispatch<SetStateAction<number | null>>;
  setAsOfFrom: React.Dispatch<SetStateAction<string | null>>;
  setAsOfTo: React.Dispatch<SetStateAction<string | null>>;
  isFetchingCeresTag: boolean;
  isErrorCeresTag: boolean;
  displaySelectedDate: string;
};

const MapSideBarWrapper: React.FC<Props> = ({
  property,
  setProperty,
  propertiesOptions,
  isErrorPropertiesOptions,
  siteIsHide,
  setSiteIsHide,
  runningIsHide,
  setRunningIsHide,
  stoppedIsHide,
  setStoppedIsHide,
  alarmedIsHide,
  setAlarmedIsHide,
  runningSiteLocations,
  stoppedSiteLocations,
  alarmedSiteLocations,
  markerRefs,
  avenzaMapHide,
  geoJsonLayerArray,
  setAvenzaMapHide,
  rainfallHide,
  setRainfallHide,
  setDateRange,
  getDateRange,

  rainfallRange,
  fetchRasterError,
  fetchingRaster,
  isFetchingRainfall,
  isErrorRainfall,

  ciboLabsHide,
  setCiboLabsHide,
  ciboLabsData,
  isFetchingCiboLabs,
  setIsFetchingCiboLabs,

  mlaHide,
  setMlaHide,
  loadingMla,
  errorMla,

  ceresTagHide,
  setCeresTagHide,
  ceresTagData,
  times,
  timeSliderValue,
  setTimeSliderValue,
  ceresTagId,
  setCeresTagId,
  setAsOfFrom,
  setAsOfTo,
  isFetchingCeresTag,
  isErrorCeresTag,
  displaySelectedDate,
}) => {
  const [isCondensed, setIsCondensed] = useState(false); // SideBar condenced

  const map = useMap();

  return (
    <div
      className="map-sidebar-wrapper"
      onMouseEnter={() => {
        if (map) {
          map.scrollWheelZoom.disable();
          map.doubleClickZoom.disable();
          map.dragging.disable();
        }
      }}
      onMouseLeave={() => {
        if (map) {
          map.scrollWheelZoom.enable();
          map.doubleClickZoom.enable();
          map.dragging.enable();
        }
      }}>
      <div
        id="map-sidebar-box"
        className={classNames(
          isCondensed ? 'map-sidebar-hide' : 'map-sidebar-show p-1'
        )}>
        <MapSidebar
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
      </div>

      <button
        className={classNames(
          'btn map-sidebar-toggle-btn',
          isCondensed
            ? 'map-sidebar-toggle-btn-hide'
            : 'map-sidebar-toggle-btn-show'
        )}
        type="button"
        onClick={() => setIsCondensed(!isCondensed)}>
        <i
          className={classNames(
            isCondensed ? 'bx bx-chevron-right' : 'bx bx-chevron-left'
          )}
        />
      </button>
    </div>
  );
};

export default MapSideBarWrapper;
