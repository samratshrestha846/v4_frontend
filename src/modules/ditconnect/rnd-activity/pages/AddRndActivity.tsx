import React from 'react';
import { Card } from 'react-bootstrap';
import PageTitle from '@uhub/components/PageTitle';
import { RND_ACTIVITY_ADD, RND_ACTIVITY_LIST } from '../constants/constant';
import RndActivityForm from './RndActivityForm';
import { RndActivityFormProps } from '../types/RndActivity';

const AddRndActivity: React.FC = () => {
  const title: string = 'RndActivity';
  const defaultValues: RndActivityFormProps = {
    section_no: null,
    name: null,
    description: null,
    group: null,
    parent_id: null,
  };
  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: `${title}`, path: RND_ACTIVITY_LIST, active: false },
          {
            label: `Add ${title}`,
            path: RND_ACTIVITY_ADD,
            active: true,
          },
        ]}
        title={`Add ${title}`}
      />
      <Card>
        <Card.Body>
          <RndActivityForm defaultValues={defaultValues} />
        </Card.Body>
      </Card>
    </>
  );
};

export default AddRndActivity;
