import React, { SetStateAction } from 'react';
import { Form, Col, Row } from 'react-bootstrap';
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';

import ReactSelect from '../../../components/ReactSelect';
import { FormInput } from '../../../components';
import TextEditor from '../../../components/TextEditor';

import {
  SEVERITY_LEVEL_OPTIONS,
  VISIBILITY_OPTIONS_BOOLEAN,
} from '../../../constants/alarmConstants';
import { STATUS_OPTIONS_BOOLEAN } from '../../../constants/statusOptions';
import { AlarmFormValues } from '../../../types/alarm/alarm';

type Props = {
  control: Control<AlarmFormValues>;
  errors: FieldErrors<AlarmFormValues>;
  register: UseFormRegister<AlarmFormValues>;
  potentialAction: string;
  setPotentialAction: React.Dispatch<SetStateAction<string>>;
  editorRef: any;
};

const CreateAlarmForm: React.FC<Props> = ({
  register,
  errors,
  control,
  potentialAction,
  setPotentialAction,
  editorRef,
}) => {
  return (
    <>
      <Row>
        <Col sm={4} md={4}>
          <div className="mb-2">
            <ReactSelect
              name="severity_level"
              label="Severity Level"
              errors={errors}
              control={control}
              options={SEVERITY_LEVEL_OPTIONS}
            />
          </div>
        </Col>
        <Col sm={4} md={4}>
          <FormInput
            label="Alarm Code"
            type="number"
            name="alarm_code"
            placeholder="Enter Alarm Code"
            register={register}
            key="alarm_code"
            errors={errors}
            control={control}
            containerClass="mb-2"
          />
        </Col>
        <Col sm={4} md={4}>
          <div className="mb-2">
            <ReactSelect
              name="status"
              label="Status"
              errors={errors}
              control={control}
              options={STATUS_OPTIONS_BOOLEAN}
            />
          </div>
        </Col>

        <Col sm={4} md={4}>
          <div className="mb-2">
            <ReactSelect
              name="visible_to_customers"
              label="External Visibility"
              errors={errors}
              control={control}
              options={VISIBILITY_OPTIONS_BOOLEAN}
            />
          </div>
        </Col>

        <Col sm={8} md={8}>
          <div className="mb-2">
            <FormInput
              label="Description"
              type="textarea"
              name="description"
              placeholder="Text Here..."
              register={register}
              key="description"
              errors={errors}
              control={control}
              containerClass="mb-2"
            />
          </div>
        </Col>
      </Row>
      <Row>
        <Col sm={12} md={12}>
          <Form.Label> Potential Action </Form.Label>
          <div className="mb-3">
            <TextEditor
              placeholder="Text Here..."
              content={potentialAction}
              setContent={setPotentialAction}
              editorRef={editorRef}
            />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default CreateAlarmForm;
