import React from 'react';
import { Card } from 'react-bootstrap';
import PageTitle from '@uhub/components/PageTitle';
import { useParams } from 'react-router-dom';
import CustomLoader from '@uhub/components/CustomLoader';
import ErrorMessage from '@uhub/components/ErrorMessage';
import { prepareDynamicUrl } from '@uhub/helpers';
import { RESPONSE_SET_EDIT, RESPONSE_SET_LIST } from '../constants/constant';
import ResponseSetForm from './ResponseSetForm';
import useReadResponseSet from '../hooks/useReadResponseSet';

const EditResponseSet: React.FC = () => {
  const { id } = useParams();

  const title: string = 'Response Set';
  const { data, isFetching, isError } = useReadResponseSet(id);

  if (isFetching || !data) return <CustomLoader />;

  if (isError) return <ErrorMessage />;

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: `${title}`, path: RESPONSE_SET_LIST, active: false },
          {
            label: `Edit ${title}`,
            path: prepareDynamicUrl(RESPONSE_SET_EDIT, id),
            active: true,
          },
        ]}
        title={`Edit ${title}`}
      />
      <Card>
        <Card.Body>
          {data && <ResponseSetForm defaultValues={data} />}
        </Card.Body>
      </Card>
    </>
  );
};

export default EditResponseSet;
