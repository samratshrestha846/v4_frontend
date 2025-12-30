import React from 'react';
import { Card } from 'react-bootstrap';
import PageTitle from '@uhub/components/PageTitle';
import { useParams } from 'react-router-dom';
import CustomLoader from '@uhub/components/CustomLoader';
import ErrorMessage from '@uhub/components/ErrorMessage';
import { prepareDynamicUrl } from '@uhub/helpers';
import { STORAGE_TANK_EDIT, STORAGE_TANK_LIST } from '../constants/constant';
import StorageTankForm from './StorageTankForm';
import useReadStorageTank from '../hooks/useReadStorageTank';

const EditStorageTank: React.FC = () => {
  const { id } = useParams();
  const title: string = 'Storage Tank';
  const { data, isFetching, isError } = useReadStorageTank(id);

  if (isFetching || !data) return <CustomLoader />;

  if (isError) return <ErrorMessage />;

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: `${title} list`, path: STORAGE_TANK_LIST, active: false },
          {
            label: `Edit ${title}`,
            path: prepareDynamicUrl(STORAGE_TANK_EDIT, id),
            active: true,
          },
        ]}
        title={`Edit ${title}`}
      />
      <Card>
        <Card.Body>
          {data && <StorageTankForm defaultValues={data} />}
        </Card.Body>
      </Card>
    </>
  );
};

export default EditStorageTank;
