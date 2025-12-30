import React from 'react';
import { Card } from 'react-bootstrap';
import PageTitle from '@uhub/components/PageTitle';
import { PRODUCTION_ADD, PRODUCTION_LIST } from '../constants/constant';
import ProductionForm from './ProductionForm';
import { ProductionFormProps } from '../types/Production';

const AddProduction: React.FC = () => {
  const title: string = 'Production';
  const defaultValues: ProductionFormProps = {
    batch_number: '',
    supplement_id: null,
    qty: null,
    location_id: null,
    date: new Date(),
    notes: '',
    production_order_no: '',
    is_jug_tested: false,
  };
  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: `${title}`, path: PRODUCTION_LIST, active: false },
          {
            label: `Add ${title}`,
            path: PRODUCTION_ADD,
            active: true,
          },
        ]}
        title={`Add ${title}`}
      />
      <Card>
        <Card.Body>
          <ProductionForm defaultValues={defaultValues} />
        </Card.Body>
      </Card>
    </>
  );
};

export default AddProduction;
