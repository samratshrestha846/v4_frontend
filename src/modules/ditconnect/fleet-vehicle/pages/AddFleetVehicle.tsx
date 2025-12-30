import React from 'react';
import { Card } from 'react-bootstrap';
import PageTitle from '@uhub/components/PageTitle';
import { FLEET_VEHICLE_ADD, FLEET_VEHICLE_LIST } from '../constants/constant';
import FleetVehicleForm from './FleetVehicleForm';
import { FleetVehicleFormProps } from '../types/FleetVehicle';
import { STATUS_LABEL_ACTIVE } from '../../../../constants/constants';

const AddFleetVehicle: React.FC = () => {
  const title: string = 'Vehicle';
  const defaultValues: FleetVehicleFormProps = {
    next_service_due: null,
    purchased_date: null,
    reg_number: null,
    rego_until: null,
    status: STATUS_LABEL_ACTIVE,
    type: null,
  };
  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: `${title}s`, path: FLEET_VEHICLE_LIST, active: false },
          {
            label: `Add ${title}`,
            path: FLEET_VEHICLE_ADD,
            active: true,
          },
        ]}
        title={`Add ${title}`}
      />
      <Card>
        <Card.Body>
          <FleetVehicleForm defaultValues={defaultValues} />
        </Card.Body>
      </Card>
    </>
  );
};

export default AddFleetVehicle;
