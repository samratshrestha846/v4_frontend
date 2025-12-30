import React from 'react';
import { useFieldArray } from 'react-hook-form';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { DynamicFormConfig } from '../types/dynamicForm';
import DynamicFormRow from './DynamicFormRow';

type DynamicFormProps = {
  formKey: string;
  formTitle: string;
  config: DynamicFormConfig;
  control: any;
  errors: any;
  register: any;
  formType?: 'grid' | 'row';
};

const DynamicForm: React.FC<DynamicFormProps> = ({
  formKey,
  formTitle,
  config,
  control,
  errors,
  register,
  formType = 'grid',
}) => {
  const {
    fields: formFields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: formKey,
  });
  const removeButton = (index: number) => (
    <Col xl={2} lg={2} md={6} className="mb-3">
      <Button variant="danger" onClick={() => remove(index)}>
        <i className="bx bx-trash" />
      </Button>
    </Col>
  );
  return (
    <Card>
      <Card.Header>
        <h5 className="text-primary-color m-0">
          <span className="text-nowrap">{formTitle}</span>
        </h5>
      </Card.Header>
      <Card.Body>
        {formFields.map((formField: any, index: number) => (
          <DynamicFormRow
            key={formField.id}
            formField={formField}
            index={index}
            config={config}
            formKey={formKey}
            control={control}
            errors={errors}
            register={register}
            otherComponent={removeButton(index)}
            colXl={formType === 'row' ? 2 : 4}
            colLg={formType === 'row' ? 2 : 4}
            colMd={formType === 'row' ? 4 : 6}
          />
        ))}
        <Row>
          <Col xl={12} lg={12} md={12} className="mb-3">
            <Button
              variant="secondary"
              onClick={() => append(config.defaultValues)}>
              <i className="bx bx-plus" /> Add Item
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default DynamicForm;
