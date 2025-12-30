import React, { FC, MouseEventHandler } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

type Props = {
  onClickHandler: MouseEventHandler<HTMLButtonElement>;
};

const EditButton: FC<Props> = ({ onClickHandler }) => {
  return (
    <button
      type="submit"
      className="btn btn-icon btn-md"
      onClick={onClickHandler}>
      <OverlayTrigger
        placement="bottom"
        overlay={<Tooltip id="edit"> Edit </Tooltip>}>
        <i className="bx bx-edit mdi-24px me-2 font-18 text-info" />
      </OverlayTrigger>
    </button>
  );
};

export default EditButton;
