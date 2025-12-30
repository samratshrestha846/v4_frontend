import React, { SetStateAction, useEffect, useState } from 'react';
import Select from 'react-select';
import { GeoJsonTypes } from 'geojson';
import CustomCollapse from './CustomCollapse';
import CustomCollapse2 from './CustomCollapse2';
import SearchBox from '../../../../components/SearchBox';
import SiteList from '../SiteList';

import stoppedIcon from '../../../../assets/icons/stopped.svg';
import alarmedIcon from '../../../../assets/icons/alarmed.svg';
import runningIcon from '../../../../assets/icons/running.svg';
import ErrorMessage from '../../../../components/ErrorMessage';
import {
  DOSER_RUNNING,
  DOSER_STOPPED,
} from '../../../../constants/mapConstant';
import RainfallSidebar from './RainfallSidebar';
import CiboLabs from '../../../property/detail/map/ciboLabs/CiboLabs';
import MlaLegend from '../MlaLegend';
import CeresTagSiderbar from './CeresTagSiderbar';

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
  ceresTagData: GeoJsonTypes;
  times: string[];
  isFetchingCeresTag: boolean;
  isErrorCeresTag: boolean;
  displaySelectedDate: string;
  timeSliderValue: number | null;
  setTimeSliderValue: React.Dispatch<SetStateAction<number>>;
  ceresTagId: number | null;
  setCeresTagId: React.Dispatch<SetStateAction<number | null>>;
  setAsOfFrom: React.Dispatch<SetStateAction<string | null>>;
  setAsOfTo: React.Dispatch<SetStateAction<string | null>>;
};

