import React, { FC, Dispatch, SetStateAction } from 'react';
import { Table, Card } from 'react-bootstrap';
import SettingRow from './SettingRow';
import {
  CONDUCTIVITY_PROBE_MODE,
  CONDUCTIVITY_PROBE_OPTIONS,
} from '../../../../../../constants/udoseSettings';
import EditButton from '../EditButton';
import SelectDropdown from '../../../../../../components/Form/SelectDropdown';
import Input from '../../../../../../components/Form/Input';
import UdoseRecordSettings from '../../../../../../types/udose/udoseSettings';

type Props = {
  settings?: UdoseRecordSettings;
  toggleEdit: Dispatch<SetStateAction<boolean>>;
  hasEditPermission: boolean;
  setEditModalChildren: any;
};

const ConductivitySettings: FC<Props> = ({
  settings,
  toggleEdit,
  hasEditPermission,
  setEditModalChildren,
}) => {
  return (
    <Card>
      <Card.Header as="h5" className="text-primary-color">
        Conductivity Settings
      </Card.Header>
      <Card.Body>
        <Table striped hover responsive>
          <tbody>
            <SettingRow
              editButton={
                hasEditPermission && (
                  <EditButton
                    onClickHandler={() => {
                      setEditModalChildren(
                        <SelectDropdown
                          name="conductivity_probe_mode"
                          options={CONDUCTIVITY_PROBE_OPTIONS}
                          label="Conductivity Probe Mode"
                          defaultValue={CONDUCTIVITY_PROBE_OPTIONS?.filter(
                            (option) =>
                              option.value === settings?.conductivity_probe_mode
                          )}
                        />
                      );
                      toggleEdit(true);
                    }}
                  />
                )
              }>
              <td className="py-1">Conductivity Probe Mode</td>
              <td className="py-1">
                {settings &&
                  CONDUCTIVITY_PROBE_MODE[settings.conductivity_probe_mode]}
              </td>
            </SettingRow>

            <SettingRow
              editButton={
                hasEditPermission && (
                  <EditButton
                    onClickHandler={() => {
                      setEditModalChildren(
                        <Input
                          name="conductivity_skip_level"
                          label="Conductivity Skip Level"
                          defaultValue={settings?.conductivity_skip_level}
                        />
                      );
                      toggleEdit(true);
                    }}
                  />
                )
              }>
              <td className="py-1">Conductivity Skip Level</td>
              <td className="py-1">{settings?.conductivity_skip_level} μS/m</td>
            </SettingRow>

            <SettingRow
              editButton={
                hasEditPermission && (
                  <EditButton
                    onClickHandler={() => {
                      setEditModalChildren(
                        <Input
                          name="conductivity_alarm_level"
                          label="Conductivity Alarm Level"
                          defaultValue={settings?.conductivity_alarm_level}
                        />
                      );
                      toggleEdit(true);
                    }}
                  />
                )
              }>
              <td className="py-1">Conductivity Alarm Level</td>
              <td className="py-1">
                {settings?.conductivity_alarm_level} μS/m
              </td>
            </SettingRow>

            <SettingRow
              editButton={
                hasEditPermission && (
                  <EditButton
                    onClickHandler={() => {
                      setEditModalChildren(
                        <Input
                          name="conductivity_skip_limit"
                          label="Conductivity Skip Limit"
                          defaultValue={settings?.conductivity_skip_limit}
                        />
                      );
                      toggleEdit(true);
                    }}
                  />
                )
              }>
              <td className="py-1">Conductivity Skip Limit</td>
              <td className="py-1"> {settings?.conductivity_skip_limit} </td>
            </SettingRow>
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default ConductivitySettings;
