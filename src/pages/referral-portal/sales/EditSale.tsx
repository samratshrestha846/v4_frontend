import React from 'react';
import { Card, Form } from 'react-bootstrap';

import PageTitle from '../../../components/PageTitle';
import CustomLoader from '../../../components/CustomLoader';
import SaleEditForm from './forms/SaleEditForm';
import useUpdateSale from './hooks/useUpdateSale';
import useReferredCustomersDropdown from '../../../hooks/dropdown/useReferredCustomersDropdown';
import ErrorMessage from '../../../components/ErrorMessage';
import BackendValidationMessage from '../../../components/BackendValidationMessage';

const EditSale: React.FC = () => {
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
    saleDetail,
    isFetchingSale,
    isErrorSale,
  } = useUpdateSale();

  if (isFetchingCustomersOptions || isFetchingSale) return <CustomLoader />;

  if (isErrorSale || isErrorCustomersOptions) return <ErrorMessage />;

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: 'Sales', path: '/sales/list', active: false },
          { label: 'Edit Sale', path: '/sales/edit', active: true },
        ]}
        title="Edit Sale"
      />
      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            {serverValidationError && (
              <BackendValidationMessage
                setServerValidationError={setServerValidationError}
              />
            )}
            <SaleEditForm
              control={control}
              register={register}
              errors={errors}
              submitted={submitted}
              navigateToSaleList={navigateToSaleList}
              customersOptions={customersOptions}
              sale={saleDetail}
            />
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default EditSale;
