import React from 'react';
import { Card } from 'react-bootstrap';
import PageTitle from '@uhub/components/PageTitle';
import CustomerContactForm from './CustomerContactForm';
import { CustomerContactFormProps } from './types/customerContact';
import {
  CUSTOMER_CONTACT_ADD,
  CUSTOMER_CONTACT_LIST,
} from './constants/constant';

const AddCustomerContact: React.FC = () => {
  const title: string = 'Customer Contact';
  const defaultValues: CustomerContactFormProps = {
    customer: '',
    phone_number: '',
    address: null,
    details: null,
  };
  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: `${title}`, path: CUSTOMER_CONTACT_LIST, active: false },
          {
            label: `Add ${title}`,
            path: CUSTOMER_CONTACT_ADD,
            active: true,
          },
        ]}
        title={`Add ${title}`}
      />
      <Card>
        <Card.Body>
          <CustomerContactForm defaultValues={defaultValues} />
        </Card.Body>
      </Card>
    </>
  );
};

export default AddCustomerContact;
