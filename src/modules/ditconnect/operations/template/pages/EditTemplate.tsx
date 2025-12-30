import React from 'react';
import { Card } from 'react-bootstrap';
import PageTitle from '@uhub/components/PageTitle';
import { useParams } from 'react-router-dom';
import CustomLoader from '@uhub/components/CustomLoader';
import ErrorMessage from '@uhub/components/ErrorMessage';
import { prepareDynamicUrl } from '@uhub/helpers';
import { TEMPLATE_EDIT, TEMPLATE_LIST } from '../constants/constant';
import TemplateForm from './TemplateForm';
import useReadTemplate from '../hooks/useReadTemplate';

const EditTemplate: React.FC = () => {
  const { id } = useParams();

  const title: string = 'Template';
  const { data, isFetching, isError } = useReadTemplate(id);

  if (isFetching || !data) return <CustomLoader />;

  if (isError) return <ErrorMessage />;

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: `${title}`, path: TEMPLATE_LIST, active: false },
          {
            label: `Edit ${title}`,
            path: prepareDynamicUrl(TEMPLATE_EDIT, id),
            active: true,
          },
        ]}
        title={`Edit ${title}`}
      />
      <Card>
        <Card.Body>
          {data && (
            <TemplateForm
              defaultValues={{
                title: data.title,
                inputFields: data.template_items.map((template) => ({
                  id: template.id,
                  form_label: template.form_label,
                  input_type_id: template.input_type_id,
                  response_set_id: template.input_type!.id,
                  ...JSON.parse(template.options),
                })),
              }}
            />
          )}
        </Card.Body>
      </Card>
    </>
  );
};

export default EditTemplate;
