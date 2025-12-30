import React from 'react';
import { Card } from 'react-bootstrap';
import PageTitle from '@uhub/components/PageTitle';
import { useParams } from 'react-router-dom';
import CustomLoader from '@uhub/components/CustomLoader';
import ErrorMessage from '@uhub/components/ErrorMessage';
import { prepareDynamicUrl } from '@uhub/helpers';
import { SUPPLIER_EDIT, SUPPLIER_LIST } from '../constants/constant';
import SupplierForm from './SupplierForm';
import useReadSupplier from '../hooks/useReadSupplier';

const EditSupplier: React.FC = () => {
  const { id } = useParams();

  const title: string = 'Supplier';
  const { data, isFetching, isError } = useReadSupplier(id);

  if (isFetching || !data) return <CustomLoader />;

  if (isError) return <ErrorMessage />;

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: `${title}`, path: SUPPLIER_LIST, active: false },
          {
            label: `Edit ${title}`,
            path: prepareDynamicUrl(SUPPLIER_EDIT, id),
            active: true,
          },
        ]}
        title={`Edit ${title}`}
      />
      <Card>
        <Card.Body>{data && <SupplierForm defaultValues={data} />}</Card.Body>
      </Card>
    </>
  );
};

export default EditSupplier;
