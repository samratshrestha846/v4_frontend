import React from 'react';
import { Card } from 'react-bootstrap';
import PageTitle from '@uhub/components/PageTitle';
import { STORAGE_TANK_ADD, STORAGE_TANK_LIST } from '../constants/constant';
import StorageTankForm from './StorageTankForm';
import { StorageTankFormProps } from '../types/StorageTank';

const AddStorageTank: React.FC = () => {
  const title: string = 'Storage Tank';
  const defaultValues: StorageTankFormProps = {
    name: null,
    location_id: null,
    capacity: null,
    current_qty: null,
  };
  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: `${title} list`, path: STORAGE_TANK_LIST, active: false },
          {
            label: `Add ${title}`,
            path: STORAGE_TANK_ADD,
            active: true,
          },
        ]}
        title={`Add ${title}`}
      />
      <Card>
        <Card.Body>
          <StorageTankForm defaultValues={defaultValues} />
        </Card.Body>
      </Card>
    </>
  );
};

export default AddStorageTank;
