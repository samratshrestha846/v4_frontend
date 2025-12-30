import React from 'react';
import { Card, Form } from 'react-bootstrap';
import PageTitle from '../../../components/PageTitle';
import useCreatePayment from './hooks/useCreatePayment';
import CustomLoader from '../../../components/CustomLoader';
import PaymentAddForm from './forms/PaymentAddForm';
import useReferrersDropdown from '../../../hooks/dropdown/useReferrersDropdown';
import ErrorMessage from '../../../components/ErrorMessage';
import { PAYMENT_ADD, PAYMENT_LIST } from '../../../constants/path';
import BackendValidationMessage from '../../../components/BackendValidationMessage';

const AddPayment: React.FC = () => {
  const {
    data: referrersOptions,
    isFetching: isFetchingReferrersOptions,
    isError: isErrorReferrersOptions,
  } = useReferrersDropdown();

  const {
    register,
    control,
    errors,
    handleSubmit,
    serverValidationError,
    setServerValidationError,
    submitted,
    navigateToPaymentList,
    onSubmit,
  } = useCreatePayment();

  if (isFetchingReferrersOptions) return <CustomLoader />;

  if (isErrorReferrersOptions) return <ErrorMessage />;

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: 'Payments', path: PAYMENT_LIST, active: false },
          {
            label: 'Add Payment',
            path: PAYMENT_ADD,
            active: true,
          },
        ]}
        title="Add Payment "
      />
      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            {serverValidationError && (
              <BackendValidationMessage
                setServerValidationError={setServerValidationError}
              />
            )}

            <PaymentAddForm
              control={control}
              register={register}
              errors={errors}
              submitted={submitted}
              navigateToPaymentList={navigateToPaymentList}
              referrersOptions={referrersOptions}
            />
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default AddPayment;
