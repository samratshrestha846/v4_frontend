import React from 'react';
import { Card, Form } from 'react-bootstrap';

import PageTitle from '../../../components/PageTitle';
import CustomLoader from '../../../components/CustomLoader';
import PaymentEditForm from './forms/PaymentEditForm';
import useReferrersDropdown from '../../../hooks/dropdown/useReferrersDropdown';
import useUpdatePayment from './hooks/useUpdatePayment';
import BackendValidationMessage from '../../../components/BackendValidationMessage';
import ErrorMessage from '../../../components/ErrorMessage';

const EditPayment: React.FC = () => {
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
    paymentDetail,
    isFetchingPayment,
    isErrorPayment,
  } = useUpdatePayment();

  if (isFetchingReferrersOptions || isFetchingPayment) return <CustomLoader />;

  if (isErrorPayment || isErrorReferrersOptions) return <ErrorMessage />;

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: 'Payments', path: '/payments/list', active: false },
          {
            label: 'Edit Payment',
            path: '/payments/edit',
            active: true,
          },
        ]}
        title="Edit Payment "
      />
      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            {serverValidationError && (
              <BackendValidationMessage
                setServerValidationError={setServerValidationError}
              />
            )}

            <PaymentEditForm
              control={control}
              register={register}
              errors={errors}
              submitted={submitted}
              navigateToPaymentList={navigateToPaymentList}
              referrersOptions={referrersOptions}
              payment={paymentDetail}
            />
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default EditPayment;
