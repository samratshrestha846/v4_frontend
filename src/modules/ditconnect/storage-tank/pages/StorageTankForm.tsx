/* eslint-disable react/prop-types */
import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import CancelButton from '@uhub/components/Form/CancelButton';
import SubmitButton from '@uhub/components/Form/SubmitButton';
import BackendValidationMessage from '@uhub/components/BackendValidationMessage';
import { FormInput } from '@uhub/components';
import ReactSelect from '@uhub/components/ReactSelect';
import CustomLoader from '@uhub/components/CustomLoader';

import ErrorMessage from '@uhub/components/ErrorMessage';
import { StorageTankFormProps } from '../types/StorageTank';
import useStorageTankForm from '../hooks/useStorageTankForm';
import useDitConnectLocationDropDown from '../../hooks/useDitConnectLocationDropDown';

type Props = {
  defaultValues: StorageTankFormProps;
};
const StorageTankForm: React.FC<Props> = ({ defaultValues }) => {
  const {
    register,
    control,
    errors,
    handleSubmit,
    serverValidationError,
    setServerValidationError,
    submitted,
    navigateToList,
    onSubmit,
  } = useStorageTankForm(defaultValues);

  const { locationOptions, isFetchingLocationOptions, isErrorLocationOptions } =
    useDitConnectLocationDropDown();

  if (isFetchingLocationOptions) return <CustomLoader />;
  if (isErrorLocationOptions) return <ErrorMessage />;

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {serverValidationError && (
        <BackendValidationMessage
          setServerValidationError={setServerValidationError}
        />
      )}
      <Row>
        <Col xl={6} lg={6} md={6}>
          <FormInput
            label="Name"
            type="text"
            name="name"
            register={register}
            control={control}
            errors={errors}
            containerClass="mb-2"
          />
        </Col>
        <Col xl={6} lg={6} md={6}>
          <div className="mb-2">
            <ReactSelect
              label="Location"
              name="location_id"
              errors={errors}
              control={control}
              options={locationOptions ?? []}
              placeholder="Select"
              isClearable
              defaultSelected={locationOptions?.find(
                (item) => item.value === defaultValues?.location_id
              )}
            />
          </div>
        </Col>
        <Col xl={6} lg={6} md={6}>
          <FormInput
            label="Capacity (L)"
            type="number"
            name="capacity"
            register={register}
            control={control}
            errors={errors}
            containerClass="mb-2"
          />
        </Col>
        <Col xl={6} lg={6} md={6}>
          <FormInput
            label="Current Quantity"
            type="number"
            name="current_qty"
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
            <CancelButton redirectOnClick={navigateToList} />
            <SubmitButton disable={submitted} />
          </div>
        </Col>
      </Row>
    </Form>
  );
};

export default StorageTankForm;
