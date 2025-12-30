import React from 'react';
import { Modal } from 'react-bootstrap';
import CustomModalHeader from '@uhub/components/modal/CustomModalHeader';

import MaintenanceBookingForm from './MaintenanceBookingForm';
import { MaintenanceBookingFormProps } from '../types/MaintenanceBooking';

type Props = {
  toggleModal: () => void;
  showModal: boolean;
  maintenanceId?: number;
};

const AddMaintenanceBooking: React.FC<Props> = ({
  toggleModal,
  showModal,
  maintenanceId,
}) => {
  const title: string = 'Maintenance Booking';

  const defaultValues: MaintenanceBookingFormProps = {
    id: null,
    assignee_id: null,
    booking_date: null,
    location: null,
    maintenance_id: maintenanceId || null,
  };

  return (
    <Modal
      show={showModal}
      onHide={toggleModal}
      backdrop="static"
      keyboard={false}
      dialogClassName="custom-modal">
      <Modal.Header>
        <CustomModalHeader
          title={`Add ${title}`}
          handleModalClose={toggleModal}
        />
      </Modal.Header>
      <Modal.Body>
        <MaintenanceBookingForm
          defaultValues={defaultValues}
          toggleModal={toggleModal}
        />
      </Modal.Body>
    </Modal>
  );
};

export default AddMaintenanceBooking;
