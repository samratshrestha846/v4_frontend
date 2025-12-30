/* eslint-disable react/prop-types */
import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import CancelButton from '@uhub/components/Form/CancelButton';
import SubmitButton from '@uhub/components/Form/SubmitButton';
import BackendValidationMessage from '@uhub/components/BackendValidationMessage';

import { FormInput } from '@uhub/components';
import ReactSelect from '@uhub/components/ReactSelect';
import CustomDatePicker from '@uhub/components/CustomDatePicker';
import CustomLoader from '@uhub/components/CustomLoader';
import ErrorMessage from '@uhub/components/ErrorMessage';
import useUserDropDownByPlatform from '@uhub/hooks/dropdown/useUserDropDownByPlatform';
import { LabelNumericValue } from '@uhub/types/common';
import { MaintenanceBookingFormProps } from '../types/MaintenanceBooking';
import useMaintenanceBookingForm from '../hooks/useMaintenanceBookingForm';
import { DIT_CONNECT_PLATFORM } from '../../../constants/authKey';

type Props = {
  defaultValues: MaintenanceBookingFormProps;
  toggleModal: () => void;
};
const MaintenanceBookingForm: React.FC<Props> = ({
  defaultValues,
  toggleModal,
}) => {
  const {
    register,
    control,
    errors,
    handleSubmit,
    serverValidationError,
    setServerValidationError,
    submitted,
    onSubmit,
  } = useMaintenanceBookingForm({ defaultValues, toggleModal });

  const {
    data: userOptions,
    isFetching,
    isError,
  } = useUserDropDownByPlatform({
    platform: DIT_CONNECT_PLATFORM,
  });

  if (isFetching) return <CustomLoader />;

  if (isError) return <ErrorMessage />;

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {serverValidationError && (
        <BackendValidationMessage
          setServerValidationError={setServerValidationError}
        />
      )}
      <Row>
        <Col md={12}>
          <div className="mb-2">
            <ReactSelect
              label="Assignee"
              name="assignee_id"
              errors={errors}
              control={control}
              options={userOptions ?? []}
              placeholder="Select"
              isClearable
              defaultSelected={(userOptions as LabelNumericValue[])?.find(
                (item) => item.value === defaultValues?.assignee_id
              )}
            />
          </div>
        </Col>
        <Col md={12}>
          <div className="mb-2">
            <CustomDatePicker
              label="Booking Date"
              name="booking_date"
              control={control}
              errors={errors}
              defaultSelected={undefined}
              isClearable
            />
          </div>
        </Col>
        <Col md={12}>
          <FormInput
            label="Location"
            type="text"
            name="location"
            register={register}
            control={control}
            errors={errors}
            containerClass="mb-2"
          />
        </Col>
      </Row>

      <Row className="">
        <Col>
          <div className="float-end button-list">
            <CancelButton redirectOnClick={toggleModal} />
            <SubmitButton disable={submitted} />
          </div>
        </Col>
      </Row>
    </Form>
  );
};

export default MaintenanceBookingForm;
