import React from 'react';
import { Card } from 'react-bootstrap';
import PageTitle from '@uhub/components/PageTitle';
import { MESSAGE_ADD, MESSAGE_LIST } from '../constants/constant';
import MessageForm from './MessageForm';
import { MessageFormProps } from '../types/Message';

const AddMessage: React.FC = () => {
  const title: string = 'Message';
  const defaultValues: MessageFormProps = {
    type: null,
    status: null,
    message: null,
    publish_date: null,
    expires_on: null,
  };
  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: `${title}`, path: MESSAGE_LIST, active: false },
          {
            label: `Add ${title}`,
            path: MESSAGE_ADD,
            active: true,
          },
        ]}
        title={`Add ${title}`}
      />
      <Card>
        <Card.Body>
          <MessageForm defaultValues={defaultValues} />
        </Card.Body>
      </Card>
    </>
  );
};

export default AddMessage;
