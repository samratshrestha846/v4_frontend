import React from 'react';
import { Button } from 'react-bootstrap';
import { prepareDynamicUrl } from '@uhub/helpers';
import useDeleteTechInventory from '../hooks/useDeleteTechInventory';
import useReadRecord from '../../../hooks/useReadRecord';
import { TECH_INVENTORY_ITEM_COUNT } from '../constants/constant';

type Props = {
  id: number;
  toggleModal?: () => void;
};

const DeleteTechInventoryModal: React.FC<Props> = ({ id, toggleModal }) => {
  const { removeInventoryItem, removeAllInventoryItem } =
    useDeleteTechInventory({ id });
  const { data } = useReadRecord<boolean>(
    prepareDynamicUrl(TECH_INVENTORY_ITEM_COUNT, id)
  );

  return (
    <>
      <div className="d-flex align-items-center gap-1">
        <p className="fw-semibold text-secondary-color">
          {`Press "Cancel" button to cancel, "OK" button to delete Inventory Item
          only, "Delete All" button to delete Inventory Item as well as
          Inventory`}
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
        {data && (
          <Button
            variant="outline"
            className="btn btn-danger"
            onClick={removeAllInventoryItem}>
            <i className="bx bx-trash me-1" />
            Delete All
          </Button>
        )}
        <Button
          variant="secondary"
          className="btn btn-secondary"
          onClick={removeInventoryItem}>
          <i className="bx bx-trash me-1" />
          Ok
        </Button>
      </div>
    </>
  );
};

export default DeleteTechInventoryModal;
