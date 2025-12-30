import React from 'react';
import { Card } from 'react-bootstrap';
import PageTitle from '@uhub/components/PageTitle';
import { SALES_ORDER_ADD, SALES_ORDER_LIST } from '../constants/constant';
import SalesOrderForm from './SalesOrderForm';
import { SalesOrderFormProps } from '../types/SalesOrder';

const AddSalesOrder: React.FC = () => {
  const title: string = 'Sales Order';
  const defaultValues: SalesOrderFormProps = {
    customer: {
      customer_id: 0,
      property_id: 0,
      name: '',
      property_name: '',
      identifier: '',
      email: '',
      phone: '',
    },
    products: [],
    additional_items: [],
    udose_items: [],
    total: null,
  };
  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: `${title}`, path: SALES_ORDER_LIST, active: false },
          {
            label: `Add ${title}`,
            path: SALES_ORDER_ADD,
            active: true,
          },
        ]}
        title={`Add ${title}`}
      />
      <Card>
        <Card.Body>
          <SalesOrderForm defaultValues={defaultValues} />
        </Card.Body>
      </Card>
    </>
  );
};

export default AddSalesOrder;
