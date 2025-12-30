import React from 'react';
import { Card } from 'react-bootstrap';
import PageTitle from '@uhub/components/PageTitle';
import { useParams } from 'react-router-dom';
import CustomLoader from '@uhub/components/CustomLoader';
import ErrorMessage from '@uhub/components/ErrorMessage';
import { prepareDynamicUrl } from '@uhub/helpers';
import useReadStaff from '../hooks/useReadStaff';
import { STAFF_LIST, STAFF_VIEW } from '../constants/constant';
import StaffInfo from './StaffInfo';
import ExplicitPermission from './ExplicitPermission';

const ViewStorageTank: React.FC = () => {
  const { id } = useParams();
  const title: string = 'Staff';

  const { data, isFetching, isError } = useReadStaff(id);

  if (isFetching || !data) return <CustomLoader />;

  if (isError) return <ErrorMessage />;

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: `${title}s`, path: STAFF_LIST, active: false },
          {
            label: `View ${title}`,
            path: prepareDynamicUrl(STAFF_VIEW, id),
            active: true,
          },
        ]}
        title={`${title} Details`}
      />
      <Card>
        <Card.Body>{data && <StaffInfo staff={data} />}</Card.Body>
      </Card>

      <Card>
        <ExplicitPermission
          permissions={data.permissions}
          userId={data.user_id}
        />
      </Card>
    </>
  );
};

export default ViewStorageTank;
