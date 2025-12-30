/* eslint-disable react/prop-types */
import React, { Dispatch, SetStateAction } from 'react';
import { Row, Col, Button, ListGroup, Form } from 'react-bootstrap';
import { FormInput } from '../../../../../components';
import { Property } from '../../../../../types/property/propertyList';

type Props = {
  register: any;
  control: any;
  errors: any;
  property?: Property;
  setIsSettingsEditEnabled: Dispatch<SetStateAction<boolean>>;
  submitted?: boolean;
};

const OptiweighSettingsForm: React.FC<Props> = ({
  register,
  control,
  errors,
  property,
  setIsSettingsEditEnabled,
  submitted,
}) => {
  return (
    <>
      <ListGroup className="">
        <ListGroup.Item className="d-flex justify-content-between align-items-center border-0 p-1">
          <div className="d-flex gap-1 justify-content-between align-items-center">
            <h5 className="m-0 text-grey fw-normal"> Enable</h5>
          </div>
          <span className="text-grey fw-bold">
            <FormInput
              type="checkbox"
              name="is_enable"
              register={register}
              control={control}
              errors={errors}
              className="custom-switch form-check form-switch"
              defaultChecked={property?.settings?.optiweigh?.is_enable}
            />
          </span>
        </ListGroup.Item>
        <ListGroup.Item className="d-flex justify-content-between align-items-center border-0 p-1">
          <div className="d-flex gap-1 justify-content-between align-items-center">
            <h5 className="m-0 text-grey fw-normal">Client ID</h5>
          </div>
          <span className="text-grey fw-bold">
            <FormInput
              register={register}
              control={control}
              errors={errors}
              name="client_id"
              type="text"
              defaultValue={property?.settings?.optiweigh?.client_id}
            />
            {errors && errors?.file && (
              <Form.Control.Feedback type="invalid" className="d-block">
                {errors?.file?.message}
              </Form.Control.Feedback>
            )}
          </span>
        </ListGroup.Item>
      </ListGroup>
      <Row className="">
        <Col>
          <div className="float-end button-list my-2">
            <Button
              variant="outline"
              className=" btn btn-ghost btn-sm"
              onClick={() => setIsSettingsEditEnabled(false)}>
              <i className="bx bx-x me-1" />
              Cancel
            </Button>
            <Button
              variant="secondary"
              className="btn btn-secondary btn-sm"
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

export default OptiweighSettingsForm;
