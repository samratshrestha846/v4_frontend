import React from 'react';
import { Card } from 'react-bootstrap';
import PageTitle from '@uhub/components/PageTitle';
import { useParams } from 'react-router-dom';
import CustomLoader from '@uhub/components/CustomLoader';
import ErrorMessage from '@uhub/components/ErrorMessage';
import { TEMPLATE_LIST, TEMPLATE_VIEW } from '../constants/constant';
import useReadTemplate from '../hooks/useReadTemplate';
import TemplateInfo from './TemplateInfo';

const ViewTemplate: React.FC = () => {
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
            label: data.title,
            path: TEMPLATE_VIEW,
            active: true,
          },
        ]}
        title={`View ${title}`}
      />
      <Card>
        <Card.Body>
          <TemplateInfo template={data} />
        </Card.Body>
      </Card>
    </>
  );
};

export default ViewTemplate;
