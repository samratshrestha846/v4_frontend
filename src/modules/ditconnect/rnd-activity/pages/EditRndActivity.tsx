import React from 'react';
import { Card } from 'react-bootstrap';
import PageTitle from '@uhub/components/PageTitle';
import { useParams } from 'react-router-dom';
import CustomLoader from '@uhub/components/CustomLoader';
import ErrorMessage from '@uhub/components/ErrorMessage';
import { prepareDynamicUrl } from '@uhub/helpers';
import { RND_ACTIVITY_EDIT, RND_ACTIVITY_LIST } from '../constants/constant';
import { RndActivityFormProps } from '../types/RndActivity';
import RndActivityForm from './RndActivityForm';
import useReadRndActivity from '../hooks/useReadRndActivity';

const EditRndActivity: React.FC = () => {
  const { id } = useParams();

  const title: string = 'RndActivity';
  const { data, isFetching, isError } = useReadRndActivity(id);

  if (isFetching || !data) return <CustomLoader />;

  if (isError) return <ErrorMessage />;

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: `${title}`, path: RND_ACTIVITY_LIST, active: false },
          {
            label: `Edit ${title}`,
            path: prepareDynamicUrl(RND_ACTIVITY_EDIT, id),
            active: true,
          },
        ]}
        title={`Edit ${title}`}
      />
      <Card>
        <Card.Body>
          {data && (
            <RndActivityForm defaultValues={data as RndActivityFormProps} />
          )}
        </Card.Body>
      </Card>
    </>
  );
};

export default EditRndActivity;
