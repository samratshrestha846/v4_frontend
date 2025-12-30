/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useFieldArray } from 'react-hook-form';

import Collapsible from '@uhub/components/Accordion/Collapsible';
import ActionDropdown from '@uhub/components/ActionDropdown';
import { CustomDropdownMenuItem } from '@uhub/types/common';
import { Button, Col } from 'react-bootstrap';
import BackendValidationMessage from '@uhub/components/BackendValidationMessage';
import { DynamicFormConfig } from '../../../types/dynamicForm';
import DynamicFormRow from '../../../components/DynamicFormRow';

type Props = {
  formKey: string;
  formTitle: string;
  config: DynamicFormConfig;
  control: any;
  errors: any;
  register: any;
};
const MultipleTaskForm: React.FC<Props> = ({
  formKey,
  formTitle,
  config,
  control,
  errors,
  register,
}) => {
  const {
    fields: formFields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: formKey,
  });

  const menuItems: CustomDropdownMenuItem[] = [
    {
      label: `Remove ${formTitle}`,
      icon: 'bx bx-x',
      actionMethod: remove,
      permission: true as any,
    },
  ];

  useEffect(() => {
    if (formFields?.length === 0) {
      append(config.defaultValues);
    }
  }, []);

  return (
    <Col md={12}>
      <h5 className="my-3 text-uppercase text-soft-gray">{formTitle}</h5>
      {formFields?.map((formField, indexKey) => (
        <Collapsible
          key={indexKey}
          isDefaultOpen
          title={`${formTitle} ${indexKey + 1}`}
          cardClass="">
          <ActionDropdown
            icon="bx bx-dots-vertical-rounded"
            containerClass="custom-dropdown text-end"
            menuItems={menuItems}
          />
          {Array.isArray(errors?.[formKey]) &&
            errors?.[formKey].map((error: { message: string }, i: number) => (
              <BackendValidationMessage
                key={i}
                setServerValidationError={errors}
                errorMessage={error.message}
              />
            ))}
          <DynamicFormRow
            config={config}
            control={control}
            formField={formField}
            formKey={formKey}
            errors={errors}
            register={register}
            index={indexKey}
          />
        </Collapsible>
      ))}
      <p className="text-center mt-3">No task descriptions available.</p>

      <div className="d-flex justify-content-center align-items-center my-2">
        <Button
          variant=""
          onClick={() => append(config.defaultValues)}
          className="border-dashed-success px-5"
          size="sm">
          <i className="bx bx-plus ms-1 text-success" />
          <span className="text-success">Add {formTitle}</span>
        </Button>
      </div>
    </Col>
  );
};

export default MultipleTaskForm;
