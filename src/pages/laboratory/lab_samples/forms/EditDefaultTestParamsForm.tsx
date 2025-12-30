/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { ChangeEvent } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';

import { FormInput } from '../../../../components';
import { capitalizeFirstLetter } from '../../../../helpers';

import { LabSampleFormValues } from '../../../../types/lab/labSampleList';
import {
  LabTestParams,
  Param,
  SubParam,
} from '../../../../types/lab/labTestParams';

type Props = {
  testParam: LabTestParams;
  register: UseFormRegister<LabSampleFormValues>;
  control: Control<LabSampleFormValues>;
  errors: FieldErrors<LabSampleFormValues>;
  handleSelectAll: (e: ChangeEvent<HTMLInputElement>) => void;
  selectedTestParam?: Record<
    string,
    { isSelectedAll: boolean; selectedKeys: Record<string, boolean> }
  >;
  propagateOnChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

type RenderParameterProps = {
  register: UseFormRegister<LabSampleFormValues>;
  control: Control<LabSampleFormValues>;
  errors: FieldErrors<LabSampleFormValues>;
  item: Param | SubParam;
  parentKey?: string;
  propagateOnChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  selectedTestParam?: Record<
    string,
    { isSelectedAll: boolean; selectedKeys: Record<string, boolean> }
  >;
};

const RenderParameter: React.FC<RenderParameterProps> = ({
  register,
  control,
  errors,
  item,
  parentKey,
  propagateOnChange,
  selectedTestParam,
}) => {
  return (
    <Col md="3" xs="6" className="mb-2" key={item.key}>
      <div className="d-flex items-align-center flex-nowrap">
        <FormInput
          label={item.unit ? `${item.name} (${item.unit})` : item.name}
          type="checkbox"
          name={
            parentKey
              ? `default_test_parameters[${parentKey}][${item.key}]`
              : `default_test_parameters[${item.key}]`
          }
          register={register}
          control={control}
          errors={errors}
          id={item.key}
          propagateOnChange={propagateOnChange}
          defaultChecked={
            parentKey
              ? selectedTestParam?.[parentKey]?.selectedKeys[item.key]
              : selectedTestParam?.default_params?.selectedKeys[item.key]
          }
        />
      </div>
    </Col>
  );
};

const EditDefaultTestParamsForm: React.FC<Props> = ({
  testParam,
  register,
  control,
  errors,
  handleSelectAll,
  selectedTestParam,
  propagateOnChange,
}) => {
  return (
    <>
      <Card>
        <Card.Header>
          <div className="d-flex justify-content-between items-align-center flex-nowrap">
            <h5 className="m-0 text-primary-color">
              Test Parameters
              {testParam?.test_type
                ? ` - ${capitalizeFirstLetter(testParam?.test_type)}`
                : null}
            </h5>
            <span className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                name="select_all[default_params]"
                value="default_params"
                onChange={handleSelectAll}
                checked={!!selectedTestParam?.default_params?.isSelectedAll}
              />
              <span className="text-primary-color fw-bold">Select All</span>
            </span>
          </div>
        </Card.Header>
        <Card.Body>
          <Row key="param-row" className="row-custom">
            {testParam?.params?.map(
              (param) =>
                !('sub_params' in param) && (
                  <RenderParameter
                    register={register}
                    control={control}
                    errors={errors}
                    item={param}
                    key={param.key}
                    propagateOnChange={propagateOnChange}
                    selectedTestParam={selectedTestParam}
                  />
                )
            )}
          </Row>
        </Card.Body>
      </Card>

      {testParam?.params?.map(
        (param) =>
          'sub_params' in param && (
            <Card key={param.name}>
              <Card.Header>
                <div className="d-flex justify-content-between items-align-center flex-nowrap">
                  <h5 className="m-0 text-primary-color"> {param.name}</h5>
                  <span className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name={`select_all[${param.key}]`}
                      value={param.key}
                      onChange={handleSelectAll}
                      checked={selectedTestParam?.[param.key]?.isSelectedAll}
                    />
                    <span className="text-primary-color fw-bold">
                      Select All
                    </span>
                  </span>
                </div>
              </Card.Header>
              <Card.Body>
                <div className="row mb-2 ">
                  {param?.sub_params?.map((subParam) => (
                    <RenderParameter
                      register={register}
                      control={control}
                      errors={errors}
                      item={subParam}
                      parentKey={param.key}
                      key={subParam.key}
                      propagateOnChange={propagateOnChange}
                      selectedTestParam={selectedTestParam}
                    />
                  ))}
                </div>
              </Card.Body>
            </Card>
          )
      )}
    </>
  );
};

export default EditDefaultTestParamsForm;
