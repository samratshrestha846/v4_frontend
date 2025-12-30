import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import CancelButton from '@uhub/components/Form/CancelButton';
import SubmitButton from '@uhub/components/Form/SubmitButton';
import CustomLoader from '@uhub/components/CustomLoader';
import ErrorMessage from '@uhub/components/ErrorMessage';
import BackendValidationMessage from '@uhub/components/BackendValidationMessage';
import CustomDatePicker from '@uhub/components/CustomDatePicker';
import { FormInput } from '@uhub/components';

import RnDForm from './components/RnDForm';
import { WorkDiaryFormProps } from '../types/WorkDiary';
import useWorkDiaryForm from '../hooks/useWorkDiaryForm';
import TravelDiaryForm from './components/TravelDiaryForm';
import NonRnDForm from './components/NonRnDForm';
import useFilterActivitiesByGroup from '../hooks/useFilterActivitiesByGroup';

type Props = {
  defaultValues: WorkDiaryFormProps;
};

const WorkDiaryForm: React.FC<Props> = ({ defaultValues }) => {
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
    rndFields,
    addRnd,
    removeRnd,
    setValue,
    isVehicleUsed,
    toggle,
  } = useWorkDiaryForm(defaultValues);

  const {
    activities: activitiesOptions,
    isFetching,
    isError,
    propagateOnGroupChange,
  } = useFilterActivitiesByGroup();

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
        <Col xl={4} lg={4} md={4}>
          <div className="mb-2">
            <CustomDatePicker
              label="Date"
              name="date"
              control={control}
              errors={errors}
              defaultSelected={defaultValues?.date}
              maxDate={new Date()}
            />
          </div>
        </Col>
        <Col xl={4} lg={4} md={4}>
          <FormInput
            label="Total Hours"
            type="number"
            name="total_hours"
            register={register}
            control={control}
            errors={errors}
            containerClass="mb-2"
            step="0.1"
          />
        </Col>
      </Row>

      <RnDForm
        defaultValues={defaultValues}
        control={control}
        register={register}
        errors={errors}
        rndFields={rndFields}
        addRnd={addRnd}
        removeRnd={removeRnd}
        propagateOnGroupChange={propagateOnGroupChange}
        activitiesOptions={activitiesOptions ?? []}
        setValue={setValue}
      />

      <NonRnDForm
        defaultValues={defaultValues}
        register={register}
        control={control}
        errors={errors}
        setValue={setValue}
      />

      <Row>
        <Col md={12}>
          <FormInput
            label="Check this box if a company vehicle is being used."
            type="checkbox"
            name="used_company_vehicle"
            register={register}
            control={control}
            errors={errors}
            containerClass="my-2"
            propagateOnChange={toggle}
            defaultChecked={isVehicleUsed}
          />
        </Col>
      </Row>

      {isVehicleUsed && (
        <TravelDiaryForm
          defaultValues={defaultValues}
          control={control}
          register={register}
          errors={errors}
          setValue={setValue}
        />
      )}

      <Row>
        <Col>
          <div className="float-end button-list mt-2">
            <CancelButton redirectOnClick={navigateToList} />
            <SubmitButton disable={submitted} />
          </div>
        </Col>
      </Row>
    </Form>
  );
};

export default WorkDiaryForm;
