import React from 'react';
import { Card } from 'react-bootstrap';
import PageTitle from '@uhub/components/PageTitle';
import { TEMPLATE_ADD, TEMPLATE_LIST } from '../constants/constant';
import TemplateForm from './TemplateForm';
import { DEFAULT_INPUT_FIELDS, TemplateFormProps } from '../types/Template';

const AddTemplate: React.FC = () => {
  const title: string = 'Template';
  const defaultValues: TemplateFormProps = {
    title: null,
    inputFields: [DEFAULT_INPUT_FIELDS],
  };
  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: `${title}`, path: TEMPLATE_LIST, active: false },
          {
            label: `Add ${title}`,
            path: TEMPLATE_ADD,
            active: true,
          },
        ]}
        title={`Add ${title}`}
      />
      <Card>
        <Card.Body>
          <TemplateForm defaultValues={defaultValues} />
        </Card.Body>
      </Card>
    </>
  );
};

export default AddTemplate;
