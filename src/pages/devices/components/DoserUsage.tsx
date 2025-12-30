import React, { Dispatch, FC, SetStateAction } from 'react';
import { Card, Table, Modal, Button } from 'react-bootstrap';
import { formattedDateString } from '../../../helpers/dateHelper';
import { DoserUsages } from '../../../types/device/device';
import useUpdateDoserUsages from '../hooks/useUpdateDoserUsages';

type Props = {
  doserUsage: DoserUsages;
  refetch: any;
};

const DoserUsage: FC<Props> = ({ doserUsage, refetch }) => {
  const {
    handleClick,
    doserUsages,
    showModal,
    setShowModal,
    currentDoserUsageData,
    setCurrentDoserUsageData,
  } = useUpdateDoserUsages(doserUsage, refetch);
  return (
    <>
      <Card>
        <Card.Header as="h5" className="text-primary-color">
          Doser Usage
          <p className="font-12 float-end m-0">
            <i className="bx bx-info-circle " />
            {doserUsage?.updated_at
              ? `Last Updated at: ${formattedDateString(
                  doserUsage?.updated_at
                )}`
              : ''}
          </p>
        </Card.Header>
        <Card.Body>
          <Table size="sm">
            <thead>
              <tr>
                <th>Name</th>
                <th>Current Reading</th>
                <th>Reset</th>
              </tr>
            </thead>
            <tbody>
              {doserUsages?.map((doserUsageData) => {
                return (
                  <tr key={doserUsageData?.id}>
                    <td>{doserUsageData?.name}</td>
                    <td>{doserUsageData?.value}</td>
                    <td>
                      <button
                        type="submit"
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => {
                          setShowModal(true);
                          setCurrentDoserUsageData(doserUsageData);
                        }}>
                        <i className="bx bx-reset font-16" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      <AlertModal
        doserUsageData={currentDoserUsageData}
        showModal={showModal}
        handleClick={handleClick}
        setShowModal={setShowModal}
      />
    </>
  );
};

export default DoserUsage;

type AlertModalProps = {
  doserUsageData: any;
  // eslint-disable-next-line no-unused-vars
  handleClick: (value: number, type: string) => void;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  showModal: boolean;
};

const AlertModal: FC<AlertModalProps> = ({
  doserUsageData,
  handleClick,
  setShowModal,
  showModal,
}) => {
  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Reset Doser Usage</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to reset {doserUsageData?.name} to zero?</p>
      </Modal.Body>
      <Modal.Footer>
        <div className="button-list float-end">
          <Button
            variant="outline"
            className="btn btn-ghost"
            onClick={() => setShowModal(false)}>
            <i className="bx bx-x me-1" />
            Cancel
          </Button>
          <Button
            variant="secondary"
            className="btn btn-secondary"
            onClick={() =>
              handleClick(doserUsageData?.value, doserUsageData?.type)
            }>
            <i className="bx bx-refresh me-1" />
            Reset
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};
