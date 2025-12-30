/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Card } from 'react-bootstrap';
import moment from 'moment';
import {
  CERES_TAG_FIRMWARE_VERSION_CERESTRACE_OR_CERESRANCH_NEW,
  CERES_TAG_FIRMWARE_VERSION_CERESTRACE_OR_CERESRANCH_OLD,
  CERES_TAG_FIRMWARE_VERSION_CERESWILD_NEW,
  CERES_TAG_FIRMWARE_VERSION_CERESWILD_OLD,
  LOCATION_ACCURACY,
} from '../../../../../constants/ceresTagConstants';
import PopUpTableContent from './PopUpTableContent';
import PopUpTableContentNew from './PopUpTableContentNew';
import {
  CeresTagNewObservationFeatureProperty,
  CeresTagObservationFeatureProperty,
  CeresTagWildObservationFeatureProperty,
} from '../../../../../types/ceresTag/ceresTag';
import PopUpTableContentWild from './PopUpTableContentWild';

const CeresTagPopUp = (feature: any) => {
  const longitude =
    feature?.feature.geometry.coordinates[0]?.toFixed(4) ?? 'N/A';
  const latitude =
    feature?.feature.geometry.coordinates[1]?.toFixed(4) ?? 'N/A';
  return (
    <Card>
      <Card.Header>
        <h5 className="text-primary fw-bold m-0">
          VID: {feature?.feature.properties.vid}
        </h5>
      </Card.Header>
      <Card.Body>
        <div className="d-flex flex-column gap-2 ">
          <div className="d-flex gap-2 align-items-center">
            <i className="bx bx-map-pin text-primary font-16" />
            <div className="d-flex flex-column gap-0">
              <div className="text-black-50 fw-bold">
                Lat:{' '}
                <span className="text-black fw-bold me-1 ">{latitude}</span>
                Lon: <span className="text-black fw-bold">{longitude}</span>
                &nbsp;
              </div>
              <div className="text-black-50 fw-bold">
                Accuracy:{' '}
                <span className="text-black fw-bold">
                  {
                    LOCATION_ACCURACY[
                      feature?.feature.properties?.Location_Accuracy
                    ]
                  }
                </span>
              </div>
            </div>
          </div>
          <div className="d-flex gap-2 align-items-center">
            <i className="bx bxs-thermometer text-danger fw-bold font-16" />
            <div className="d-flex gap-1 align-items-end  text-black fw-bold">
              {feature?.feature.properties?.Temperature}&deg;C
              <div className="font-10 text-muted fw-normal">
                (Device Temperature)
              </div>
            </div>
          </div>
          <div>
            {feature?.feature.properties?.firmware_version ===
              CERES_TAG_FIRMWARE_VERSION_CERESTRACE_OR_CERESRANCH_OLD && (
              <PopUpTableContent data={feature?.feature.properties} />
            )}

            {feature?.feature.properties?.firmware_version ===
              CERES_TAG_FIRMWARE_VERSION_CERESTRACE_OR_CERESRANCH_NEW && (
              <PopUpTableContentNew
                data={
                  feature?.feature
                    .properties as CeresTagNewObservationFeatureProperty
                }
              />
            )}

            {feature?.feature.properties?.firmware_version ===
              CERES_TAG_FIRMWARE_VERSION_CERESWILD_OLD && (
              <PopUpTableContent
                data={
                  feature?.feature
                    .properties as CeresTagObservationFeatureProperty
                }
              />
            )}

            {feature?.feature.properties?.firmware_version ===
              CERES_TAG_FIRMWARE_VERSION_CERESWILD_NEW && (
              <PopUpTableContentWild
                data={
                  feature?.feature
                    .properties as CeresTagWildObservationFeatureProperty
                }
              />
            )}
          </div>
        </div>
      </Card.Body>
      <Card.Footer className="p-1">
        <div role="alert" className="fade mb-1 alert alert-warning show">
          <p className="text-warning m-0">
            Last seen -{' '}
            {moment(feature?.feature.properties.datetime).calendar()}
          </p>
        </div>
      </Card.Footer>
    </Card>
  );
};

export default CeresTagPopUp;
