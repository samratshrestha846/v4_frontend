import React from 'react';
import { Card, Form, Alert } from 'react-bootstrap';
import PageTitle from '../../../components/PageTitle';
import AddReferrerForm from './forms/AddReferrerForm';
import useCreateReferrer from './hooks/useCreateReferrer';

const AddReferrer: React.FC = () => {
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
  } = useCreateReferrer();

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: 'Referrers', path: '/referrer/list', active: false },
          { label: 'Add Referrer', path: '/referrer/add', active: true },
        ]}
        title="Add Referrer"
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
            <AddReferrerForm
              control={control}
              register={register}
              errors={errors}
              submitted={submitted}
              navigateToReferrerList={navigateToReferrerList}
            />
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default AddReferrer;
