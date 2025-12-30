import React, { Dispatch, ReactNode, SetStateAction } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import useUpdateDeviceSettings from './hooks/useUpdateDeviceSettings';
import CustomModalHeader from '../../../../../components/modal/CustomModalHeader';

type Props = {
  children: ReactNode;
  editModal: boolean;
  setEditModal: Dispatch<SetStateAction<boolean>>;
};

const EditSetting: React.FC<Props> = ({
  children,
  editModal,
  setEditModal,
}) => {
  const { agreed, toggleAgree, handleSubmit } = useUpdateDeviceSettings({
    editModal,
    setEditModal,
  });

  return (
    <Modal
      show={editModal}
      onHide={() => setEditModal(!editModal)}
      backdrop="static"
      keyboard={false}
      dialogClassName="custom-modal">
      <Modal.Header>
        <CustomModalHeader
          title="Udose Setting Commands"
          handleModalClose={() => setEditModal(!editModal)}
        />
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <div className="mb-3">{children}</div>
          <div className="mb-3">
            <Form.Label>
              <input
                type="checkbox"
                id="inline-checkbox"
                name="agreeTerms"
                required
                onChange={toggleAgree}
              />
              &nbsp; I agree that I have consulted my Territory Manager or DIT
              AgTech prior to changing this settings.
            </Form.Label>
          </div>

          <div className="d-flex justify-content-end align-items-center button-list">
            <Button
              variant="outline"
              className="btn btn-ghost"
              onClick={() => setEditModal(!editModal)}>
              <i className="bx bx-x " /> Cancel
            </Button>

            <Button
              variant="secondary"
              type="submit"
              className="btn btn-secondary"
              disabled={!agreed}>
              <i className="bx bx-save " /> Save
            </Button>
          </div>
        </Form>
        <div className="mt-3">
          <figcaption className="blockquote-footer m-0">
            Note: It will take 2-5 mins to update settings in device
          </figcaption>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default EditSetting;
