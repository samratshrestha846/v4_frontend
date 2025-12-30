/* eslint-disable react/prop-types */
import React from 'react';
import { Row, Col, FormLabel, Card, Button } from 'react-bootstrap';
import ReactSelect from '../../../../components/ReactSelect';
import { FormInput } from '../../../../components';
import CustomDatePicker from '../../../../components/CustomDatePicker';

const EditLabTestResultForm = ({
  register,
  control,
  errors,
  userOptions,
  labTestResult,
  navigateToLabSampleView,
  submitted,
}: any) => {
  return (
    <>
      <Card>
        <Card.Body>
          <Row>
            <Col sm={6} className="react-select-form md-2">
              <ReactSelect
                control={control}
                errors={errors}
                label="Analysed By"
                name="analysed_by"
                options={userOptions}
                defaultSelected={userOptions?.find(
                  (val: any) => val.value === labTestResult?.analysed_by?.id
                )}
              />
            </Col>

            <Col sm={6} className="md-2">
              <CustomDatePicker
                label="Analysed On"
                name="analysed_date_time"
                control={control}
                errors={errors}
                defaultSelected={undefined}
              />
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <Card>
        <Card.Header as="h5" className="text-primary-color">
          Test Parameters
        </Card.Header>
        <Card.Body>
          <Row className="row-custom">
            {labTestResult?.results?.map(
              (result: any) =>
                !('sub_params' in result) && (
                  <Col md="3" xs="6" className="mb-2" key={result.key}>
                    <FormLabel>
                      <h5>{result.name}</h5>
                    </FormLabel>
                    <div className="input-group flex-nowrap">
                      <FormInput
                        type="text"
                        name={`results[${result.key}]`}
                        register={register}
                        control={control}
                        errors={errors}
                        className="form-control-md"
                        defaultValue={result.result}
                      />
                      <span className="input-group-text">
                        {result.unit ? result.unit : '-'}
                      </span>
                    </div>
                  </Col>
                )
            )}
          </Row>
        </Card.Body>
      </Card>

      {labTestResult?.results?.map(
        (result: any) =>
          'sub_params' in result && (
            <Card key={result.name}>
              <Card.Header as="h5" className="text-primary-color">
                {result.name}
              </Card.Header>
              <Card.Body>
                <div
                  key={result.key}
                  className="border-1 border-bottom border-gray-300 mb-2 ">
                  <div className="row">
                    {result?.sub_params?.map((item: any) => (
                      <Col
                        md="3"
                        xs="6"
                        className="mb-2"
                        key={`${result.key}-${item.key}`}>
                        <FormLabel>{item.name}</FormLabel>
                        <div className="input-group flex-nowrap">
                          <FormInput
                            type="text"
                            name={`results[${result.key}][${item.key}]`}
                            register={register}
                            control={control}
                            errors={errors}
                            className="form-control-md"
                            defaultValue={item.result}
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

      <Row>
        <Col>
          <div className="float-end button-list mb-3">
            <Button
              variant="outline"
              className="btn btn-ghost"
              onClick={navigateToLabSampleView}>
              <i className="bx bx-x me-1" />
              Cancel
            </Button>
            <Button
              variant="secondary"
              className="btn btn-secondary"
              type="submit"
              disabled={submitted}>
              <i className="bx bx-save  me-1" />
              Save
            </Button>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default EditLabTestResultForm;
