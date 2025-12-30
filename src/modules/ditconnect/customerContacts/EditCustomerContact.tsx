import React from 'react';
import { Card } from 'react-bootstrap';
import PageTitle from '@uhub/components/PageTitle';
import { useParams } from 'react-router-dom';
import CustomLoader from '@uhub/components/CustomLoader';
import ErrorMessage from '@uhub/components/ErrorMessage';
import { prepareDynamicUrl } from '@uhub/helpers';
import {
  CUSTOMER_CONTACT_EDIT,
  CUSTOMER_CONTACT_LIST,
} from './constants/constant';
import CustomerContactForm from './CustomerContactForm';
import useReadCustomerContact from './hooks/useReadCustomerContact';

const EditCustomerContact: React.FC = () => {
  const { id } = useParams();

  const title: string = 'Customer Contact';
  const { data, isFetching, isError } = useReadCustomerContact(id);

  if (isFetching || !data) return <CustomLoader />;

  if (isError) return <ErrorMessage />;

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: `${title}`, path: CUSTOMER_CONTACT_LIST, active: false },
          {
            label: `Edit ${title}`,
            path: prepareDynamicUrl(CUSTOMER_CONTACT_EDIT, id),
            active: true,
          },
        ]}
        title={`Edit ${title}`}
      />
      <Card>
        <Card.Body>
          {data && (
            <CustomerContactForm
              defaultValues={{
                customer: data.customer,
                phone_number: data.phone_number,
                address: data.address,
                details: data.details,
              }}
            />
          )}
        </Card.Body>
      </Card>
    </>
  );
};

export default EditCustomerContact;
