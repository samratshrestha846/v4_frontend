import React from 'react';
import { Card } from 'react-bootstrap';
import PageTitle from '@uhub/components/PageTitle';
import { useParams } from 'react-router-dom';
import CustomLoader from '@uhub/components/CustomLoader';
import ErrorMessage from '@uhub/components/ErrorMessage';
import { prepareDynamicUrl } from '@uhub/helpers';
import { FLEET_VEHICLE_EDIT, FLEET_VEHICLE_LIST } from '../constants/constant';
import FleetVehicleForm from './FleetVehicleForm';
import useReadFleetVehicle from '../hooks/useReadFleetVehicle';
import { FleetVehicleFormProps } from '../types/FleetVehicle';

const EditFleetVehicle: React.FC = () => {
  const { id } = useParams();
  const title: string = 'Vehicle';
  const { data, isFetching, isError } = useReadFleetVehicle(id);

  if (isFetching || !data) return <CustomLoader />;

  if (isError) return <ErrorMessage />;

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: `${title}s`, path: FLEET_VEHICLE_LIST, active: false },
          {
            label: `Edit ${title}`,
            path: prepareDynamicUrl(FLEET_VEHICLE_EDIT, id),
            active: true,
          },
        ]}
        title={`Edit ${title}`}
      />
      <Card>
        <Card.Body>
          {data && (
            <FleetVehicleForm defaultValues={data as FleetVehicleFormProps} />
          )}
        </Card.Body>
      </Card>
    </>
  );
};

export default EditFleetVehicle;
