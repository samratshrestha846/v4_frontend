import React from 'react';
import { Card } from 'react-bootstrap';
import PageTitle from '@uhub/components/PageTitle';
import { WORK_DIARY_ADD, WORK_DIARY_LIST } from '../constants/constant';
import WorkDiaryForm from './WorkDiaryForm';
import { WorkDiaryFormProps } from '../types/WorkDiary';
import { TRAVEL_DIARY_DEFAULT_VALUES } from '../../travel-diary/constants/constant';

const AddWorkDiary: React.FC = () => {
  const title: string = 'Daily Diary';
  const defaultValues: WorkDiaryFormProps = {
    date: null,
    total_hours: null,
    kms_driven: null,
    non_rnd_description: null,
    non_rnd_hours: null,
    used_company_vehicle: false,
    // R&D Fields' default values
    rnds: [],
    // Travel Diary Fields' default values
    travel_diaries: TRAVEL_DIARY_DEFAULT_VALUES,
  };
  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: `${title}`, path: WORK_DIARY_LIST, active: false },
          {
            label: `Add ${title}`,
            path: WORK_DIARY_ADD,
            active: true,
          },
        ]}
        title={`Add ${title}`}
      />
      <Card>
        <Card.Body>
          <WorkDiaryForm defaultValues={defaultValues} />
        </Card.Body>
      </Card>
    </>
  );
};

export default AddWorkDiary;
