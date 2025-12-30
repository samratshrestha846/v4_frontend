/* eslint-disable no-nested-ternary */
import React from 'react';
import { Card, Form, Row, Button, Col, Alert } from 'react-bootstrap';
import classNames from 'classnames';
import PageTitle from '../../../components/PageTitle';
import useCustomerOnboarding from './hooks/useCustomerOnboarding';
import useRegionsDropdown from '../../../hooks/dropdown/useRegionsDropdown';
import useReferrersDropdown from '../../../hooks/dropdown/useReferrersDropdown';

import CustomerDetailForm from './forms/CustomerDetailForm';
import BusinessOwnerDetailsForm from './forms/BusinessOwnerDetailsForm';
import PropertyDetailForm from './forms/PropertyDetailForm';
import StationManagerForm from './forms/StationManagerForm';
import VerifyingDetails from './forms/VerifyingDetails';
import {
  ONBOARDING_STEPS_1,
  ONBOARDING_STEPS_2,
  ONBOARDING_STEPS_3,
  ONBOARDING_STEPS_4,
  ONBOARDING_STEPS_5,
} from './constants/stepsConstants';
import { CUSTOMER_ADD, CUSTOMER_LIST } from '../../../constants/path';
import CustomLoader from '../../../components/CustomLoader';
import ErrorMessage from '../../../components/ErrorMessage';

const CustomerOnboarding: React.FC = () => {
  const {
    control,
    register,
    errors,
    handleSubmit,
    onSubmit,
    steps,
    currentStep,
    setCurrentStep,
    isCreateNewStationManager,
    setIsCreateNewStationManager,
    customerDetails,
    propertyDetails,
    stationManagerDetails,
    ownerDetails,
    submitted,
    serverValidationError,
    setServerValidationError,
  } = useCustomerOnboarding();

  const componentByStep = () => {
    switch (currentStep) {
      case ONBOARDING_STEPS_1:
        return (
          <CustomerDetailForm
            control={control}
            register={register}
            errors={errors}
            referrerOptions={referrerOptions}
            customerDetails={customerDetails}
          />
        );
      case ONBOARDING_STEPS_2:
        return (
          <BusinessOwnerDetailsForm
            control={control}
            register={register}
            errors={errors}
            ownerDetails={ownerDetails}
          />
        );
      case ONBOARDING_STEPS_3:
        return (
          <PropertyDetailForm
            control={control}
            register={register}
            errors={errors}
            isCreateNewStationManager={isCreateNewStationManager}
            setIsCreateNewStationManager={setIsCreateNewStationManager}
            regionsDropdown={regionsDropdown}
          />
        );
      case ONBOARDING_STEPS_4:
        return (
          <StationManagerForm
            control={control}
            register={register}
            errors={errors}
            stationManagerDetails={stationManagerDetails}
          />
        );
      case ONBOARDING_STEPS_5:
        return (
          <VerifyingDetails
            customerDetails={customerDetails}
            ownerDetails={ownerDetails}
            propertyDetails={propertyDetails}
            stationManagerDetails={stationManagerDetails}
            referrerOptions={referrerOptions}
            regionsDropdown={regionsDropdown}
          />
        );
      default:
        return null;
    }
  };

  const { regionsDropdown, isFetchingRegionsDropdown, isErrorRegionsDropdown } =
    useRegionsDropdown();
  const {
    data: referrerOptions,
    isFetching: isFetchingReferrerOptionsisError,
    isError: isErrorReferrerOptioms,
  } = useReferrersDropdown();

  if (isFetchingReferrerOptionsisError || isFetchingRegionsDropdown) {
    return <CustomLoader />;
  }

  if (isErrorReferrerOptioms || isErrorRegionsDropdown) {
    return <ErrorMessage />;
  }

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: 'Customers', path: CUSTOMER_LIST, active: false },
          {
            label: 'Add Customer',
            path: CUSTOMER_ADD,
            active: true,
          },
        ]}
        title="Customer Onboarding"
      />
      <Card>
        <Card.Body>
          {serverValidationError && (
            <Alert
              className="m-3"
              variant="danger"
              onClose={() => setServerValidationError(false)}
              dismissible>
              <strong>Validation Failed - </strong> Please fix validation errors
              and try again
            </Alert>
          )}

          <Form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-wizard">
              <ul>
                {steps.map((stepItem) => (
                  <li
                    className={
                      stepItem.step < currentStep
                        ? 'filled'
                        : stepItem.step === currentStep
                          ? 'active'
                          : 'inactive'
                    }
                    key={stepItem.label}>
                    <div
                      key={stepItem.label}
                      className="step d-flex flex-column  justify-content-center align-items-center gap-2">
                      <button
                        className={classNames(
                          'btn',
                          stepItem.step < currentStep
                            ? 'btn-filled'
                            : currentStep === stepItem.step
                              ? 'btn-active'
                              : 'btn-disabled'
                        )}
                        disabled={currentStep < stepItem.step}
                        type="button"
                        onClick={() => setCurrentStep(stepItem.step)}>
                        <i
                          className={classNames(
                            'color-white',
                            stepItem.step < currentStep
                              ? 'bx bx-check '
                              : stepItem.icon,
                            ''
                          )}
                        />
                        {/* )} */}
                      </button>

                      <span
                        className={classNames(
                          'text-center',
                          stepItem.step < currentStep
                            ? 'btn-filled'
                            : stepItem.step === currentStep
                              ? 'fw-bold'
                              : 'text-black-50'
                        )}>
                        {stepItem.label}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="form-steps">
              <Row>
                <Col>
                  <div className="my-2 p-2">{componentByStep()}</div>
                </Col>
              </Row>
            </div>
            <Row>
              <Col>
                <div className="d-flex justify-content-end align-items-center p-2">
                  <div className="button-list">
                    {currentStep !== ONBOARDING_STEPS_1 && (
                      <Button
                        variant="ghost"
                        onClick={() => setCurrentStep(currentStep - 1)}>
                        <i className="bx bx-chevron-left" />
                        Previous
                      </Button>
                    )}
                    {currentStep < steps.length && (
                      <Button
                        type="submit"
                        variant="secondary"
                        disabled={currentStep === steps.length}>
                        Next <i className="bx bx-chevron-right" />
                      </Button>
                    )}

                    {currentStep === steps.length && (
                      <Button
                        variant="secondary"
                        type="submit"
                        disabled={submitted}>
                        <i className="bx bx-save me-1" />
                        Submit
                      </Button>
                    )}
                  </div>
                </div>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default CustomerOnboarding;
