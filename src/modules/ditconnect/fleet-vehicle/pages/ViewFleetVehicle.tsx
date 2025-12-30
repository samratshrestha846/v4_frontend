import React from 'react';
import PageTitle from '@uhub/components/PageTitle';
import { useParams } from 'react-router-dom';
import CustomLoader from '@uhub/components/CustomLoader';
import ErrorMessage from '@uhub/components/ErrorMessage';
import { prepareDynamicUrl } from '@uhub/helpers';
import { FLEET_VEHICLE_LIST, FLEET_VEHICLE_VIEW } from '../constants/constant';
import useReadFleetVehicle from '../hooks/useReadFleetVehicle';
import FleetVehicleInfo from './components/FleetVehicleInfo';
import ListVehicleMaintenances from './components/ListVehicleMaintenances';

const ViewFleetVehicle: React.FC = () => {
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
            label: data?.reg_number ?? title,
            path: prepareDynamicUrl(FLEET_VEHICLE_VIEW, id),
            active: true,
          },
        ]}
        title={`${title} Details`}
      />

      <FleetVehicleInfo vehicle={data} />

      {data?.maintenances && (
        <ListVehicleMaintenances maintenances={data.maintenances} />
      )}
    </>
  );
};

export default ViewFleetVehicle;
