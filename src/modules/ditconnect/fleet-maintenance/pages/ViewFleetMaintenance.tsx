import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import PageTitle from '@uhub/components/PageTitle';
import { useParams } from 'react-router-dom';
import CustomLoader from '@uhub/components/CustomLoader';
import ErrorMessage from '@uhub/components/ErrorMessage';
import { prepareDynamicUrl } from '@uhub/helpers';
import AddNewRecord from '@uhub/components/AddNewRecord';
import useModalFeature from '@uhub/hooks/common/useModalFeature';

import {
  FLEET_MAINTENANCE_LIST,
  FLEET_MAINTENANCE_VIEW,
} from '../constants/constant';
import useReadFleetMaintenance from '../hooks/useReadFleetMaintenance';
import FleetMaintenanceInfo from './components/FleetMaintenanceInfo';
import MaintenanceBookingInfo from './components/MaintenanceBookingInfo';

import AddMaintenanceBooking from '../maintenance-booking/pages/AddMaintenanceBooking';

const ViewFleetMaintenance: React.FC = () => {
  const { id } = useParams();

  const title: string = 'Fleet Maintenance';
  const { data, isFetching, isError } = useReadFleetMaintenance(id);
  const { showModal, toggleModal } = useModalFeature();

  if (isFetching || !data) return <CustomLoader />;

  if (isError) return <ErrorMessage />;

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: `${title}s`, path: FLEET_MAINTENANCE_LIST, active: false },
          {
            label: data
              ? `${data?.vehicle?.reg_number} - ${data?.vehicle?.type}`
              : '',
            path: prepareDynamicUrl(FLEET_MAINTENANCE_VIEW, id),
            active: true,
          },
        ]}
        title={`${title} Details`}
      />

      <Card className="tilebox-one">
        <Card.Body>
          {data && <FleetMaintenanceInfo maintenance={data} />}
          {!data?.maintenance_booking && (
            <AddNewRecord
              title="Add Maintenance Booking"
              toggleModal={toggleModal}
            />
          )}
        </Card.Body>
      </Card>

      {data?.maintenance_booking ? (
        <>
          <Row>
            <Col>
              <h4 className="mt-0 text-primary-color fw-semibold">
                Booking Details
              </h4>
            </Col>
          </Row>
          <Card className="tilebox-one">
            <Card.Body>
              <MaintenanceBookingInfo booking={data.maintenance_booking} />
            </Card.Body>
          </Card>
        </>
      ) : null}
      <AddMaintenanceBooking
        showModal={showModal}
        toggleModal={toggleModal}
        maintenanceId={data?.id}
      />
    </>
  );
};

export default ViewFleetMaintenance;
