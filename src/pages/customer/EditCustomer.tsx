import React, { useEffect } from 'react';
import { Card, Form, Alert } from 'react-bootstrap';
import PageTitle from '../../components/PageTitle';
import useUpdateCustomer from './hooks/useUpdateCustomer';
import CustomerEditForm from './form/CustomerEditForm';
import useReferrersDropdown from '../../hooks/dropdown/useReferrersDropdown';
import CustomLoader from '../../components/CustomLoader';
import useReadCustomer from './hooks/useReadCustomer';
import ErrorMessage from '../../components/ErrorMessage';

const EditCustomer: React.FC = () => {
  const {
    data: referrerOptions,
    isFetching: isFetchingReferrerOptions,
    isError: isErrorReferrerOptions,
  } = useReferrersDropdown();

  const {
    data: customer,
    isFetching: isFetchingCustomer,
    isError: isErrorCustomer,
  } = useReadCustomer();

  const {
    register,
    control,
    reset,
    errors,
    handleSubmit,
    serverValidationError,
    setServerValidationError,
    updateCustomerMutation,
    submitted,
    setSubmitted,
    navigateToCustomerList,
  } = useUpdateCustomer();

  const onSubmit = async (formData: any) => {
    setSubmitted(true);

    if (formData.subscribed_products) {
      formData.subscribed_products = formData.subscribed_products.filter(
        (item: any) => item !== false
      );
    } else {
      formData.subscribed_products = [];
    }

    updateCustomerMutation.mutate(formData);
    setSubmitted(false);
  };

  useEffect(() => {
    reset({
      business_name: customer?.business_name,
      email: customer?.email,
      phone: customer?.phone,
      referrer_id: customer?.referrer_id,
      is_active: customer?.is_active,
    });
  }, [customer]);

  if (isFetchingReferrerOptions || isFetchingCustomer) return <CustomLoader />;

  if (isErrorCustomer || isErrorReferrerOptions) return <ErrorMessage />;

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: 'Customers', path: '/customers/list', active: false },
          {
            label: 'Edit Customer',
            path: '/customers/edit/:id',
            active: true,
          },
        ]}
        title="Edit Customer "
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
            <CustomerEditForm
              control={control}
              register={register}
              errors={errors}
              submitted={submitted}
              navigateToCustomerList={navigateToCustomerList}
              referrerOptions={referrerOptions}
              customer={customer}
            />
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default EditCustomer;
