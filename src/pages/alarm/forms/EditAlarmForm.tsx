import React, { SetStateAction } from 'react';
import { Col, Row, Form } from 'react-bootstrap';
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';

import ReactSelect from '../../../components/ReactSelect';
import { FormInput } from '../../../components';
import TextEditor from '../../../components/TextEditor';

import {
  SEVERITY_LEVEL_OPTIONS,
  VISIBILITY_OPTIONS,
  VISIBILITY_OPTIONS_BOOLEAN,
} from '../../../constants/alarmConstants';
import OPTIONS, {
  STATUS_OPTIONS_BOOLEAN,
} from '../../../constants/statusOptions';
import { AlarmFormValues, Alarm } from '../../../types/alarm/alarm';

type Props = {
  control: Control<AlarmFormValues>;
  errors: FieldErrors<AlarmFormValues>;
  register: UseFormRegister<AlarmFormValues>;
  alarmDetail: Alarm | undefined;
  setPotentialAction: React.Dispatch<SetStateAction<string>>;
  editorRef: any;
};

const EditAlarmForm: React.FC<Props> = ({
  register,
  errors,
  control,
  alarmDetail,
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
              defaultSelected={SEVERITY_LEVEL_OPTIONS?.find(
                (element) => element.value === alarmDetail?.severity_level
              )}
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
              defaultSelected={OPTIONS?.find(
                (element) => element.value === alarmDetail?.status
              )}
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
              defaultSelected={VISIBILITY_OPTIONS?.find(
                (element: any) =>
                  element.value === alarmDetail?.visible_to_customers
              )}
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
              content={alarmDetail?.potential_actions}
              setContent={setPotentialAction}
              editorRef={editorRef}
            />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default EditAlarmForm;
