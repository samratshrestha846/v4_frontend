import React from 'react';
import { Card } from 'react-bootstrap';
import PageTitle from '@uhub/components/PageTitle';
import { SUPPLEMENT_ADD, SUPPLEMENT_LIST } from '../constants/constant';
import SupplementForm from './SupplementForm';
import { SupplementFormProps } from '../types/Supplement';

const AddSupplement: React.FC = () => {
  const title: string = 'Supplement';
  const defaultValues: SupplementFormProps = {
    name: null,
    slug: null,
    group: null,
    type: null,
    tags: [],
    status: null,
  };
  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: `${title}`, path: SUPPLEMENT_LIST, active: false },
          {
            label: `Add ${title}`,
            path: SUPPLEMENT_ADD,
            active: true,
          },
        ]}
        title={`Add ${title}`}
      />
      <Card>
        <Card.Body>
          <SupplementForm defaultValues={defaultValues} />
        </Card.Body>
      </Card>
    </>
  );
};

export default AddSupplement;
