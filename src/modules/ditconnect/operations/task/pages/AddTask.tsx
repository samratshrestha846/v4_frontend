import React from 'react';
import { Card } from 'react-bootstrap';
import PageTitle from '@uhub/components/PageTitle';
import { TASK_ADD, TASK_LIST } from '../constants/constant';
import TaskForm from './TaskForm';
import { TaskFormProps } from '../types/Task';

const AddTask: React.FC = () => {
  const title: string = 'Task';
  const defaultValues: TaskFormProps = {
    date: new Date(),
    descriptions: [],
    type: '',
    assigned_to: null,
    notes: null,
  };
  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: `${title}`, path: TASK_LIST, active: false },
          {
            label: `Add ${title}`,
            path: TASK_ADD,
            active: true,
          },
        ]}
        title={`Add ${title}`}
      />
      <Card>
        <Card.Body>
          <TaskForm defaultValues={defaultValues} />
        </Card.Body>
      </Card>
    </>
  );
};

export default AddTask;
