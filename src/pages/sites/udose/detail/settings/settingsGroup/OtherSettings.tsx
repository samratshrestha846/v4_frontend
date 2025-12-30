import React, { FC } from 'react';
import { Card, Table } from 'react-bootstrap';
import SettingRow from './SettingRow';
import {
  NUTRIENT_METER_MODE,
  TELEMETRY_MODE,
  TELEMETRY_MODE_OPTIONS,
  WATER_METER_MODE,
  WATER_METER_OPTIONS,
} from '../../../../../../constants/udoseSettings';
import EditButton from '../EditButton';
import Input from '../../../../../../components/Form/Input';
import SelectDropdown from '../../../../../../components/Form/SelectDropdown';
import UdoseRecordSettings from '../../../../../../types/udose/udoseSettings';

type Props = {
  settings?: UdoseRecordSettings;
  toggleEdit: () => void;
  hasEditPermission: boolean;
  setEditModalChildren: any;
};

const HardwareSettings: FC<Props> = ({
  settings,
  toggleEdit,
  hasEditPermission,
  setEditModalChildren,
}) => {
  return (
    <Card>
      <Card.Header as="h5" className="text-primary-color">
        Other Settings
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
                        <Input
                          name="livestock_count"
                          label="Number of Livestock Equivalent"
                          defaultValue={settings?.livestock_count}
                        />
                      );
                      toggleEdit();
                    }}
                  />
                )
              }>
              <td className="py-1">Number of Livestock Equivalent</td>
              <td className="py-1"> {settings?.livestock_count} </td>
            </SettingRow>

            <SettingRow
              editButton={
                hasEditPermission && (
                  <EditButton
                    onClickHandler={() => {
                      setEditModalChildren(
                        <SelectDropdown
                          name="water_meter_ppl_or_lpp"
                          options={WATER_METER_OPTIONS}
                          label="Water Meter LPP or PPL"
                          defaultValue={WATER_METER_OPTIONS?.filter(
                            (option) =>
                              option.value === settings?.water_meter_ppl_or_lpp
                          )}
                        />
                      );
                      toggleEdit();
                    }}
                  />
                )
              }>
              <td className="py-1">Water Meter LPP or PPL</td>
              <td className="py-1">
                {settings && WATER_METER_MODE[settings?.water_meter_ppl_or_lpp]}
              </td>
            </SettingRow>

            <SettingRow
              editButton={
                hasEditPermission && (
                  <EditButton
                    onClickHandler={() => {
                      setEditModalChildren(
                        <Input
                          name="max_pump_runtime"
                          label="Max Pump Runtime"
                          defaultValue={settings?.max_pump_runtime}
                        />
                      );
                      toggleEdit();
                    }}
                  />
                )
              }>
              <td className="py-1">Max Pump Runtime</td>
              <td className="py-1"> {settings?.max_pump_runtime} ms </td>
            </SettingRow>

            <SettingRow
              editButton={
                hasEditPermission && (
                  <EditButton
                    onClickHandler={() => {
                      setEditModalChildren(
                        <SelectDropdown
                          name="telemetry_mode"
                          options={TELEMETRY_MODE_OPTIONS}
                          label="Telemetry Mode"
                          defaultValue={TELEMETRY_MODE_OPTIONS?.filter(
                            (option) =>
                              option.value === settings?.telemetry_mode
                          )}
                        />
                      );
                      toggleEdit();
                    }}
                  />
                )
              }>
              <td className="py-1">Telemetry Mode</td>
              <td className="py-1">
                {settings && TELEMETRY_MODE[settings.telemetry_mode]}
              </td>
            </SettingRow>

            <SettingRow>
              <td className="py-1">Nutrient Meter PPL</td>
              <td className="py-1">
                {settings && NUTRIENT_METER_MODE[settings.nutrient_meter_ppl]}
              </td>
            </SettingRow>
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default HardwareSettings;
