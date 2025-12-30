import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import CancelButton from '@uhub/components/Form/CancelButton';
import SubmitButton from '@uhub/components/Form/SubmitButton';
import BackendValidationMessage from '@uhub/components/BackendValidationMessage';
import { FormInput } from '@uhub/components';
import ReactSelect from '@uhub/components/ReactSelect';
import CustomLoader from '@uhub/components/CustomLoader';
import ErrorMessage from '@uhub/components/ErrorMessage';
import { departmentOptions, StaffFormProps } from '../types/Staff';
import useStaffForm from '../hooks/useStaffForm';
import useRolesDropdown from '../../hooks/useRolesDropdown';

type Props = {
  defaultValues: StaffFormProps;
};
const StaffForm: React.FC<Props> = ({ defaultValues }) => {
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
  } = useStaffForm(defaultValues);

  const { data: rolesOptions, isFetching, isError } = useRolesDropdown();

  if (isFetching) {
    return <CustomLoader />;
  }

  if (isError) {
    return <ErrorMessage />;
  }

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
            label="Mobile no."
            type="text"
            name="mobile_number"
            register={register}
            control={control}
            errors={errors}
            containerClass="mb-2"
          />
        </Col>
        <Col xl={6} lg={6} md={6}>
          <div className="mb-2">
            <ReactSelect
              label="Department"
              name="department"
              errors={errors}
              control={control}
              options={departmentOptions ?? []}
              placeholder="Select"
              isClearable
              defaultSelected={departmentOptions?.find(
                (item) => item.value === defaultValues?.department
              )}
            />
          </div>
        </Col>
        <Col xl={6} lg={6} md={6}>
          <FormInput
            label="Position"
            type="text"
            name="position"
            register={register}
            control={control}
            errors={errors}
            containerClass="mb-2"
          />
        </Col>
        <Col xl={6} lg={6} md={6}>
          <ReactSelect
            label="Role"
            name="role"
            errors={errors}
            control={control}
            options={rolesOptions ?? []}
            placeholder="Select"
            isClearable
            defaultSelected={rolesOptions?.find(
              (item: any) => item.value === defaultValues?.role
            )}
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

export default StaffForm;
