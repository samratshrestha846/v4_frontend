/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { can } from '../../../../helpers/checkPermission';
import { READ_DEVICE, READ_USER } from '../../../../constants/permissions';
import SERVICE_TYPE_CONSTANTS from '../../../../constants/ServiceType';
import initialStoreState from '../../../../types/redux/store-type';
import { DOSING_MODE } from '../../../../constants/udoseSettings';
import { firstCharOfWords, prepareDynamicUrl } from '../../../../helpers';
import {
  DEVICE_VIEW,
  PROPERTY_VIEW,
  USER_VIEW,
} from '../../../../constants/path';
import { Site } from '../../../../types/site';
import CircleNameInitials from '../../../../components/CircleNameInitials';
import { Supplement } from '../../../../types/supplements/supplement';
import SiteSupplements from '../../components/SiteSupplements';

const DetailInfo: React.FC = () => {
  const canReadDevice = can(READ_DEVICE);
  const canReadUser = can(READ_USER);
  const canReadProperty = can(PROPERTY_VIEW);

  const { siteDetail }: { siteDetail: Site } = useSelector(
    (state: initialStoreState) => state?.Site
  );

  const nameInitialCharacters = (
    firstName: string,
    lastName: string
  ): string => {
    return `${firstCharOfWords(firstName)[0]}${firstCharOfWords(lastName)[0]}`.toUpperCase();
  };

  return (
    <Row>
      <Col xs={6} md={4}>
        <h6 className="font-14">Customer</h6>
        <p className="text-sm lh-150">
          {siteDetail?.customer_property?.customer?.business_name ?? '-'}
        </p>
      </Col>

      <Col xs={6} md={4}>
        <h6 className="font-14">Property</h6>

        <p className="text-sm lh-150">
          {siteDetail?.customer_property?.name && canReadProperty ? (
            <Link
              to={prepareDynamicUrl(
                PROPERTY_VIEW,
                siteDetail?.customer_property.id
              )}
              target="_blank">
              {siteDetail?.customer_property?.name}
            </Link>
          ) : (
            siteDetail?.customer_property?.name
          )}
        </p>
      </Col>

      <Col xs={6} md={4}>
        <h6 className="font-14">Region</h6>
        <p className="text-sm lh-150">
          {siteDetail?.customer_property?.region?.name ?? '-'}
        </p>
      </Col>

      <Col xs={6} md={4}>
        <h6 className="font-14">Service Type</h6>
        <p className="text-sm lh-150">
          {SERVICE_TYPE_CONSTANTS[siteDetail?.credit_type] ?? '-'}
        </p>
      </Col>

      <Col xs={6} md={4}>
        <h6 className="font-14">Supplements</h6>
        {siteDetail?.site_supplement ? (
          <SiteSupplements
            supplement={siteDetail.site_supplement.supplement}
            traceSupplements={
              [
                ...(siteDetail?.site_supplement?.nutrients?.map(
                  (element) => element.supplement
                ) ?? []),
              ] as Supplement[]
            }
            showConcentration
            itemClass=""
          />
        ) : (
          '-'
        )}
      </Col>

      <Col xs={6} md={4}>
        <h6 className="font-14">Device Serial No.</h6>
        {siteDetail?.device && canReadDevice ? (
          <Link
            to={prepareDynamicUrl(DEVICE_VIEW, siteDetail?.device?.id)}
            className="icon-font-1"
            target="_blank">
            {siteDetail?.device?.serial_number ?? '-'}
          </Link>
        ) : (
          <p className="text-sm lh-150">
            {siteDetail?.device?.serial_number ?? '-'}
          </p>
        )}
      </Col>

      <Col xs={6} md={4}>
        <h6 className="font-14">Dosing Mode</h6>
        <p className="text-sm lh-150">
          {DOSING_MODE[siteDetail.latest_setting?.dosing_mode] ?? '-'}
        </p>
      </Col>

      <Col xs={6} md={4}>
        <h6 className="font-14">Dose Info</h6>
        <p className="text-sm lh-150">
          {`${
            siteDetail?.latest_setting?.target_dose
              ? `${siteDetail?.latest_setting?.target_dose}`
              : '-'
          }  mL / ${
            siteDetail?.latest_setting?.trigger_point
              ? `${siteDetail?.latest_setting?.trigger_point}`
              : '-'
          } L`}
        </p>
      </Col>

      <Col xs={6} md={4}>
        <h6 className="font-14">Tank Current Level</h6>
        <p className="text-sm lh-150"> {siteDetail?.nutrient_level ?? '-'} %</p>
      </Col>

      <Col xs={6} md={4}>
        <h6 className="font-14">Tank Capacity</h6>
        <p className="text-sm lh-150">
          {siteDetail?.latest_setting?.nutrient_tank_capacity ?? '-'} L
        </p>
      </Col>

      <Col xs={6} md={4}>
        <h6 className="font-14">Bore Type</h6>
        <p className="text-sm lh-150">{siteDetail?.bore_type ?? '-'}</p>
      </Col>

      <Col xs={6} md={4}>
        <h6 className="font-14">Cage No.</h6>
        <p className="text-sm lh-150">
          {siteDetail?.cage_serial_number ?? '-'}
        </p>
      </Col>

      <Col xs={6} md={4}>
        <h6 className="font-14">Trailer No.</h6>
        <p className="text-sm lh-150">{siteDetail?.trailer_no ?? '-'}</p>
      </Col>

      <Col xs={6} md={4}>
        <h6 className="font-14">
          {siteDetail?.customer_property?.customer_property_managers?.length ===
          1
            ? 'Property Manager'
            : 'Property Managers'}
        </h6>
        <div className="d-flex justify-content-start align-items-center">
          {siteDetail?.customer_property?.customer_property_managers
            ? siteDetail?.customer_property?.customer_property_managers?.map(
                (item, index) =>
                  canReadUser ? (
                    <Link
                      key={item.id}
                      to={prepareDynamicUrl(USER_VIEW, item.id)}
                      target="_blank">
                      <CircleNameInitials
                        fullName={`${item.first_name} ${item.last_name}`}
                        index={index}
                        initialCharacters={nameInitialCharacters(
                          item.first_name,
                          item.last_name
                        )}
                      />
                    </Link>
                  ) : (
                    <CircleNameInitials
                      fullName={`${item.first_name} ${item.last_name}`}
                      key={item.id}
                      index={index}
                      initialCharacters={nameInitialCharacters(
                        item.first_name,
                        item.last_name
                      )}
                    />
                  )
              )
            : '-'}
        </div>
      </Col>

      <Col xs={6} md={4}>
        <h6 className="font-14">
          {siteDetail?.customer_property?.territory_managers?.length === 1
            ? 'Territory Manager'
            : 'Territory Managers'}
        </h6>
        <div className="d-flex justify-content-start align-items-center">
          {siteDetail?.customer_property?.territory_managers
            ? siteDetail?.customer_property?.territory_managers?.map(
                (item, index) =>
                  canReadUser ? (
                    <Link
                      key={item.id}
                      to={prepareDynamicUrl(USER_VIEW, item.id)}
                      target="_blank">
                      <CircleNameInitials
                        fullName={`${item.first_name} ${item.last_name}`}
                        key={item.id}
                        index={index}
                        initialCharacters={nameInitialCharacters(
                          item.first_name,
                          item.last_name
                        )}
                      />
                    </Link>
                  ) : (
                    <CircleNameInitials
                      fullName={`${item.first_name} ${item.last_name}`}
                      key={item.id}
                      index={index}
                      initialCharacters={nameInitialCharacters(
                        item.first_name,
                        item.last_name
                      )}
                    />
                  )
              )
            : '-'}
        </div>
      </Col>
    </Row>
  );
};

export default DetailInfo;
