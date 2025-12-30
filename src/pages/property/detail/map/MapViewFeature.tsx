import React, { FC, useState, SetStateAction } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import CeresTag from './ceresTag/CeresTag';
import CiboLabs from './ciboLabs/CiboLabs';
import { LabelNumericValue } from '../../../../types/common';
import Rainfall from './rainfall/Rainfall';

type props = {
  ceresTagActive: boolean;
  setCeresTagActive: React.Dispatch<SetStateAction<boolean>>;
  ceresTagData: any;
  isFetchingCeresTag: boolean;
  isErrorCeresTag: boolean;
  times: string[];
  timeSliderValue: any;
  setTimeSliderValue: React.Dispatch<SetStateAction<any>>;
  ceresTagId: any;
  setCeresTagId: React.Dispatch<SetStateAction<number | null>>;
  setAsOfFrom: React.Dispatch<SetStateAction<any>>;
  setAsOfTo: React.Dispatch<SetStateAction<any>>;
  ciboLabsActive: boolean;
  setCiboLabsActive: React.Dispatch<SetStateAction<boolean>>;
  ciboLabsData: any;
  isFetchingCiboLabs: boolean;
  cereTagsOptions?: LabelNumericValue[];
  rainfallActive: boolean;
  setRainfallActive: React.Dispatch<SetStateAction<boolean>>;
  setDateRange: React.Dispatch<SetStateAction<string>>;
  getDateRange: any;
  rainfallRange: number[];
  fetchRasterError: boolean;
  fetchingRaster: boolean;
  isFetchingRainfall: boolean;
  isErrorRainfall: boolean;
  displaySelectedDate: any;
};

const MapViewFeature: FC<props> = ({
  ceresTagData,
  isFetchingCeresTag,
  isErrorCeresTag,
  ceresTagActive,
  setCeresTagActive,
  times,
  timeSliderValue,
  setTimeSliderValue,
  ceresTagId,
  setCeresTagId,
  setAsOfFrom,
  setAsOfTo,
  displaySelectedDate,

  ciboLabsActive,
  setCiboLabsActive,
  ciboLabsData,
  isFetchingCiboLabs,

  cereTagsOptions,
  rainfallActive,
  setRainfallActive,
  setDateRange,
  getDateRange,
  rainfallRange,
  fetchRasterError,
  fetchingRaster,
  isFetchingRainfall,
  isErrorRainfall,
}) => {
  const [activekey, setActiveKey] = useState('0');

  const onButtonClick = (button: string) => {
    if (button === 'rainfall') {
      setRainfallActive((prevState) => !prevState);
      setActiveKey('0');
      setCeresTagActive(false);
      setCiboLabsActive(false);
    }

    if (button === 'ceresTag') {
      setCeresTagActive((prevState) => !prevState);
      setActiveKey('1');
      setRainfallActive(false);
      setCiboLabsActive(false);
    }

    if (button === 'cibolabs') {
      setCiboLabsActive((prevState) => !prevState);
      setActiveKey('2');
      setRainfallActive(false);
      setCeresTagActive(false);
    }
  };

  return (
    <div className="col-md-3">
      <div className="map-feature">
        <h6 className="text-primary mt-0"> Map view features</h6>
        <div className="button-list">
          <button
            type="button"
            className={`btn btn-sm ${rainfallActive ? 'btn-active' : 'btn'} font-12`}
            onClick={() => onButtonClick('rainfall')}>
            <i className="bx bx-cloud-rain" /> Rainfall
          </button>
          <button
            type="submit"
            className={`btn btn-sm ${ceresTagActive ? 'btn-active' : 'btn'} font-12`}
            onClick={() => onButtonClick('ceresTag')}>
            <i className="bx bx-tag" /> Ceres Tag
          </button>
          <button
            type="submit"
            className={`btn btn-sm ${ciboLabsActive ? 'btn-active' : 'btn'} font-12`}
            onClick={() => onButtonClick('cibolabs')}>
            <i className="bx bx-map" /> Cibo Lab
          </button>
        </div>
        <Accordion activeKey={activekey}>
          {rainfallActive && (
            <Accordion.Item eventKey="0" className="mt-2">
              <Accordion.Header className="mt-0">
                <i className="bx bx-cloud-rain me-1" /> Rainfall
              </Accordion.Header>
              <Accordion.Body>
                <Rainfall
                  setDateRange={setDateRange}
                  getDateRange={getDateRange}
                  rainfallRange={rainfallRange}
                  isFetchingRainfall={isFetchingRainfall}
                  isErrorRainfall={isErrorRainfall}
                  fetchRasterError={fetchRasterError}
                  fetchingRaster={fetchingRaster}
                />
              </Accordion.Body>
            </Accordion.Item>
          )}
          {ceresTagActive && (
            <Accordion.Item eventKey="1" className="mt-2">
              <Accordion.Header className="mt-0">
                <i className="bx bx-tag me-1" />
                Ceres Tag
              </Accordion.Header>
              <Accordion.Body>
                <CeresTag
                  times={times}
                  timeSliderValue={timeSliderValue}
                  setTimeSliderValue={setTimeSliderValue}
                  ceresTagId={ceresTagId}
                  setCeresTagId={setCeresTagId}
                  setAsOfFrom={setAsOfFrom}
                  setAsOfTo={setAsOfTo}
                  ceresTagsOptions={cereTagsOptions}
                  ceresTagData={ceresTagData}
                  isFetchingCeresTag={isFetchingCeresTag}
                  isErrorCeresTag={isErrorCeresTag}
                  displaySelectedDate={displaySelectedDate}
                />
              </Accordion.Body>
            </Accordion.Item>
          )}
          {ciboLabsActive && (
            <Accordion.Item eventKey="2" className="mt-2">
              <Accordion.Header className="mt-0">
                <i className="bx bx-map me-1" /> Cibo Lab
              </Accordion.Header>
              <Accordion.Body>
                <CiboLabs
                  ciboLabsData={ciboLabsData}
                  isFetchingCiboLabs={isFetchingCiboLabs}
                />
              </Accordion.Body>
            </Accordion.Item>
          )}
        </Accordion>
      </div>
    </div>
  );
};

export default MapViewFeature;
