import React from 'react';
import { Card } from 'react-bootstrap';
import PageTitle from '@uhub/components/PageTitle';
import { useParams } from 'react-router-dom';
import CustomLoader from '@uhub/components/CustomLoader';
import ErrorMessage from '@uhub/components/ErrorMessage';
import { prepareDynamicUrl } from '@uhub/helpers';
import { LAB_SAMPLE_EDIT, LAB_SAMPLE_LIST } from '../constants/constant';
import LabSampleForm from './LabSampleForm';
import useReadLabSample from '../hooks/useReadLabSample';
import { LabSampleFormProps, LabSampleResponse } from '../types/LabSample';

const EditLabSample: React.FC = () => {
  const { id } = useParams();

  const title: string = 'Lab Sample';
  const { data, isFetching, isError } = useReadLabSample(id);

  const prepareDefaultValues = (
    fetchedData: LabSampleResponse
  ): LabSampleFormProps => {
    const values = {
      ...data,
      collected_at: fetchedData.collected_at
        ? new Date(fetchedData.collected_at)
        : null,
      received_datetime: fetchedData.received_datetime
        ? new Date(fetchedData.received_datetime)
        : null,
      uploadedImages: fetchedData.lab_sample_photos ?? [],
    };
    delete values.sample_taken_by;
    delete values.lab_sample_photos;
    delete values.approved_by;
    return values as LabSampleFormProps;
  };

  if (isFetching || !data) return <CustomLoader />;

  if (isError) return <ErrorMessage />;

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: `${title}`, path: LAB_SAMPLE_LIST, active: false },
          {
            label: `Edit ${title}`,
            path: prepareDynamicUrl(LAB_SAMPLE_EDIT, id),
            active: true,
          },
        ]}
        title={`Edit ${title}`}
      />
      <Card>
        <Card.Body>
          {data && <LabSampleForm defaultValues={prepareDefaultValues(data)} />}
        </Card.Body>
      </Card>
    </>
  );
};

export default EditLabSample;
