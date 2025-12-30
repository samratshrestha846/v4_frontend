import React, { Dispatch, SetStateAction, FC, ReactNode } from 'react';
import { Table, Card } from 'react-bootstrap';
import SettingRow from './SettingRow';
import {
  DOSING_MODE,
  DOSING_MODE_OPTIONS,
} from '../../../../../../constants/udoseSettings';
import EditButton from '../EditButton';
import Input from '../../../../../../components/Form/Input';
import SelectDropdown from '../../../../../../components/Form/SelectDropdown';
import UdoseRecordSettings from '../../../../../../types/udose/udoseSettings';

type Props = {
  settings?: UdoseRecordSettings;
  toggleEdit: Dispatch<SetStateAction<boolean>>;
  hasEditPermission: boolean;
  setEditModalChildren: Dispatch<SetStateAction<ReactNode>>;
};

const DoseSettings: FC<Props> = ({
  settings,
  toggleEdit,
  hasEditPermission,
  setEditModalChildren,
}) => {
  return (
    <Card>
      <Card.Header as="h5" className="text-primary-color">
        Dose Settings
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
                          name="dosing_mode"
                          options={DOSING_MODE_OPTIONS}
                          label="Dosing Mode"
                          defaultValue={DOSING_MODE_OPTIONS?.filter(
                            (option) => option.value === settings?.dosing_mode
                          )}
                        />
                      );
                      toggleEdit(true);
                    }}
                  />
                )
              }>
              <td className="py-1"> Dosing Mode </td>
              <td className="py-1">
                {settings && DOSING_MODE[settings.dosing_mode]}
              </td>
            </SettingRow>

            <SettingRow
              editButton={
                hasEditPermission && (
                  <EditButton
                    onClickHandler={() => {
                      setEditModalChildren(
                        <Input
                          name="target_dose"
                          label="Target Dose"
                          defaultValue={settings?.target_dose}
                        />
                      );
                      toggleEdit(true);
                    }}
                  />
                )
              }>
              <td className="py-1"> Target Dose </td>
              <td className="py-1"> {settings?.target_dose} ml </td>
            </SettingRow>

            <SettingRow
              editButton={
                hasEditPermission && (
                  <EditButton
                    onClickHandler={() => {
                      setEditModalChildren(
                        <Input
                          name="trigger_point"
                          label="Trigger Point"
                          defaultValue={settings?.trigger_point}
                        />
                      );
                      toggleEdit(true);
                    }}
                  />
                )
              }>
              <td className="py-1"> Trigger Point </td>
              <td className="py-1"> {settings?.trigger_point} L </td>
            </SettingRow>

            <SettingRow
              editButton={
                hasEditPermission && (
                  <EditButton
                    onClickHandler={() => {
                      setEditModalChildren(
                        <Input
                          name="dose_runtime"
                          label="Dose Runtime"
                          defaultValue={settings?.dose_runtime}
                        />
                      );
                      toggleEdit(true);
                    }}
                  />
                )
              }>
              <td className="py-1"> Dose Runtime </td>
              <td className="py-1"> {settings?.dose_runtime} ms </td>
            </SettingRow>
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default DoseSettings;
