import React from 'react';
import { Card, Form, Alert } from 'react-bootstrap';

import PageTitle from '../../../components/PageTitle';
import EditReferrerForm from './forms/EditReferrerForm';
import useUpdateReferrer from './hooks/useUpdateReferrer';
import CustomLoader from '../../../components/CustomLoader';
import ErrorMessage from '../../../components/ErrorMessage';

const EditReferrer: React.FC = () => {
  const {
    register,
    control,
    errors,
    handleSubmit,
    serverValidationError,
    setServerValidationError,
    submitted,
    navigateToReferrerList,
    onSubmit,
    referrerDetail,
    isFetchingReferrer,
    isErrorReferrer,
  } = useUpdateReferrer();

  if (isFetchingReferrer) return <CustomLoader />;

  if (isErrorReferrer) return <ErrorMessage />;

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: 'Referrers', path: '/referrer/list', active: false },
          { label: 'Edit Referrer', path: '/referrer/edit', active: true },
        ]}
        title="Edit Referrer"
      />
      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            {serverValidationError && (
              <Alert
                variant="danger"
                onClose={() => setServerValidationError(false)}
                dismissible>
                <strong>Validation Failed - </strong> Please fix validation
                errors and try again
              </Alert>
            )}
            <EditReferrerForm
              control={control}
              register={register}
              errors={errors}
              submitted={submitted}
              navigateToReferrerList={navigateToReferrerList}
              referrer={referrerDetail}
            />
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default EditReferrer;
