/* eslint-disable react/prop-types */
import ReactSelect from '@uhub/components/ReactSelect';
import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import CancelButton from '@uhub/components/Form/CancelButton';
import SubmitButton from '@uhub/components/Form/SubmitButton';
import BackendValidationMessage from '@uhub/components/BackendValidationMessage';
import { FormInput } from '@uhub/components';
import { WORK_DIARY_GROUP_OPTIONS } from '../../daily-diary/work-diary/constants/constant';
import useDropdownRndActivity from '../hooks/useDropdownRndActivity';
import { RndActivityFormProps } from '../types/RndActivity';
import useRndActivityForm from '../hooks/useRndActivityForm';

type Props = {
  defaultValues: RndActivityFormProps;
};
const RndActivityForm: React.FC<Props> = ({ defaultValues }) => {
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
  } = useRndActivityForm(defaultValues);

  const { activityOptions } = useDropdownRndActivity();
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {serverValidationError && (
        <BackendValidationMessage
          setServerValidationError={setServerValidationError}
        />
      )}
      <Row>
        <Col xl={6} lg={6} md={6} className="mb-3">
          <div className="mb-2">
            <ReactSelect
              label="Group"
              name="group"
              errors={errors}
              control={control}
              options={WORK_DIARY_GROUP_OPTIONS}
              placeholder="Select Group Option"
              isClearable
              defaultSelected={WORK_DIARY_GROUP_OPTIONS?.find(
                (item: any) => item.value === defaultValues?.group
              )}
            />
          </div>
        </Col>
        <Col xl={6} lg={6} md={6} className="mb-3">
          <div className="mb-2">
            <FormInput
              label="Section No"
              type="text"
              name="section_no"
              register={register}
              control={control}
              errors={errors}
              containerClass="mb-2"
            />
          </div>
        </Col>
        <Col xl={6} lg={6} md={6} className="mb-3">
          <div className="mb-2">
            <FormInput
              label="Name"
              type="text"
              name="name"
              register={register}
              control={control}
              errors={errors}
              containerClass="mb-2"
            />
          </div>
        </Col>
        <Col xl={6} lg={6} md={6} className="mb-3">
          <div className="mb-2">
            <ReactSelect
              label="Parent Activity"
              name="parent_id"
              errors={errors}
              control={control}
              options={activityOptions || []}
              placeholder="Select Parent Activity"
              isClearable
              defaultSelected={activityOptions?.find(
                (item: any) => item.value === defaultValues?.parent_id
              )}
            />
          </div>
        </Col>
        <Col xl={6} lg={6} md={6} className="mb-3">
          <div className="mb-2">
            <FormInput
              label="Description"
              type="textarea"
              name="description"
              register={register}
              control={control}
              errors={errors}
              containerClass="mb-2"
            />
          </div>
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

export default RndActivityForm;
