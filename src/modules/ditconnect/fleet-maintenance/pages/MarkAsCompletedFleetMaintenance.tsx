import React from 'react';
import { Button } from 'react-bootstrap';
import { FleetMaintenanceResponse } from '../types/FleetMaintenance';
import useMarksAsCompletedFleetMaintenance from '../hooks/useMarksAsCompletedFleetMaintenance';

type Props = {
  toggleModal: () => void;
  maintenance: FleetMaintenanceResponse;
};

const MarkAsCompletedFleetMaintenance: React.FC<Props> = ({
  toggleModal,
  maintenance,
}) => {
  const { handleMarkAsCompleted } = useMarksAsCompletedFleetMaintenance({
    maintenance,
    toggleModal,
  });

  return (
    <>
      <div className="d-flex align-items-center">
        <p className="fw-semibold text-secondary-color">
          {`Are you sure you want to mark the following maintenance as completed ? `}
        </p>
      </div>

      <div className="d-flex flex-column align-items-start">
        <p className="fw-semibold">
          {`Type : `}
          <span className="fst-italic">{maintenance.maintenance_type}</span>
        </p>
        <p className="fw-semibold">
          {`Vehicle : `}
          {maintenance?.vehicle ? (
            <span className="fst-italic">{` ${maintenance?.vehicle?.reg_number} - ${maintenance?.vehicle?.type}`}</span>
          ) : (
            '-'
          )}
        </p>
        <p className="fw-semibold">
          {`Reported By : `}
          {maintenance?.reported_by_user ? (
            <span className="fst-italic">{` ${maintenance?.reported_by_user?.first_name} - ${maintenance?.reported_by_user?.last_name}`}</span>
          ) : (
            '-'
          )}
        </p>
      </div>

      <div className="button-list float-end mt-3">
        <Button
          variant="outline"
          className="btn btn-ghost"
          onClick={toggleModal}>
          <i className="bx bx-x me-1 font-18" />
          Cancel
        </Button>
        <Button className="btn btn-save" onClick={handleMarkAsCompleted}>
          <i className="bx bx-check me-1 font-18" />
          Mark as Completed
        </Button>
      </div>
    </>
  );
};

export default MarkAsCompletedFleetMaintenance;
