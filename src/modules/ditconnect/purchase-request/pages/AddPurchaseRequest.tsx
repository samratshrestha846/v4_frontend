import React from 'react';
import { Card } from 'react-bootstrap';
import PageTitle from '@uhub/components/PageTitle';
import {
  PURCHASE_REQUEST_ADD,
  PURCHASE_REQUEST_LIST,
} from '../constants/constant';
import PurchaseRequestForm from './PurchaseRequestForm';
import { PurchaseRequestFormProps } from '../types/PurchaseRequest';

const AddPurchaseRequest: React.FC = () => {
  const title: string = 'Purchase Request';
  const defaultValues: PurchaseRequestFormProps = {
    title: null,
    requested_to: null,
    required_by_date: null,
    supplier_id: null,
    priority: null,
    delivery_location: null,
    delivery_method: null,
    online_order_url: null,
    estimated_payment_date: null,
    remarks: null,
    total_price: 0,
    quotation: [],
    invoice: [],
    contract: [],
    purchase_request_items: [],
  };
  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: `${title}`, path: PURCHASE_REQUEST_LIST, active: false },
          {
            label: `Add ${title}`,
            path: PURCHASE_REQUEST_ADD,
            active: true,
          },
        ]}
        title={`Add ${title}`}
      />
      <Card>
        <Card.Body>
          <PurchaseRequestForm defaultValues={defaultValues} />
        </Card.Body>
      </Card>
    </>
  );
};

export default AddPurchaseRequest;
