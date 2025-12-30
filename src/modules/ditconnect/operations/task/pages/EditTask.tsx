import React from 'react';
import { Card } from 'react-bootstrap';
import PageTitle from '@uhub/components/PageTitle';
import { useParams } from 'react-router-dom';
import CustomLoader from '@uhub/components/CustomLoader';
import ErrorMessage from '@uhub/components/ErrorMessage';
import { prepareDynamicUrl } from '@uhub/helpers';
import { TASK_EDIT, TASK_LIST } from '../constants/constant';
import TaskForm from './TaskForm';
import useReadTask from '../hooks/useReadTask';
import { TaskFormProps, TaskWithStatus } from '../types/Task';

const EditTask: React.FC = () => {
  const { id } = useParams();

  const title: string = 'Task';
  const { data, isFetching, isError } = useReadTask(id);

  if (isFetching || !data) return <CustomLoader />;

  if (isError) return <ErrorMessage />;
  const defaultValues: TaskFormProps = {
    date: new Date(data?.date),
    type: data?.type,
    assigned_to: data.assigned_to!.id,
    notes: data.notes,
    descriptions: data.task_descriptions.map((d: TaskWithStatus) =>
      JSON.parse(d.description)
    ),
  };
  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: `${title}`, path: TASK_LIST, active: false },
          {
            label: `Edit ${title}`,
            path: prepareDynamicUrl(TASK_EDIT, id),
            active: true,
          },
        ]}
        title={`Edit ${title}`}
      />
      <Card>
        <Card.Body>
          {data && <TaskForm defaultValues={defaultValues} />}
        </Card.Body>
      </Card>
    </>
  );
};

export default EditTask;
