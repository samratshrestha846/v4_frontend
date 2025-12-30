/* eslint-disable react/prop-types */
import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import JoditEditor from 'jodit-react';
import CancelButton from '@uhub/components/Form/CancelButton';
import SubmitButton from '@uhub/components/Form/SubmitButton';
import BackendValidationMessage from '@uhub/components/BackendValidationMessage';
import { Controller } from 'react-hook-form';
import { FormInput } from '@uhub/components';
import CustomDatePicker from '@uhub/components/CustomDatePicker';
import ReactSelect from '@uhub/components/ReactSelect';
import CustomLoader from '@uhub/components/CustomLoader';
import ErrorMessage from '@uhub/components/ErrorMessage';
import { ProductionFormProps } from '../types/Production';
import useProductionForm from '../hooks/useProductionForm';
import useSuppplementWithGroup from '../../hooks/useSupplementWithGroup';
import GroupedSelectInput from '../../components/GroupedSelectInput';
import useDitConnectLocationDropDown from '../../hooks/useDitConnectLocationDropDown';
import { JODIT_TEXT_EDITOR_CONFIG } from '../../../../constants/editorConstants';

type Props = {
  defaultValues: ProductionFormProps;
};
const ProductionForm: React.FC<Props> = ({ defaultValues }) => {
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
    setValue,
  } = useProductionForm(defaultValues);

  const {
    supplementWithGroupOptions,
    isSupplementWithGroupFetching,
    isSupplementWithGroupError,
  } = useSuppplementWithGroup();

  const { locationOptions, isFetchingLocationOptions, isErrorLocationOptions } =
    useDitConnectLocationDropDown();

  if (isSupplementWithGroupFetching || isFetchingLocationOptions)
    return <CustomLoader />;
  if (isSupplementWithGroupError || isErrorLocationOptions)
    return <ErrorMessage />;

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
            <Form.Label>Supplement</Form.Label>
            <Controller
              name="supplement_id"
              control={control}
              defaultValue={defaultValues?.supplement_id || null}
              render={({ field }) => {
                const selectedOption =
                  supplementWithGroupOptions
                    ?.flatMap((group: { options: any }) => group.options)
                    .find((option: { id: any }) => option.id === field.value) ||
                  null;

                return (
                  <GroupedSelectInput
                    options={supplementWithGroupOptions ?? []}
                    value={selectedOption}
                    placeholder="Select Supplement"
                    onChange={(selected) =>
                      field.onChange(selected?.id || null)
                    }
                  />
                );
              }}
            />
          </div>
        </Col>
        <Col xl={4} lg={4} md={4}>
          <div className="mb-2">
            <FormInput
              label="Quantity"
              type="number"
              name="qty"
              register={register}
              control={control}
              errors={errors}
              containerClass="mb-2"
            />
          </div>
        </Col>
        <Col xl={4} lg={4} md={4}>
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
      </Row>
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
          <div className="mb-2">
            <FormInput
              label="Batch No"
              type="text"
              name="batch_number"
              register={register}
              control={control}
              errors={errors}
              containerClass="mb-2"
            />
          </div>
        </Col>
        <Col xl={4} lg={4} md={4}>
          <div className="mb-2">
            <FormInput
              label="Production Order No."
              type="text"
              name="production_order_no"
              register={register}
              control={control}
              errors={errors}
              containerClass="mb-2"
            />
          </div>
        </Col>
      </Row>
      <Row>
        <Col xl={4} lg={4} md={4}>
          <div className="mb-2">
            <Form.Label>Has jug test been completed?</Form.Label>
            <div className="d-flex">
              <Controller
                name="is_jug_tested"
                control={control}
                defaultValue={defaultValues?.is_jug_tested ?? false}
                render={({ field }) => (
                  <>
                    <Form.Check
                      type="radio"
                      label="Yes"
                      value="true"
                      checked={field.value === true}
                      onChange={() => field.onChange(true)}
                    />
                    <Form.Check
                      type="radio"
                      label="No"
                      value="false"
                      checked={field.value === false}
                      onChange={() => field.onChange(false)}
                      className="ms-3"
                    />
                  </>
                )}
              />
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col xl={12} lg={12} md={12}>
          <div className="mb-2">
            <JoditEditor
              config={JODIT_TEXT_EDITOR_CONFIG}
              value={defaultValues?.notes ?? ''}
              onChange={(value) => {
                setValue('notes', value ?? '');
              }}
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

export default ProductionForm;
