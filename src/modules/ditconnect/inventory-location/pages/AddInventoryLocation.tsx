import React from 'react';
import { Card } from 'react-bootstrap';
import PageTitle from '@uhub/components/PageTitle';
import {
  INVENTORY_LOCATION_ADD,
  INVENTORY_LOCATION_LIST,
} from '../constants/constant';
import InventoryLocationForm from './InventoryLocationForm';
import { InventoryLocationFormProps } from '../types/InventoryLocation';

const AddInventoryLocation: React.FC = () => {
  const title: string = 'Inventory Location';
  const defaultValues: InventoryLocationFormProps = {
    name: null,
    state: null,
    is_production_facility: 0,
  };
  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: `${title}`, path: INVENTORY_LOCATION_LIST, active: false },
          {
            label: `Add ${title}`,
            path: INVENTORY_LOCATION_ADD,
            active: true,
          },
        ]}
        title={`Add ${title}`}
      />
      <Card>
        <Card.Body>
          <InventoryLocationForm defaultValues={defaultValues} />
        </Card.Body>
      </Card>
    </>
  );
};

export default AddInventoryLocation;
