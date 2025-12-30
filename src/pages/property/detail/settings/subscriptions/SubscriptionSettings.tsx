import React from 'react';
import { Card, OverlayTrigger, Tooltip, Form } from 'react-bootstrap';
import EditSubscriptionForm from './EditSubscriptionForm';
import Subscriptions from './Subscriptions';
import BackendValidationMessage from '../../../../../components/BackendValidationMessage';
import useUpdateCustomerSubscriptions from './hooks/useUpdateCustomerSubscriptions';
import CustomLoader from '../../../../../components/CustomLoader';
import ErrorMessage from '../../../../../components/ErrorMessage';
import { Property } from '../../../../../types/property/propertyList';

type Props = {
  property?: Property;
  refetchProperty: () => void;
};

const SubscriptionSettings: React.FC<Props> = ({
  property,
  refetchProperty,
}) => {
  const {
    register,
    control,
    errors,
    handleSubmit,
    onSubmit,
    serverValidationError,
    setServerValidationError,
    supplementsOptions,
    isFetchingSupplementsOptions,
    isErrorSupplementsOptions,
    isSubscriptionEditEnabled,
    setIsSubscriptionEditEnabled,
    propagateOnSupplementChange,
    defaultOptions,
    subscriptions,
    handleEdit,
    submitted,
  } = useUpdateCustomerSubscriptions({ property, refetchProperty });

  if (isFetchingSupplementsOptions) {
    return <CustomLoader />;
  }

  if (isErrorSupplementsOptions) {
    return <ErrorMessage />;
  }

  return (
    <Card>
      <Card.Header
        as="h5"
        className="px-2 fw-meium text-primary-color d-flex justify-content-between">
        <span>Subscriptions</span>

        <OverlayTrigger
          placement="left"
          overlay={
            <Tooltip id="edit-settings">
              {isSubscriptionEditEnabled ? 'Cancel' : 'Edit Settings'}
            </Tooltip>
          }>
          <button
            type="button"
            className="btn-icon text-muted font-18"
            onClick={handleEdit}>
            <i
              className={`bx ${isSubscriptionEditEnabled ? 'bx-x' : 'bx-edit'}`}
            />
          </button>
        </OverlayTrigger>
      </Card.Header>
      <Card.Body>
        {serverValidationError && (
          <BackendValidationMessage
            setServerValidationError={setServerValidationError}
          />
        )}
        {isSubscriptionEditEnabled ? (
          <Form onSubmit={handleSubmit(onSubmit)}>
            <EditSubscriptionForm
              register={register}
              control={control}
              errors={errors}
              supplementOptions={supplementsOptions}
              propagateOnSupplementChange={propagateOnSupplementChange}
              subscriptions={subscriptions}
              defaultOptions={defaultOptions}
              setIsSubscriptionEditEnabled={setIsSubscriptionEditEnabled}
              submitted={submitted}
            />
          </Form>
        ) : (
          <Subscriptions subscriptions={property?.customer_subscriptions} />
        )}
      </Card.Body>
    </Card>
  );
};

export default SubscriptionSettings;
