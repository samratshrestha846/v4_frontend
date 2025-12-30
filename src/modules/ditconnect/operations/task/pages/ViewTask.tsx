import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Card, Row } from 'react-bootstrap';
import PageTitle from '@uhub/components/PageTitle';
import CustomLoader from '@uhub/components/CustomLoader';
import ErrorMessage from '@uhub/components/ErrorMessage';
import { prepareDynamicUrl, shortDateFormat } from '@uhub/helpers';
import { InfoColumn } from '../../../components/InfoColumn';
import useReadTask from '../hooks/useReadTask';
import { TASK_LIST, TASK_VIEW } from '../constants/constant';

// Import Task Description Types
import {
  SupplementTaskDescription,
  UdoseInstallationTaskDescription,
} from '../types/Task';

// Task Type Constants
const SUPPLEMENT_TRANSFER = 'Supplement Transfer';
const UDOSE_INSTALLATION = 'Udose Installation';

// Define Task Description Type
type TaskDescription =
  | SupplementTaskDescription
  | UdoseInstallationTaskDescription;

const ViewTask: React.FC = () => {
  const { id } = useParams();
  const title = 'Show Task';
  const location = useLocation();
  const { data, isFetching, isError } = useReadTask(id);
  const [descriptions, setDescriptions] = useState<TaskDescription[]>([]);

  // Parse Task Descriptions based on task type
  useEffect(() => {
    if (data?.task_descriptions) {
      setDescriptions(
        data.task_descriptions.map((task) => JSON.parse(task.description))
      );
    }
  }, [data?.task_descriptions]);

  if (isFetching) return <CustomLoader />;
  if (isError) return <ErrorMessage />;

  // Prepare Main Task Info (Follows Requested Model)
  const infoData = [
    { label: 'Task ID', value: data?.task_id },
    { label: 'Type', value: data?.type },
    { label: 'Date', value: shortDateFormat(data?.date) },
    { label: 'Status', value: data?.status },
    { label: 'Created By', value: data?.created_by?.name || '-' },
    { label: 'Assigned To', value: data?.assigned_to?.name || '-' },
    { label: 'Completed At', value: data?.completed_at || '-' },
    { label: 'Notes', value: data?.notes || '-', type: 'html' },
  ];

  // Function to generate task description data
  const getTaskDescriptionData = (
    desc: TaskDescription
  ): { label: string; value: string | number | null }[] => {
    if (data?.type === UDOSE_INSTALLATION) {
      const udoseDesc = desc as UdoseInstallationTaskDescription;
      return [
        {
          label: 'Customer Property',
          value: udoseDesc.customer_property?.name ?? '-',
        },
        { label: 'Device Serial No.', value: udoseDesc.device?.name ?? '-' },
        { label: 'Site Name', value: udoseDesc.site_name ?? '-' },
        { label: 'Rainfall Setting', value: udoseDesc.rainfall_setting ?? '-' },
      ];
    }

    if (data?.type === SUPPLEMENT_TRANSFER) {
      const supplementDesc = desc as SupplementTaskDescription;
      return [
        { label: 'Supplement', value: supplementDesc.supplement?.id ?? '-' },
        {
          label: 'From Location ID',
          value: supplementDesc.from_location?.name ?? '-',
        },
        {
          label: 'To Location ID',
          value: supplementDesc.to_location?.name ?? '-',
        },
        { label: 'Batch No', value: supplementDesc.batch_no ?? '-' },
        { label: 'Quantity', value: supplementDesc.qty ?? '-' },
      ];
    }

    return [];
  };

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: title, path: location.state?.from || TASK_LIST },
          {
            label: `View ${title}`,
            path: prepareDynamicUrl(TASK_VIEW, data?.id),
            active: true,
          },
        ]}
        title={title}
      />

      {/* Task Info Section */}
      <Card>
        <Card.Body>
          <h5 className="mt-0 text-primary-color">Sales Order</h5>
          <Row>
            {infoData.map((info, index) => (
              <InfoColumn
                key={index}
                label={info.label}
                value={info.value}
                colSpan={3}
                smColSpan={4}
                type={info.type}
              />
            ))}
          </Row>
        </Card.Body>
      </Card>

      {/* Task Descriptions Section */}
      {descriptions.map((desc, index) => {
        const descriptionData = getTaskDescriptionData(desc);
        return (
          <Card key={index}>
            <Card.Body>
              <h5 className="mt-0 text-primary-color">
                Task Description {index + 1}
              </h5>
              <Row>
                {descriptionData.map((info, idx) => (
                  <InfoColumn
                    key={idx}
                    label={info.label}
                    value={info.value}
                    colSpan={6}
                  />
                ))}
              </Row>
            </Card.Body>
          </Card>
        );
      })}
    </>
  );
};

export default ViewTask;
