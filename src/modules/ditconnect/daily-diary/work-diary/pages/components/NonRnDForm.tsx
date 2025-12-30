/* eslint-disable react/prop-types */
import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import JoditEditor from 'jodit-react';

import { FormInput } from '@uhub/components';
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';

import Collapsible from '@uhub/components/Accordion/Collapsible';
import { WorkDiaryFormProps } from '../../types/WorkDiary';
import { JODIT_TEXT_EDITOR_CONFIG } from '../../../../../../constants/editorConstants';

type Props = {
  defaultValues: WorkDiaryFormProps;
  register: UseFormRegister<WorkDiaryFormProps>;
  control: Control<WorkDiaryFormProps>;
  errors: FieldErrors<WorkDiaryFormProps>;
  setValue: any;
};
const NonRnDForm: React.FC<Props> = ({
  defaultValues,
  register,
  control,
  errors,
  setValue,
}) => {
  return (
    <>
      <h5 className="my-3 text-uppercase text-soft-gray">Non-R&D Task</h5>
      <Collapsible isDefaultOpen title="Non-R&D Task" cardClass="">
        <Row>
          <Col sm={6} lg={4} md={4}>
            <FormInput
              label="Non-R&D Hours"
              type="number"
              name="non_rnd_hours"
              register={register}
              control={control}
              errors={errors}
              containerClass="mb-2"
              step="0.1"
            />
          </Col>
          <Col md={12}>
            <Form.Label>Non-R&D Description </Form.Label>
            <div className="mb-2">
              <JoditEditor
                config={JODIT_TEXT_EDITOR_CONFIG}
                value={defaultValues?.non_rnd_description ?? ''}
                onChange={(value) => {
                  setValue('non_rnd_description]', value ?? '', {
                    shouldValidate: true,
                  });
                }}
              />
            </div>
            {errors && errors?.non_rnd_description ? (
              <Form.Control.Feedback type="invalid" className="d-block">
                {errors?.non_rnd_description?.message}
              </Form.Control.Feedback>
            ) : null}
          </Col>
        </Row>
      </Collapsible>
    </>
  );
};

export default NonRnDForm;
