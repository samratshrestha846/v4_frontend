/* eslint-disable react/prop-types */
import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import ReactDatePicker from 'react-datepicker';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { CeresTagUpdateFormFields } from '../../../types/ceresTag/ceresTag';

type Props = {
  control: Control<CeresTagUpdateFormFields>;
  errors: FieldErrors<CeresTagUpdateFormFields>;
};

const CeresTagUpdateOnAnimalForm: React.FC<Props> = ({ control, errors }) => {
  return (
    <>
      <Row>
        <Col className="mb-2">
          <Form.Group>
            <Form.Label> Last Animal Taken Off At</Form.Label>
            <Controller
              name="last_animal_taken_off_at"
              key="last_animal_taken_off_at"
              control={control}
              render={({ field }) => (
                <ReactDatePicker
                  dateFormat="dd/MM/yyyy hh:mm:ss aa"
                  timeFormat="p"
                  timeIntervals={15}
                  className="form-control mb-2"
                  maxDate={new Date()}
                  placeholderText="Select Date"
                  onChange={(date) => field.onChange(date)}
                  selected={field.value as any}
                  showTimeSelect
                  onKeyDown={(e) => {
                    e.preventDefault();
                  }}
                />
              )}
            />
            {errors && errors.last_animal_taken_off_at ? (
              <Form.Control.Feedback
                type="invalid"
                style={{ display: 'block' }}>
                {errors.last_animal_taken_off_at.message}
              </Form.Control.Feedback>
            ) : null}
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col className="mb-2">
          <Form.Group>
            <Form.Label> Last Animal Put On At</Form.Label>
            <Controller
              name="last_animal_updated_at"
              key="last_animal_updated_at"
              defaultValue={new Date()}
              control={control}
              render={({ field }) => (
                <ReactDatePicker
                  dateFormat="dd/MM/yyyy hh:mm:ss aa"
                  timeFormat="p"
                  timeIntervals={15}
                  className="form-control mb-2"
                  maxDate={new Date()}
                  placeholderText="Select Date"
                  onChange={(date) => field.onChange(date)}
                  selected={field.value as any}
                  showTimeSelect
                  onKeyDown={(e) => {
                    e.preventDefault();
                  }}
                />
              )}
            />
            {errors && errors.last_animal_updated_at ? (
              <Form.Control.Feedback
                type="invalid"
                style={{ display: 'block' }}>
                {errors.last_animal_updated_at.message}
              </Form.Control.Feedback>
            ) : null}
          </Form.Group>
        </Col>
      </Row>
    </>
  );
};

export default CeresTagUpdateOnAnimalForm;
