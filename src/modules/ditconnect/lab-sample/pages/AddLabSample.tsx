import React from 'react';
import { Card } from 'react-bootstrap';
import PageTitle from '@uhub/components/PageTitle';
import { LAB_SAMPLE_ADD, LAB_SAMPLE_LIST } from '../constants/constant';
import LabSampleForm from './LabSampleForm';
import { LabSampleFormProps } from '../types/LabSample';

const AddLabSample: React.FC = () => {
  const title: string = 'Lab Sample';
  const defaultValues: LabSampleFormProps = {
    latitude: null,
    longitude: null,
    animal_bcs: null,
    animal_specs: null,
    collected_at: null,
    customer_property_id: null,
    device_serial_number: null,
    dung_freshness_score: null,
    sample_taken_from: null,
    faecal_score: null,
    notes: null,
    number_of_cattle: null,
    other_site: null,
    ph_value: null,
    plant_species: null,
    received_datetime: null,
    sample_type_id: null,
    site_id: null,
    site_name: null,
    status: null,
    updated_at: null,
    used_tablespoon_collection: 0,
    images: null,
  };

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: `${title}`, path: LAB_SAMPLE_LIST, active: false },
          {
            label: `Add ${title}`,
            path: LAB_SAMPLE_ADD,
            active: true,
          },
        ]}
        title={`Add ${title}`}
      />
      <Card>
        <Card.Body>
          <LabSampleForm defaultValues={defaultValues} />
        </Card.Body>
      </Card>
    </>
  );
};

export default AddLabSample;
