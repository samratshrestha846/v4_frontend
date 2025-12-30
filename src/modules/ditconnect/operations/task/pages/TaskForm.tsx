import React, { useEffect } from 'react';
import CustomDatePicker from '@uhub/components/CustomDatePicker';
import { Row, Col, Form } from 'react-bootstrap';
import CancelButton from '@uhub/components/Form/CancelButton';
import SubmitButton from '@uhub/components/Form/SubmitButton';
import BackendValidationMessage from '@uhub/components/BackendValidationMessage';
import ReactSelect from '@uhub/components/ReactSelect';
import JoditEditor from 'jodit-react';
import { Controller } from 'react-hook-form';
import { TASK_TYPE, TaskFormProps, taskTypeOptions } from '../types/Task';
import useTaskForm from '../hooks/useTaskForm';
import { JODIT_TEXT_EDITOR_CONFIG } from '../../../../../constants/editorConstants';
import MultipleTaskForm from '../components/MultipleTaskForm';
import useSupplementTransferFieldArray from '../hooks/useSupplementTransferFieldArray';
import useUdoseInstallationFieldArray from '../hooks/useUdoseInstallationFieldArray';
import useUrlFilters from '../../../hooks/useUrlFilters';

type Props = {
  defaultValues: TaskFormProps;
};
const TaskForm: React.FC<Props> = ({ defaultValues }) => {
  const {
    isEdit,
    type,
    register,
    control,
    errors,
    handleSubmit,
    serverValidationError,
    setServerValidationError,
    submitted,
    navigateToList,
    onSubmit,
    userOptions,
    setValue,
  } = useTaskForm(defaultValues);

  const { formConfig: supplementFormConfig } =
    useSupplementTransferFieldArray(control);
  const { formConfig: udoseInstallationConfig } =
    useUdoseInstallationFieldArray();

  const [filters] = useUrlFilters();

  useEffect(() => {
    if (filters?.type) {
      setValue('type', filters.type);
    }
  }, [filters]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {serverValidationError && (
        <BackendValidationMessage
          setServerValidationError={setServerValidationError}
        />
      )}
      <Row>
        <Col xl={6} lg={6} md={6} className="mb-3">
          <CustomDatePicker
            label="Date"
            name="date"
            defaultSelected={new Date()}
            maxDate={new Date()}
            control={control}
            errors={errors}
          />
        </Col>
        <Col xl={6} lg={6} md={6} className="mb-3">
          <ReactSelect
            name="type"
            label="Type"
            errors={errors}
            control={control}
            options={taskTypeOptions ?? []}
            defaultSelected={taskTypeOptions?.find(
              (item: any) =>
                item.value === defaultValues?.type ||
                item.value === filters.type
            )}
            isDisabled={isEdit}
            isClearable
          />
        </Col>
        <Col xl={6} lg={6} md={6} className="mb-3">
          <ReactSelect
            name="assigned_to"
            label="Assigned To"
            errors={errors}
            control={control}
            options={userOptions ?? []}
            defaultSelected={userOptions?.find(
              (item: any) => item.value === defaultValues?.assigned_to
            )}
          />
        </Col>
        <Col md={12}>
          <Form.Label>Notes</Form.Label>
          <div className="mb-2">
            <Controller
              name="notes"
              control={control}
              render={({ field }) => (
                <JoditEditor
                  config={JODIT_TEXT_EDITOR_CONFIG}
                  value={field.value || ''}
                  onChange={(value) => field.onChange(value ?? '')}
                />
              )}
            />
          </div>
        </Col>
        {type && (
          <Col md={12}>
            <MultipleTaskForm
              formKey="descriptions"
              formTitle={`${type} Description`}
              control={control}
              errors={errors}
              register={register}
              config={
                type === TASK_TYPE.SUPPLEMENT_TRANSFER
                  ? supplementFormConfig
                  : udoseInstallationConfig
              }
            />
          </Col>
        )}
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

export default TaskForm;
