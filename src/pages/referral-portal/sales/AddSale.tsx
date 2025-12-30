import React from 'react';
import { Card, Form } from 'react-bootstrap';

import PageTitle from '../../../components/PageTitle';
import useCreateSale from './hooks/useCreateSale';
import CustomLoader from '../../../components/CustomLoader';
import SaleAddForm from './forms/SaleAddForm';
import useReferredCustomersDropdown from '../../../hooks/dropdown/useReferredCustomersDropdown';
import BackendValidationMessage from '../../../components/BackendValidationMessage';
import ErrorMessage from '../../../components/ErrorMessage';

const AddSale: React.FC = () => {
  const {
    data: customersOptions,
    isFetching: isFetchingCustomersOptions,
    isError: isErrorCustomersOptions,
  } = useReferredCustomersDropdown();

  const {
    register,
    control,
    errors,
    handleSubmit,
    serverValidationError,
    setServerValidationError,
    submitted,
    navigateToSaleList,
    onSubmit,
  } = useCreateSale();

  if (isFetchingCustomersOptions) return <CustomLoader />;

  if (isErrorCustomersOptions) return <ErrorMessage />;

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: 'Sales', path: '/sales/list', active: false },
          {
            label: 'Add Sale',
            path: '/sales/add',
            active: true,
          },
        ]}
        title="Add Sale "
      />
      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            {serverValidationError && (
              <BackendValidationMessage
                setServerValidationError={setServerValidationError}
              />
            )}
            <SaleAddForm
              control={control}
              register={register}
              errors={errors}
              submitted={submitted}
              navigateToSaleList={navigateToSaleList}
              customersOptions={customersOptions}
            />
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default AddSale;
