import React from 'react';
import { Card } from 'react-bootstrap';
import moment from 'moment';
import PageTitle from '@uhub/components/PageTitle';
import { useParams } from 'react-router-dom';
import CustomLoader from '@uhub/components/CustomLoader';
import ErrorMessage from '@uhub/components/ErrorMessage';
import { prepareDynamicUrl } from '@uhub/helpers';
import { WORK_DIARY_EDIT, WORK_DIARY_LIST } from '../constants/constant';
import WorkDiaryForm from './WorkDiaryForm';
import useReadWorkDiary from '../hooks/useReadWorkDiary';
import { RnDResponse, WorkDiaryFormProps } from '../types/WorkDiary';
import { TRAVEL_DIARY_DEFAULT_VALUES } from '../../travel-diary/constants/constant';

const EditWorkDiary: React.FC = () => {
  const { id } = useParams();

  const title: string = 'Daily Diary';
  const { data, isFetching, isError } = useReadWorkDiary(id);

  if (isFetching || !data) return <CustomLoader />;

  if (isError) return <ErrorMessage />;

  const prepareDefaultValues = (fetchedData: any) => {
    const trasnformedData: WorkDiaryFormProps = {
      date: fetchedData.date,
      total_hours: fetchedData.total_hours,
      kms_driven: fetchedData.kms_driven,
      non_rnd_description: fetchedData.non_rnd_description,
      non_rnd_hours: fetchedData.non_rnd_hours,
      rnds: fetchedData.rnds.map((rnd: RnDResponse) => ({
        id: rnd.id,
        rnd_activity_id: rnd.rnd_activity_id,
        rnd_description: rnd.rnd_description,
        rnd_hours: rnd.rnd_hours,
        group: rnd.activity.group,
      })),
      travel_diaries: fetchedData.travel_diaries
        ? { ...fetchedData.travel_diaries }
        : TRAVEL_DIARY_DEFAULT_VALUES,
    };
    trasnformedData.total_hours = fetchedData.total_hours;
    trasnformedData.date = new Date(fetchedData.date);
    trasnformedData.used_company_vehicle = !!fetchedData.travel_diaries;

    if (fetchedData.travel_diaries) {
      trasnformedData.travel_diaries.total_kms = trasnformedData.travel_diaries
        ? trasnformedData.travel_diaries.total_kms
        : 0;
      trasnformedData.travel_diaries.start_time = trasnformedData.travel_diaries
        ? new Date(
            moment(
              `${trasnformedData.travel_diaries.date} ${trasnformedData.travel_diaries.start_time}:00`
            ).format('YYYY-MM-DD HH:mm:ss')
          )
        : null;

      trasnformedData.travel_diaries.end_time = trasnformedData.travel_diaries
        ? new Date(
            moment(
              `${trasnformedData.travel_diaries.date} ${trasnformedData.travel_diaries.end_time}:00`
            ).format('YYYY-MM-DD HH:mm:ss')
          )
        : null;
    }
    return trasnformedData;
  };

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: `${title}`, path: WORK_DIARY_LIST, active: false },
          {
            label: `Edit ${title}`,
            path: prepareDynamicUrl(WORK_DIARY_EDIT, id),
            active: true,
          },
        ]}
        title={`Edit ${title}`}
      />
      <Card>
        <Card.Body>
          {data && <WorkDiaryForm defaultValues={prepareDefaultValues(data)} />}
        </Card.Body>
      </Card>
    </>
  );
};

export default EditWorkDiary;
