import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import CancelButton from '@uhub/components/Form/CancelButton';
import SubmitButton from '@uhub/components/Form/SubmitButton';
import BackendValidationMessage from '@uhub/components/BackendValidationMessage';
import { FormInput } from '@uhub/components';
import ReactSelect from '@uhub/components/ReactSelect';
import CustomLoader from '@uhub/components/CustomLoader';
import {
  SupplementFormProps,
  supplementTagsOptions,
  supplementTypeOptions,
} from '../types/Supplement';
import useSupplementForm from '../hooks/useSupplementForm';
import useDropdownSupplementGroup from '../hooks/useDropdownSupplementGroup';
import { STATUS_OPTIONS_STRING_CAPITAL_A } from '../../constants/common';

type Props = {
  defaultValues: SupplementFormProps;
};
const SupplementForm: React.FC<Props> = ({ defaultValues }) => {
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
  } = useSupplementForm(defaultValues);

  const {
    data: supplementGroupOptions,
    isFetching: isFetchingSupplementGroups,
  } = useDropdownSupplementGroup();

  if (isFetchingSupplementGroups) {
    return <CustomLoader />;
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
          <FormInput
            label="Slug"
            type="text"
            name="slug"
            register={register}
            control={control}
            errors={errors}
            containerClass="mb-2"
          />
        </Col>
        <Col xl={6} lg={6} md={6}>
          <div className="mb-2">
            <ReactSelect
              label="Group"
              name="group"
              errors={errors}
              control={control}
              options={supplementGroupOptions ?? []}
              placeholder="Select"
              isClearable
              defaultSelected={supplementGroupOptions?.find(
                (item: any) => item.value === defaultValues?.group
              )}
            />
          </div>
        </Col>
        <Col xl={6} lg={6} md={6}>
          <div className="mb-2">
            <ReactSelect
              label="Type"
              name="type"
              errors={errors}
              control={control}
              options={supplementTypeOptions ?? []}
              placeholder="Select"
              isClearable
              defaultSelected={supplementTypeOptions?.find(
                (item) => item.value === defaultValues?.type
              )}
            />
          </div>
        </Col>
        <Col xl={6} lg={6} md={6}>
          <div className="mb-2">
            <ReactSelect
              label="Tags"
              name="tags"
              errors={errors}
              control={control}
              options={supplementTagsOptions ?? []}
              placeholder="Select"
              isClearable
              isMultiple
              defaultSelected={defaultValues?.tags?.map((item: any) => {
                return {
                  value: item,
                  label: item,
                };
              })}
            />
          </div>
        </Col>
        <Col xl={6} lg={6} md={6}>
          <div className="mb-2">
            <ReactSelect
              label="Status"
              name="status"
              errors={errors}
              control={control}
              options={STATUS_OPTIONS_STRING_CAPITAL_A ?? []}
              placeholder="Select"
              defaultSelected={STATUS_OPTIONS_STRING_CAPITAL_A?.find(
                (item) => item.value === defaultValues?.status
              )}
            />
          </div>
        </Col>
      </Row>

      <Row>
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

export default SupplementForm;
