/* eslint-disable react/prop-types */
import React from 'react';
import { Row, Col, Card, FormLabel, Button } from 'react-bootstrap';
import { FormInput } from '../../../../components';

const LabTestParamsForm = ({
  testParams,
  register,
  control,
  errors,
  navigateToLabSamplesList,
  submitted,
}: any) => {
  return (
    <>
      <Card>
        <Card.Header as="h5" className="text-primary-color">
          Test Parameters
        </Card.Header>
        <Card.Body>
          <Row key="param-row" className="row-custom ">
            {testParams?.map(
              (param: any) =>
                !('sub_params' in param) && (
                  <Col md="3" xs="6" className="mb-2" key={param.key}>
                    <FormLabel>
                      <h5>{param.name}</h5>
                    </FormLabel>
                    <div className="input-group flex-nowrap">
                      <FormInput
                        type="text"
                        name={`results[${param.key}]`}
                        register={register}
                        control={control}
                        errors={errors}
                        className="form-control-md"
                      />
                      <span className="input-group-text">
                        {param.unit ? param.unit : '-'}
                      </span>
                    </div>
                  </Col>
                )
            )}
          </Row>
        </Card.Body>
      </Card>

      {testParams?.map(
        (param: any) =>
          param?.sub_params?.length > 0 && (
            <Card>
              <Card.Header as="h5" className="text-primary-color">
                {param.name}
              </Card.Header>
              <Card.Body>
                <div key={param.key} className="border-1 border-gray-300 mb-2 ">
                  <div className="row">
                    {param?.sub_params?.map((item: any) => (
                      <Col
                        md="3"
                        xs="6"
                        className="mb-2"
                        key={`${param.key}-${item.key}`}>
                        <FormLabel>{item.name}</FormLabel>
                        <div className="input-group flex-nowrap">
                          <FormInput
                            type="text"
                            name={`results[${param.key}][${item.key}]`}
                            register={register}
                            control={control}
                            errors={errors}
                            className="form-control-md"
                          />
                          <span className="input-group-text">
                            {item.unit ? item.unit : '-'}
                          </span>
                        </div>
                      </Col>
                    ))}
                  </div>
                </div>
              </Card.Body>
            </Card>
          )
      )}

      {/* <Card>
        <Card.Body>
          <Row>
            <Col className="mb-2">
              <FormInput
                label="Comments"
                type="textarea"
                name="comments"
                placeholder="Comments"
                register={register}
                control={control}
                errors={errors}
              />
            </Col>
          </Row>
        </Card.Body>
      </Card> */}

      <Row key="btn-row">
        <Col>
          <div className="float-end button-list mb-3">
            <Button
              variant="outline"
              className="btn btn-ghost"
              onClick={navigateToLabSamplesList}>
              <i className="bx bx-x me-1" />
              Cancel
            </Button>
            <Button
              variant="secondary"
              className="btn btn-secondary"
              type="submit"
              disabled={submitted}>
              <i className="bx bx-save me-1" />
              Save
            </Button>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default LabTestParamsForm;
