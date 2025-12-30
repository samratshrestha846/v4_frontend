import React from 'react';
import { Button } from 'react-bootstrap';
import { prepareDynamicUrl } from '@uhub/helpers';
import { toast } from 'react-toastify';
import HttpApi from '../../Http/http';
import { SEND_MESSAGE_SALES_ORDER } from '../constants/constant';

type Props = {
  id: number;
  toggleModal: () => void;
};

const SendMessageModal: React.FC<Props> = ({ id, toggleModal }) => {
  const sendMessage = async () => {
    try {
      const apiCore = new HttpApi();
      const response = await apiCore.get(
        prepareDynamicUrl(SEND_MESSAGE_SALES_ORDER, id)
      );
      if (response.data) {
        toast.success('Message Sent successfully.');
      } else {
        toast.error(response.data.message);
      }
    } catch (e: any) {
      toast.error(e.response.data.message);
    }
    toggleModal();
  };

  return (
    <>
      <div className="d-flex align-items-center gap-1">
        <p className="fw-semibold text-secondary-color">
          Do you want to send message?
        </p>
      </div>
      <div className="button-list float-end">
        <Button
          variant="outline"
          className="btn btn-ghost"
          onClick={toggleModal}>
          <i className="bx bx-x me-1" />
          Cancel
        </Button>
        <Button
          variant="secondary"
          className="btn btn-secondary"
          onClick={sendMessage}>
          <i className="bx bx-message me-1" />
          Ok
        </Button>
      </div>
    </>
  );
};

export default SendMessageModal;
