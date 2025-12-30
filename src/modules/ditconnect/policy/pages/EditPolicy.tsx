import React from 'react';
import { Card } from 'react-bootstrap';
import PageTitle from '@uhub/components/PageTitle';
import { useParams } from 'react-router-dom';
import CustomLoader from '@uhub/components/CustomLoader';
import ErrorMessage from '@uhub/components/ErrorMessage';
import { prepareDynamicUrl } from '@uhub/helpers';
import { POLICY_EDIT, POLICY_LIST } from '../constants/constant';
import PolicyForm from './PolicyForm';
import useReadPolicy from '../hooks/useReadPolicy';

const EditPolicy: React.FC = () => {
  const { id } = useParams();

  const title: string = 'Policy';
  const { data, isFetching, isError } = useReadPolicy(id);

  if (isFetching || !data) return <CustomLoader />;

  if (isError) return <ErrorMessage />;

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: `${title}`, path: POLICY_LIST, active: false },
          {
            label: `Edit ${title}`,
            path: prepareDynamicUrl(POLICY_EDIT, id),
            active: true,
          },
        ]}
        title={`Edit ${title}`}
      />
      <Card>
        <Card.Body>{data && <PolicyForm defaultValues={data} />}</Card.Body>
      </Card>
    </>
  );
};

export default EditPolicy;
