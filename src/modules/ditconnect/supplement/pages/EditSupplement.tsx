import React from 'react';
import { Card } from 'react-bootstrap';
import PageTitle from '@uhub/components/PageTitle';
import { useParams } from 'react-router-dom';
import CustomLoader from '@uhub/components/CustomLoader';
import ErrorMessage from '@uhub/components/ErrorMessage';
import { prepareDynamicUrl } from '@uhub/helpers';
import { SUPPLEMENT_EDIT, SUPPLEMENT_LIST } from '../constants/constant';
import SupplementForm from './SupplementForm';
import useReadSupplement from '../hooks/useReadSupplement';

const EditSupplement: React.FC = () => {
  const { id } = useParams();

  const title: string = 'Supplement';
  const { data, isFetching, isError } = useReadSupplement(id);

  if (isFetching || !data) return <CustomLoader />;

  if (isError) return <ErrorMessage />;

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: `${title}`, path: SUPPLEMENT_LIST, active: false },
          {
            label: `Edit ${title}`,
            path: prepareDynamicUrl(SUPPLEMENT_EDIT, id),
            active: true,
          },
        ]}
        title={`Edit ${title}`}
      />
      <Card>
        <Card.Body>{data && <SupplementForm defaultValues={data} />}</Card.Body>
      </Card>
    </>
  );
};

export default EditSupplement;
