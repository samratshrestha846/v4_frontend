import React from 'react';
import { Card } from 'react-bootstrap';
import PageTitle from '@uhub/components/PageTitle';
import { useParams } from 'react-router-dom';
import CustomLoader from '@uhub/components/CustomLoader';
import ErrorMessage from '@uhub/components/ErrorMessage';
import { prepareDynamicUrl } from '@uhub/helpers';
import { MESSAGE_EDIT, MESSAGE_LIST } from '../constants/constant';
import MessageForm from './MessageForm';
import useReadMessage from '../hooks/useReadMessage';

const EditMessage: React.FC = () => {
  const { id } = useParams();

  const title: string = 'Message';
  const { data, isFetching, isError } = useReadMessage(id);

  if (isFetching || !data) return <CustomLoader />;

  if (isError) return <ErrorMessage />;

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: `${title}`, path: MESSAGE_LIST, active: false },
          {
            label: `Edit ${title}`,
            path: prepareDynamicUrl(MESSAGE_EDIT, id),
            active: true,
          },
        ]}
        title={`Edit ${title}`}
      />
      <Card>
        <Card.Body>
          {data && (
            <MessageForm
              defaultValues={{
                ...data,
                publish_date: new Date(data.publish_date),
                expires_on: new Date(data.expires_on),
              }}
            />
          )}
        </Card.Body>
      </Card>
    </>
  );
};

export default EditMessage;
