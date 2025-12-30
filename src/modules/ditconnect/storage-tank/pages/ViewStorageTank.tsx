import React from 'react';
import { Card } from 'react-bootstrap';
import PageTitle from '@uhub/components/PageTitle';
import { useParams } from 'react-router-dom';
import CustomLoader from '@uhub/components/CustomLoader';
import ErrorMessage from '@uhub/components/ErrorMessage';
import { prepareDynamicUrl } from '@uhub/helpers';
import { STORAGE_TANK_LIST, STORAGE_TANK_VIEW } from '../constants/constant';
import useReadStorageTank from '../hooks/useReadStorageTank';
import StorageTankInfo from './components/StorageTankInfo';

const ViewStorageTank: React.FC = () => {
  const { id } = useParams();
  const title: string = 'Storage Tank';

  const { data, isFetching, isError } = useReadStorageTank(id);

  if (isFetching || !data) return <CustomLoader />;

  if (isError) return <ErrorMessage />;

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: `${title} List`, path: STORAGE_TANK_LIST, active: false },
          {
            label: data?.name ?? `View ${title}`,
            path: prepareDynamicUrl(STORAGE_TANK_VIEW, id),
            active: true,
          },
        ]}
        title={`${title} Details`}
      />
      <Card>
        <Card.Body>{data && <StorageTankInfo storageTank={data} />}</Card.Body>
      </Card>
    </>
  );
};

export default ViewStorageTank;
