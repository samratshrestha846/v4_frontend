import React from 'react';
import { Card } from 'react-bootstrap';
import PageTitle from '@uhub/components/PageTitle';
import { useParams } from 'react-router-dom';
import CustomLoader from '@uhub/components/CustomLoader';
import ErrorMessage from '@uhub/components/ErrorMessage';
import { prepareDynamicUrl } from '@uhub/helpers';
import { PRODUCTION_EDIT, PRODUCTION_LIST } from '../constants/constant';
import ProductionForm from './ProductionForm';
import useReadProduction from '../hooks/useReadProduction';

const EditProduction: React.FC = () => {
  const { id } = useParams();

  const title: string = 'Production';
  const { data, isFetching, isError } = useReadProduction(id);

  if (isFetching || !data) return <CustomLoader />;

  if (isError) return <ErrorMessage />;

  const formattedData = {
    ...data,
    date: new Date(data.date),
    is_jug_tested: Boolean(data.is_jug_tested),
  };
  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: `${title}`, path: PRODUCTION_LIST, active: false },
          {
            label: `Edit ${title}`,
            path: prepareDynamicUrl(PRODUCTION_EDIT, id),
            active: true,
          },
        ]}
        title={`Edit ${title}`}
      />
      <Card>
        <Card.Body>
          {data && <ProductionForm defaultValues={formattedData} />}
        </Card.Body>
      </Card>
    </>
  );
};

export default EditProduction;
