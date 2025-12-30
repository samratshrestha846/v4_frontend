import React from 'react';
import { Card, Form, Alert } from 'react-bootstrap';
import PageTitle from '../../components/PageTitle';
import useCreateCustomer from './hooks/useCreateCustomer';
import CustomerAddForm from './form/CustomerAddForm';
import useReferrersDropdown from '../../hooks/dropdown/useReferrersDropdown';
import CustomLoader from '../../components/CustomLoader';

const AddCustomer: React.FC = () => {
  const { data: referrerOptions, isFetching } = useReferrersDropdown();

  const {
    register,
    control,
    errors,
    handleSubmit,
    serverValidationError,
    setServerValidationError,
    createCustomerMutation,
    submitted,
    setSubmitted,
    navigateToCustomerList,
  } = useCreateCustomer();

  const onSubmit = async (formData: any) => {
    setSubmitted(true);

    if (formData.subscribed_products) {
      formData.subscribed_products = formData.subscribed_products.filter(
        (item: any) => item !== false
      );
    } else {
      formData.subscribed_products = [];
    }
    createCustomerMutation.mutate(formData);
    setSubmitted(false);
  };

  if (isFetching) return <CustomLoader />;

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: 'Customers', path: '/customers/list', active: false },
          {
            label: 'Add Customer',
            path: '/Customers/add',
            active: true,
          },
        ]}
        title="Add Customer "
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
            <CustomerAddForm
              control={control}
              register={register}
              errors={errors}
              submitted={submitted}
              navigateToCustomerList={navigateToCustomerList}
              referrerOptions={referrerOptions}
            />
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default AddCustomer;
