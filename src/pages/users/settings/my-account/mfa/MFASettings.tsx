import React from 'react';
import { Card, Table, Form, Button, Modal } from 'react-bootstrap';
import { User } from '../../../../../types/user/user';
import useMFASettings from './hooks/useMFASettings';
import CustomModalHeader from '../../../../../components/modal/CustomModalHeader';
import { USER_PREFERENCE_MFA_ENABLED } from '../../../../../constants/userConstants';

type Props = {
  user?: User;
};

const MFASettings: React.FC<Props> = ({ user }) => {
  const {
    userPreferences,
    handleChange,
    handleConfirmationSave,
    showModal,
    toggleModal,
    handleCancel,
  } = useMFASettings(user);

  return (
    <>
      <h5 className="text-primary-color mt-0 mb-2">User Preference Setting</h5>
      <Card className="tilebox-one">
        <Card.Body className="p-0">
          <div className="table-responsive table-no-min-height">
            <Table size="sm" borderless>
              <thead className="thead-bg-light">
                <tr>
                  <th>Type</th>
                  <th>ON/OFF</th>
                </tr>
              </thead>
              <tbody>
                {userPreferences?.map((preference) => (
                  <tr key={preference.key}>
                    <td>
                      <span className="text-uppercase">{preference.key}</span>
                    </td>
                    <td>
                      <Form>
                        <Form.Check
                          type="switch"
                          value="switch"
                          name="switch"
                          checked={
                            preference.value === USER_PREFERENCE_MFA_ENABLED
                          }
                          onChange={(e) => handleChange(e, preference)}
                        />
                      </Form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card.Body>
        <Modal
          show={showModal}
          onHide={toggleModal}
          backdrop="static"
          keyboard={false}
          dialogClassName="custom-modal">
          <Modal.Header>
            <CustomModalHeader
              title="MFA Settings"
              handleModalClose={handleCancel}
            />
          </Modal.Header>
          <Modal.Body>
            <p className="fw-semibold">
              {`Are you sure you want to `}
              <span className="text-primary-color">
                {userPreferences?.[0]?.value}
              </span>
              {` MFA settings ?`}
            </p>

            <div className="button-list float-end">
              <Button
                variant="outline"
                className="btn btn-ghost"
                onClick={handleCancel}>
                <i className="bx bx-x me-1" />
                <span>Cancel</span>
              </Button>
              <Button
                variant="secondary"
                className="btn btn-secondary"
                onClick={handleConfirmationSave}>
                <i className="bx bx-save me-1" />
                <span>Save</span>
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      </Card>
    </>
  );
};

export default MFASettings;
