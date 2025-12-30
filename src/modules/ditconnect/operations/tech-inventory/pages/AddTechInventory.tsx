import React from 'react';
import { Card } from 'react-bootstrap';
import PageTitle from '@uhub/components/PageTitle';
import { TECH_INVENTORY_ADD, TECH_INVENTORY_LIST } from '../constants/constant';
import TechInventoryForm from './TechInventoryForm';
import {
  EMPTY_LOCATION_FORM,
  TechInventoryFormProps,
} from '../types/TechInventory';

const AddTechInventory: React.FC = () => {
  const title: string = 'Tech Inventory';
  const defaultValues: TechInventoryFormProps = {
    name: '',
    sku: '',
    type: '',
    is_udose_item: false,
    locations: [EMPTY_LOCATION_FORM],
  };
  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: `${title}`, path: TECH_INVENTORY_LIST, active: false },
          {
            label: `Add ${title}`,
            path: TECH_INVENTORY_ADD,
            active: true,
          },
        ]}
        title={`Add ${title}`}
      />
      <Card>
        <Card.Body>
          <TechInventoryForm defaultValues={defaultValues} />
        </Card.Body>
      </Card>
    </>
  );
};

export default AddTechInventory;
