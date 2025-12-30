import React from 'react';
import { Card } from 'react-bootstrap';
import PageTitle from '@uhub/components/PageTitle';
import { SUPPLIER_ADD, SUPPLIER_LIST } from '../constants/constant';
import SupplierForm from './SupplierForm';
import { SupplierFormProps } from '../types/Supplier';

const AddSupplier: React.FC = () => {
  const title: string = 'Supplier';
  const defaultValues: SupplierFormProps = {
    name: null,
    phone: null,
    email: null,
    website: null,
    location: null,
  };

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: `${title}`, path: SUPPLIER_LIST, active: false },
          {
            label: `Add ${title}`,
            path: SUPPLIER_ADD,
            active: true,
          },
        ]}
        title={`Add ${title}`}
      />
      <Card>
        <Card.Body>
          <SupplierForm defaultValues={defaultValues} />
        </Card.Body>
      </Card>
    </>
  );
};

export default AddSupplier;
