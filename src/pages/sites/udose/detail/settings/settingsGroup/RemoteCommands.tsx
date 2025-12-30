import React, { FC } from 'react';
import { Card, Table, OverlayTrigger, Tooltip } from 'react-bootstrap';
import SettingRow from './SettingRow';
import { TELEMETRY_DEMAND_MESSAGE_PACKET_OPTIONS } from '../../../../../../constants/udoseSettings';
import useAuth from '../../../../../../hooks/useAuth';
import EditButton from '../EditButton';
import SelectDropdown from '../../../../../../components/Form/SelectDropdown';
import { can } from '../../../../../../helpers/checkPermission';

type Props = {
  toggleEdit: () => void;
  setEditModalChildren: any;
};

const RemoteCommands: FC<Props> = ({ toggleEdit, setEditModalChildren }) => {
  const { isSuperAdmin, isAdmin } = useAuth();

  return (
    <div>
      {(isSuperAdmin || isAdmin) && (
        <>
          <Card>
            <Card.Header as="h5" className="text-primary-color">
              Remote Commands
            </Card.Header>
            <Card.Body>
              <Table striped hover responsive>
                <thead>
                  <tr className="bg-light">
                    <th>Command Name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <SettingRow
                    editButton={
                      <EditButton
                        onClickHandler={() => {
                          setEditModalChildren(
                            <SelectDropdown
                              name="demand_message_packet"
                              label="Fetch Messages"
                              options={TELEMETRY_DEMAND_MESSAGE_PACKET_OPTIONS}
                              defaultValue={
                                TELEMETRY_DEMAND_MESSAGE_PACKET_OPTIONS[0]
                              }
                            />
                          );
                          toggleEdit();
                        }}
                      />
                    }>
                    <td className="py-1">Fetch Messages</td>
                  </SettingRow>

                  <SettingRow
                    editButton={
                      <button
                        type="submit"
                        className="btn btn-sm"
                        onClick={() => {
                          setEditModalChildren(
                            <>
                              <h4>Update Location</h4>
                              <input
                                type="hidden"
                                name="update_location"
                                value="update_location"
                              />
                            </>
                          );
                          toggleEdit();
                        }}>
                        <OverlayTrigger
                          placement="bottom"
                          overlay={<Tooltip id="update"> Update </Tooltip>}>
                          <i className="bx bx-cog me-2 font-18 text-warning" />
                        </OverlayTrigger>
                      </button>
                    }>
                    <td className="py-1">Update Location</td>
                  </SettingRow>

                  <SettingRow
                    editButton={
                      <button
                        type="submit"
                        className="btn btn-sm"
                        onClick={() => {
                          setEditModalChildren(
                            <>
                              <h4>Reboot Communication Modem (Satellite)</h4>
                              <input
                                type="hidden"
                                name="reboot_communication_modem"
                                value="reboot_communication_modem"
                              />
                            </>
                          );
                          toggleEdit();
                        }}>
                        <OverlayTrigger
                          placement="bottom"
                          overlay={<Tooltip id="update"> Update </Tooltip>}>
                          <i className="bx bx-cog me-2 font-18 text-warning" />
                        </OverlayTrigger>
                      </button>
                    }>
                    <td className="py-1"> Reboot Communication Modem </td>
                  </SettingRow>
                  <SettingRow
                    editButton={
                      <button
                        type="submit"
                        className="btn btn-sm"
                        onClick={() => {
                          setEditModalChildren(
                            <>
                              <h4>Reboot Control Box Board</h4>
                              <input
                                type="hidden"
                                name="reboot_board"
                                value="1"
                              />
                            </>
                          );
                          toggleEdit();
                        }}>
                        <OverlayTrigger
                          placement="bottom"
                          overlay={<Tooltip id="update"> Update </Tooltip>}>
                          <i className="bx bx-cog font-18 me-2 text-warning" />
                        </OverlayTrigger>
                      </button>
                    }>
                    <td className="py-1"> Reboot Control Box Board </td>
                  </SettingRow>
                  <SettingRow
                    editButton={
                      <button
                        type="submit"
                        className="btn btn-sm"
                        onClick={() => {
                          setEditModalChildren(
                            <>
                              <h4>Prime Doser</h4>
                              <input
                                type="hidden"
                                name="prime_doser"
                                value="prime_doser"
                              />
                            </>
                          );
                          toggleEdit();
                        }}>
                        <OverlayTrigger
                          placement="bottom"
                          overlay={<Tooltip id="update"> Update </Tooltip>}>
                          <i className="bx bx-cog me-2 font-18 text-warning" />
                        </OverlayTrigger>
                      </button>
                    }>
                    <td className="py-1"> Prime Doser </td>
                  </SettingRow>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
          {can('send_custom_register') && (
            <div className="text-muted">
              <button
                type="submit"
                className="btn btn-sm"
                onClick={() => {
                  setEditModalChildren(
                    <>
                      <input type="hidden" name="is_custom" value={1} />
                      <h4>Address</h4>
                      <input type="text" name="key" />
                      <h4>Value</h4>
                      <input type="text" name="value" />
                    </>
                  );
                  toggleEdit();
                }}>
                Developer Only
                <OverlayTrigger
                  placement="bottom"
                  overlay={<Tooltip id="edit"> Edit </Tooltip>}>
                  <i className="bx bx-edit font-18 ml-2 text-info" />
                </OverlayTrigger>
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default RemoteCommands;
