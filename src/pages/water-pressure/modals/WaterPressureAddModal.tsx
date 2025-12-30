/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
import React from 'react';
import { Modal } from 'react-bootstrap';
import AddWaterPressure from '../AddWaterPressure';
import CustomModalHeader from '../../../components/modal/CustomModalHeader';

type Props = {
  siteId: number;
  showModal: boolean;
  toggleModal: () => void;
  refetch: any;
};

const WaterPressureAddModal: React.FC<Props> = ({
  siteId,
  showModal,
  toggleModal,
  refetch,
}) => {
  return (
    <Modal
      show={showModal}
      onHide={toggleModal}
      backdrop="static"
      keyboard={false}
      dialogClassName="custom-modal">
      <Modal.Header>
        <CustomModalHeader
          title="Add Water Pressure"
          handleModalClose={toggleModal}
        />
      </Modal.Header>
      <Modal.Body>
        <AddWaterPressure
          toggleModal={toggleModal}
          refetch={refetch}
          siteId={siteId}
        />
      </Modal.Body>
    </Modal>
  );
};

export default WaterPressureAddModal;
