import React from 'react';
import { Card } from 'react-bootstrap';
import PageTitle from '@uhub/components/PageTitle';
import { RESPONSE_SET_ADD, RESPONSE_SET_LIST } from '../constants/constant';
import ResponseSetForm from './ResponseSetForm';
import { ResponseSetFormProps } from '../types/ResponseSet';

const AddResponseSet: React.FC = () => {
  const title: string = 'Response Set';
  const defaultValues: ResponseSetFormProps = {
    name: null,
    type: null,
    items: [],
  };
  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: `${title}`, path: RESPONSE_SET_LIST, active: false },
          {
            label: `Add ${title}`,
            path: RESPONSE_SET_ADD,
            active: true,
          },
        ]}
        title={`Add ${title}`}
      />
      <Card>
        <Card.Body>
          <ResponseSetForm defaultValues={defaultValues} />
        </Card.Body>
      </Card>
    </>
  );
};

export default AddResponseSet;
