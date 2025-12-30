/* eslint-disable react/prop-types */
import React from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import JoditEditor from 'jodit-react';
import { FormInput } from '@uhub/components';
import {
  Control,
  FieldArrayWithId,
  FieldErrors,
  UseFormRegister,
} from 'react-hook-form';

import Collapsible from '@uhub/components/Accordion/Collapsible';
import ActionDropdown from '@uhub/components/ActionDropdown';
import { CustomDropdownMenuItem, LabelNumericValue } from '@uhub/types/common';
import ReactSelect from '@uhub/components/ReactSelect';
import { WorkDiaryFormProps } from '../../types/WorkDiary';
import { WORK_DIARY_GROUP_OPTIONS } from '../../constants/constant';

import { JODIT_TEXT_EDITOR_CONFIG } from '../../../../../../constants/editorConstants';

type Props = {
  defaultValues: WorkDiaryFormProps;
  register: UseFormRegister<WorkDiaryFormProps>;
  control: Control<WorkDiaryFormProps>;
  errors: FieldErrors<WorkDiaryFormProps>;
  rndFields: FieldArrayWithId<WorkDiaryFormProps, 'rnds', 'id'>[];
  addRnd: any;
  removeRnd: any;
  // eslint-disable-next-line no-unused-vars
  propagateOnGroupChange: (e: any) => void;
  activitiesOptions: LabelNumericValue[];
  setValue: any;
};
const RnDForm: React.FC<Props> = ({
  defaultValues,
  register,
  control,
  errors,
  rndFields,
  addRnd,
  removeRnd,
  propagateOnGroupChange,
  activitiesOptions,
  setValue,
}) => {
  const menuItems: CustomDropdownMenuItem[] = [
    {
      label: 'Remove R&D',
      icon: 'bx bx-x',
      actionMethod: removeRnd,
      permission: true as any,
    },
  ];

  return (
    <div>
      <h5 className="my-3 text-uppercase text-soft-gray">R&D Task</h5>
      <div
        className={
          errors && errors?.rnds?.message
            ? 'border border-danger border-1 px-1 py-2 rounded'
            : ''
        }>
        {rndFields?.map((_, indexKey) => (
          <Collapsible
            key={indexKey}
            isDefaultOpen
            title={`R&D Task ${indexKey + 1}`}
            cardClass="">
            <div className="d-flex justify-content-between align-items-start gap-3 flex-nowrap">
              <div className="d-block flex-grow-1">
                <Row key={indexKey}>
                  <Col sm={6} lg={4} md={4}>
                    <div className="mb-2">
                      <ReactSelect
                        label="Group"
                        name={`rnds[${indexKey}][group]`}
                        errors={errors}
                        control={control}
                        options={WORK_DIARY_GROUP_OPTIONS}
                        placeholder="Select"
                        isClearable
                        defaultSelected={WORK_DIARY_GROUP_OPTIONS?.find(
                          (item: any) =>
                            item.value ===
                            defaultValues?.rnds?.[indexKey]?.group
                        )}
                        propagateOnChange={propagateOnGroupChange}
                      />
                    </div>
                    {errors && errors.rnds?.[indexKey as any]?.group ? (
                      <Form.Control.Feedback type="invalid" className="d-block">
                        {errors.rnds?.[indexKey]?.group?.message}
                      </Form.Control.Feedback>
                    ) : null}
                  </Col>
                  <Col sm={6} lg={4} md={4}>
                    <div className="mb-2">
                      <ReactSelect
                        label="R&D Activity"
                        name={`rnds[${indexKey}][rnd_activity_id]`}
                        errors={errors}
                        control={control}
                        options={activitiesOptions ?? []}
                        placeholder="Select"
                        isClearable
                        defaultSelected={activitiesOptions?.find(
                          (item: any) =>
                            item.value ===
                            defaultValues?.rnds?.[indexKey]?.rnd_activity_id
                        )}
                        isValidationFailed={
                          !!errors?.rnds?.[indexKey]?.rnd_activity_id
                        }
                      />
                    </div>
                    {errors &&
                    errors.rnds?.[indexKey as any]?.rnd_activity_id ? (
                      <Form.Control.Feedback type="invalid" className="d-block">
                        {errors.rnds?.[indexKey]?.rnd_activity_id?.message}
                      </Form.Control.Feedback>
                    ) : null}
                  </Col>
                  <Col sm={6} lg={4} md={4}>
                    <FormInput
                      label="R&D Hours"
                      type="number"
                      name={`rnds[${indexKey}][rnd_hours]`}
                      register={register}
                      control={control}
                      errors={errors}
                      containerClass="mb-2"
                      step="0.1"
                      className={
                        errors?.rnds?.[indexKey]?.rnd_hours?.message
                          ? 'is-invalid'
                          : ''
                      }
                    />
                    {errors && errors.rnds?.[indexKey]?.rnd_hours ? (
                      <Form.Control.Feedback type="invalid" className="d-block">
                        {errors.rnds?.[indexKey]?.rnd_hours?.message}
                      </Form.Control.Feedback>
                    ) : null}
                  </Col>
                  <Col md={12}>
                    <Form.Label>R&D Description </Form.Label>
                    <div className="mb-2">
                      <JoditEditor
                        config={JODIT_TEXT_EDITOR_CONFIG}
                        value={
                          defaultValues?.rnds?.[indexKey]?.rnd_description ?? ''
                        }
                        onChange={(value) => {
                          setValue(
                            `rnds[${indexKey}][rnd_description]`,
                            value ?? ''
                          );
                        }}
                      />
                    </div>
                    {errors &&
                    errors.rnds?.[indexKey as any]?.rnd_description ? (
                      <Form.Control.Feedback type="invalid" className="d-block">
                        {errors.rnds?.[indexKey]?.rnd_description?.message}
                      </Form.Control.Feedback>
                    ) : null}
                  </Col>
                </Row>
              </div>
              <div>
                <ActionDropdown
                  icon="bx bx-dots-vertical-rounded"
                  containerClass="custom-dropdown"
                  menuItems={menuItems}
                />
              </div>
            </div>
          </Collapsible>
        ))}

        <div className="d-flex justify-content-center align-items-center my-2">
          <Button
            variant=""
            onClick={addRnd}
            className="border-dashed-success px-5"
            size="sm">
            <i className="bx bx-plus ms-1 text-success" />
            <span className="text-success">Add R&D Task</span>
          </Button>
        </div>
      </div>
      {errors && errors?.rnds ? (
        <Form.Control.Feedback type="invalid" className="d-block">
          {errors?.rnds?.message}
        </Form.Control.Feedback>
      ) : null}
    </div>
  );
};

export default RnDForm;
