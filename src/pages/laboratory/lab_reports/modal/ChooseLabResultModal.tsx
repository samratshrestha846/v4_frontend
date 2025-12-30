/* eslint-disable no-unused-vars */
import React, { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import SelectLabSample from '../components/SelectLabSample';
import { LabReport } from '../../../../types/lab/labReport';
import { LabSample } from '../../../../types/lab/labSampleList';
import { LabelNumericValue } from '../../../../types/common';
import CustomModalHeader from '../../../../components/modal/CustomModalHeader';

type Props = {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  handleChangeOnLabSampleSelect: (e: ChangeEvent<HTMLInputElement>) => void;
  selectedLabSamples?: LabSample[];
  labReportDetail?: LabReport;
  loading: boolean;
  propertiesOptions?: LabelNumericValue[];
};

const ChooseLabResultModel: React.FC<Props> = ({
  showModal,
  setShowModal,
  handleChangeOnLabSampleSelect,
  selectedLabSamples,
  labReportDetail,
  loading,
  propertiesOptions,
}) => {
  return (
    <Modal
      size="lg"
      show={showModal}
      onHide={setShowModal}
      backdrop="static"
      keyboard={false}
      dialogClassName="custom-modal">
      <Modal.Header>
        <CustomModalHeader
          title="Select Lab Samples"
          handleModalClose={() => setShowModal(false)}
        />
      </Modal.Header>
      <Modal.Body className="m-2">
        <SelectLabSample
          showModal={showModal}
          handleChangeOnLabSampleSelect={handleChangeOnLabSampleSelect}
          selectedLabSamples={selectedLabSamples}
          labReportDetail={labReportDetail}
          loading={loading}
          propertiesOptions={propertiesOptions}
        />

        <Row className="">
          <Col>
            <div className="float-end button-list">
              <Button
                variant="outline"
                className=" btn btn-primary"
                onClick={() => setShowModal(false)}>
                <i className="bx bx-check me-1" />
                Done
              </Button>
            </div>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default ChooseLabResultModel;
