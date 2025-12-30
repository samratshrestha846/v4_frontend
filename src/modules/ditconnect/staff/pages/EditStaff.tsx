import React from 'react';
import { Card } from 'react-bootstrap';
import PageTitle from '@uhub/components/PageTitle';
import { useParams } from 'react-router-dom';
import CustomLoader from '@uhub/components/CustomLoader';
import ErrorMessage from '@uhub/components/ErrorMessage';
import { prepareDynamicUrl } from '@uhub/helpers';
import { STAFF_EDIT, STAFF_LIST } from '../constants/constant';
import StaffForm from './StaffForm';
import useReadStaff from '../hooks/useReadStaff';

const EditStaff: React.FC = () => {
  const { id } = useParams();

  const title: string = 'Staff';
  const { data, isFetching, isError } = useReadStaff(id);

  if (isFetching || !data) return <CustomLoader />;

  if (isError) return <ErrorMessage />;

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: `${title}`, path: STAFF_LIST, active: false },
          {
            label: `Edit ${title}`,
            path: prepareDynamicUrl(STAFF_EDIT, id),
            active: true,
          },
        ]}
        title={`Edit ${title}`}
      />
      <Card>
        <Card.Body>
          {data && (
            <StaffForm
              defaultValues={{
                user_id: data.user_id,
                mobile_number: data.mobile_number,
                department: data.department,
                position: data.position,
                role: data.role,
              }}
            />
          )}
        </Card.Body>
      </Card>
    </>
  );
};

export default EditStaff;
