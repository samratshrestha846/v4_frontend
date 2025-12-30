import React from 'react';
import { Card } from 'react-bootstrap';
import PageTitle from '@uhub/components/PageTitle';
import { POLICY_ADD, POLICY_LIST } from '../constants/constant';
import PolicyForm from './PolicyForm';
import { PolicyFormProps } from '../types/Policy';

const AddPolicy: React.FC = () => {
  const title: string = 'Policy';
  const defaultValues: PolicyFormProps = {
    title: null,
    file: null,
  };
  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: `${title}`, path: POLICY_LIST, active: false },
          {
            label: `Add ${title}`,
            path: POLICY_ADD,
            active: true,
          },
        ]}
        title={`Add ${title}`}
      />
      <Card>
        <Card.Body>
          <PolicyForm defaultValues={defaultValues} />
        </Card.Body>
      </Card>
    </>
  );
};

export default AddPolicy;