const MapSidebar: React.FC<Props> = ({
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
  const [searchRunningSite, setSearchRunningSite] = useState<any>('');
  const [searchStoppedSite, setSearchStoppedSite] = useState<any>('');
  const [searchAlarmedSite, setSearchAlarmedSite] = useState<any>('');

  const handleSearchOnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    status: string
  ) => {
    switch (status) {
      case DOSER_RUNNING:
        setSearchRunningSite(e.target.value);
        break;
      case DOSER_STOPPED:
        setSearchStoppedSite(e.target.value);
        break;
      default:
        setSearchAlarmedSite(e.target.value);
        break;
    }
  };

  const filteredSites = (siteLocationData: any[], searchText: any) => {
    return siteLocationData.filter((site: any) =>
      site.name.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  useEffect(() => {
    setCiboLabsHide(true);
    setIsFetchingCiboLabs(true);
    setRainfallHide(true);
  }, [property]);

  if (isErrorPropertiesOptions) {
    return <ErrorMessage />;
  }

  return (
    <div>
      <Select
        isClearable
        options={propertiesOptions}
        onChange={(selected) =>
          setProperty(selected ? selected.value : undefined)
        }
        placeholder="Select Property"
        value={propertiesOptions?.find(
          (item: { value: string | undefined }) => item.value === property
        )}
        styles={{
          menu: (provided) => ({ ...provided, zIndex: 9999 }),
          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
        }}
        menuPortalTarget={document.body}
        menuPosition="fixed"
        menuShouldBlockScroll
      />
      <div className="mt-1">
        <CustomCollapse
          headerText="Sites"
          isHide={siteIsHide}
          setIsHide={setSiteIsHide}>
          {siteIsHide && <div>Sites Layer turned off</div>}
          {runningSiteLocations.length > 0 && !siteIsHide && (
            <CustomCollapse2
              headerText="Running"
              iconUrl={runningIcon}
              isHide={runningIsHide}
              setIsHide={setRunningIsHide}
              count={runningSiteLocations.length}>
              <div className="collapse-content-wrapper my-2 ms-2">
                <SearchBox
                  search={searchRunningSite}
                  handleSearchOnChange={(e) =>
                    handleSearchOnChange(e, 'Running')
                  }
                  containerClass="m-0 input-fields-box-shadow"
                />
                <SiteList
                  sites={filteredSites(runningSiteLocations, searchRunningSite)}
                  markerRefs={markerRefs}
                />
              </div>
            </CustomCollapse2>
          )}

          {stoppedSiteLocations.length > 0 && !siteIsHide && (
            <CustomCollapse2
              headerText="Stopped"
              iconUrl={stoppedIcon}
              count={stoppedSiteLocations.length}
              isHide={stoppedIsHide}
              setIsHide={setStoppedIsHide}>
              <div className="collapse-content-wrapper mt-2 ms-2">
                <SearchBox
                  search={searchStoppedSite}
                  handleSearchOnChange={(e) =>
                    handleSearchOnChange(e, 'Stopped')
                  }
                  containerClass="m-0 input-fields-box-shadow"
                />
                <SiteList
                  sites={filteredSites(stoppedSiteLocations, searchStoppedSite)}
                  markerRefs={markerRefs}
                />
              </div>
            </CustomCollapse2>
          )}

          {alarmedSiteLocations.length > 0 && !siteIsHide && (
            <CustomCollapse2
              headerText="Alarmed"
              iconUrl={alarmedIcon}
              count={alarmedSiteLocations.length}
              isHide={alarmedIsHide}
              setIsHide={setAlarmedIsHide}>
              <div className="collapse-content-wrapper mt-2 ms-2">
                <SearchBox
                  search={searchAlarmedSite}
                  handleSearchOnChange={(e) =>
                    handleSearchOnChange(e, 'Alarmed')
                  }
                  containerClass="m-0 input-fields-box-shadow"
                />
                <SiteList
                  sites={filteredSites(alarmedSiteLocations, searchAlarmedSite)}
                  markerRefs={markerRefs}
                />
              </div>
            </CustomCollapse2>
          )}
        </CustomCollapse>

        {!property && (
          <CustomCollapse
            headerText="MLA Boundary"
            isHide={mlaHide}
            setIsHide={setMlaHide}>
            {mlaHide ? (
              <div>MLA Boundary turned off</div>
            ) : (
              <MlaLegend loading={loadingMla} error={errorMla} />
            )}
          </CustomCollapse>
        )}
      </div>

      {property && (
        <>
          {geoJsonLayerArray.length > 0 && (
            <CustomCollapse
              headerText="Map Layers"
              isHide={avenzaMapHide}
              setIsHide={setAvenzaMapHide}>
              {avenzaMapHide ? (
                <div>Map Layers Turned off</div>
              ) : (
                <div>
                  Use the layer toggle in the top-right corner of the map to
                  switch Map Layers on and off.
                </div>
              )}
            </CustomCollapse>
          )}
          <CustomCollapse
            headerText="Rainfall"
            isHide={rainfallHide}
            setIsHide={setRainfallHide}>
            {rainfallHide ? (
              <div>Layer turned off</div>
            ) : (
              <RainfallSidebar
                setDateRange={setDateRange}
                getDateRange={getDateRange}
                rainfallRange={rainfallRange}
                fetchRasterError={fetchRasterError}
                fetchingRaster={fetchingRaster}
                isFetchingRainfall={isFetchingRainfall}
                isErrorRainfall={isErrorRainfall}
              />
            )}
          </CustomCollapse>
          <CustomCollapse
            headerText="Cibo Labs"
            isHide={ciboLabsHide}
            setIsHide={setCiboLabsHide}>
            {ciboLabsHide ? (
              <div>CiboLabs Layer turned off</div>
            ) : (
              <CiboLabs
                ciboLabsData={ciboLabsData}
                isFetchingCiboLabs={isFetchingCiboLabs}
              />
            )}
          </CustomCollapse>

          {property && (
            <CustomCollapse
              headerText="CeresTag Layer"
              isHide={ceresTagHide}
              setIsHide={setCeresTagHide}>
              {ceresTagHide ? (
                <div>CeresTag Layer is turned off</div>
              ) : (
                <CeresTagSiderbar
                  propertyId={Number(property)}
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
              )}
            </CustomCollapse>
          )}
        </>
      )}
    </div>
  );
};

export default MapSidebar;
