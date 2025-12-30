import React from 'react';
import { Card } from 'react-bootstrap';
import PageTitle from '@uhub/components/PageTitle';
import { useParams } from 'react-router-dom';
import CustomLoader from '@uhub/components/CustomLoader';
import ErrorMessage from '@uhub/components/ErrorMessage';
import { prepareDynamicUrl } from '@uhub/helpers';
import {
  INVENTORY_LOCATION_EDIT,
  INVENTORY_LOCATION_LIST,
} from '../constants/constant';
import InventoryLocationForm from './InventoryLocationForm';
import useReadInventoryLocation from '../hooks/useReadInventoryLocation';

const EditInventoryLocation: React.FC = () => {
  const { id } = useParams();

  const title: string = 'Inventory Location';
  const { data, isFetching, isError } = useReadInventoryLocation(id);

  if (isFetching || !data) return <CustomLoader />;

  if (isError) return <ErrorMessage />;

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: `${title}`, path: INVENTORY_LOCATION_LIST, active: false },
          {
            label: `Edit ${title}`,
            path: prepareDynamicUrl(INVENTORY_LOCATION_EDIT, id),
            active: true,
          },
        ]}
        title={`Edit ${title}`}
      />
      <Card>
        <Card.Body>
          {data && <InventoryLocationForm defaultValues={data} />}
        </Card.Body>
      </Card>
    </>
  );
};

export default EditInventoryLocation;
